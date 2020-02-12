import {Injectable} from '@angular/core';
import {Observable, of, zip} from 'rxjs';
import {AuthProviders} from '../../domain/entities/auth-providers';
import {UserEntity} from '../../domain/entities/user-entity';
import {FirebaseAuthDatasource} from '../datasources/firebase-auth-datasource';
import {FirebaseStorageDatasource} from '../datasources/firebase-storage-datasource';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {storageImagePathFor} from '../entities/auth-user-entity';
import {ArenaTournamentRepository} from '../../domain/repositories/arena-tournament-repository';
import {GameEntity} from '../../domain/entities/game-entity';
import {TournamentEntity} from '../../domain/entities/tournament-entity';
import {RegistrationEntity} from '../../domain/entities/registration-entity';
import {ArenaTournamentDatasource} from '../datasources/arena-tournament-datasource';
import {
  CurrentUserMapper,
  GameLinkMapper,
  GameMapper,
  ModeLinkMapper,
  ModeMapper,
  RegistrationMapper,
  TournamentLinkMapper,
  TournamentMapper,
  UserLinkMapper,
  UserMapper
} from '../mappers/mappers';
import {ModeEntity} from '../../domain/entities/mode-entity';
import {RegistrationSplitter, TournamentSplitter} from '../splitters/splitters';

@Injectable({
  providedIn: 'root',
})
export class ArenaTournamentRepositoryImplementation extends ArenaTournamentRepository {

  readonly id: number;
  readonly playersNumber: number;
  readonly title: string;
  readonly tournamentDescription: string;
  readonly tournamentMode: string;

  constructor(
    private readonly arenaTournamentDs: ArenaTournamentDatasource,
    private readonly firebaseAuthDs: FirebaseAuthDatasource,
    private readonly firebaseStorageDs: FirebaseStorageDatasource,
    private readonly gameMapper: GameMapper,
    private readonly modeMapper: ModeMapper,
    private readonly tournamentMapper: TournamentMapper,
    private readonly registrationMapper: RegistrationMapper,
    private readonly userMapper: UserMapper,
    private readonly currentUserMapper: CurrentUserMapper,
    private readonly tournamentSplitter: TournamentSplitter,
    private readonly registrationSplitter: RegistrationSplitter,
    private readonly userLinkMapper: UserLinkMapper,
    private readonly gameLinkMapper: GameLinkMapper,
    private readonly modeLinkMapper: ModeLinkMapper,
    private readonly tournamentLinkMapper: TournamentLinkMapper
  ) {
    super();
  }


  createAccountWithEmailAndPassword(email: string, password: string): Observable<boolean> {
    return this.firebaseAuthDs.createAccountWithEmailPassword(email, password);
  }

  getAuthMethodsForEmail(email: string): Observable<AuthProviders[]> {
    return this.firebaseAuthDs.getAuthMethodsForEmail(email);
  }

  getCurrentUserAuthMethods(): Observable<AuthProviders[]> {
    return this.firebaseAuthDs.getCurrentUserAuthMethods();
  }

  isCurrentUserEmailVerified(): Observable<boolean> {
    return this.firebaseAuthDs.isCurrentUserEmailVerified();
  }

  isCurrentUserSubscriber(): Observable<boolean> {
    return this.firebaseAuthDs.getCurrentUserClaims()
      .pipe(map((claims) => claims.isSubscriber));
  }

  linkFacebookProvider(token: string): Observable<boolean> {
    return this.firebaseAuthDs.linkFacebookAuthProvider(token);
  }

  linkGoogleAuthProvider(token: string): Observable<boolean> {
    return this.firebaseAuthDs.linkGoogleAuthProvider(token);
  }

  linkPasswordAuthProvider(password: string): Observable<boolean> {
    return this.firebaseAuthDs.linkPasswordAuthProvider(password);
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<boolean> {
    return this.firebaseAuthDs.loginWithEmailPassword(email, password);
  }

  loginWithFacebookToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.loginWithFacebookToken(token);
  }

  loginWithGoogleToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.loginWithGoogleToken(token);
  }

  logout(): Observable<boolean> {
    return this.firebaseAuthDs.logout();
  }

  reauthenticateWithFacebookToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.reauthenticateWithFacebook(token);
  }

  reauthenticateWithGoogleToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.reauthenticateWithGoogle(token);
  }


  getCurrentUser(): Observable<UserEntity> {
    return this.firebaseAuthDs.getCurrentAuthUser().pipe(
      mergeMap((authUser) => {
        return authUser ? zip(this.firebaseStorageDs.getFileUrl(storageImagePathFor(authUser)), this.firebaseAuthDs.getCurrentUserClaims())
          .pipe(map(([userProfileImageUrl, claims]) => {
            const user: UserEntity = {
              email: authUser.email,
              id: authUser.id,
              image: userProfileImageUrl,
              nickname: authUser.nickname,
              isSubscriber: claims.isSubscriber
            };
            return user;
          })) : new Observable<UserEntity>(subscriber => {
          subscriber.next(null);
          subscriber.complete();
        });
      })
    );
  }

  createGame(gameName: string, availableModes: string[], image: string, icon: string): Observable<GameEntity> {
    return this.arenaTournamentDs.createGame({availableModes, gameName, icon, image}).pipe(
      map((gameJson) => this.gameMapper.fromRemoteSingle(gameJson))
    );
  }

  createGameMode(modeName: string): Observable<ModeEntity> {
    return this.arenaTournamentDs.createGameMode({modeName}).pipe(
      map((modeJson) => this.modeLinkMapper.fromRemoteSingle(modeJson))
    );
  }

  createRegistration(user: UserEntity, tournament: TournamentEntity, outcome?: string): Observable<RegistrationEntity> {

    const userUrl = this.userLinkMapper.toRemoteSingle(user).path;
    const tournamentUrl = this.tournamentLinkMapper.toRemoteSingle(tournament).path;

    return this.arenaTournamentDs.createRegistration(
      {
        user: userUrl,
        tournament: tournamentUrl,
        outcome
      }).pipe(
      flatMap((registrationJson) => this.getRegistrationById(registrationJson.id))
    );
  }

  createTournament(
    playersNumber: number,
    title: string,
    description: string,
    mode: string,
    admin: UserEntity,
    game: GameEntity
  ): Observable<TournamentEntity> {

    const userUrl = this.userLinkMapper.toRemoteSingle(admin);
    const gameUrl = this.gameLinkMapper.toRemoteSingle(game);

    return this.arenaTournamentDs.createTournament({
      playersNumber,
      title,
      tournamentDescription: description,
      tournamentMode: mode,
      admin: userUrl.path,
      game: gameUrl.path
    }).pipe(
      flatMap((tournamentJson) => this.getTournamentById(tournamentJson.id))
    );
  }

  getAllGames(page: number): Observable<GameEntity[]> {
    return this.arenaTournamentDs.getAllGames(page).pipe(
      map((multipleGamesJson) => this.gameMapper.fromRemoteMultiple(multipleGamesJson))
    );
  }

  getGameByName(gameName: string): Observable<GameEntity> {
    return this.arenaTournamentDs.getGameByName(gameName).pipe(
      map((gameJson) => this.gameMapper.fromRemoteSingle(gameJson))
    );
  }

  getGamesByMode(mode: string, page: number): Observable<GameEntity[]> {
    return this.arenaTournamentDs.getGamesByMode(mode, page).pipe(
      map((multipleGamesJson) => this.gameMapper.fromRemoteMultiple(multipleGamesJson))
    );
  }

  getGamesContainingName(name: string, page: number): Observable<GameEntity[]> {
    return this.arenaTournamentDs.getGamesContainingName(name, page).pipe(
      map((multipleGamesJson) => this.gameMapper.fromRemoteMultiple(multipleGamesJson))
    );
  }

  getRegistrationById(registrationId: number): Observable<RegistrationEntity> {
    return this.arenaTournamentDs.getRegistrationById(registrationId).pipe(
      flatMap((registrationJson) => {
        return zip(
          of(registrationJson),
          this.arenaTournamentDs.getUserByLink(registrationJson._links.user.href),
          this.arenaTournamentDs.getTournamentByLink(registrationJson._links.tournament.href).pipe(
            flatMap((tournamentJson) => {
              return zip(of(tournamentJson), this.arenaTournamentDs.getGameByLink(tournamentJson._links.game.href));
            })
          ));
      }),
      map(([registrationJson, userJson, [tournamentJson, gameJson]]) => {
        return this.registrationMapper.fromRemoteSingle([registrationJson, tournamentJson, gameJson, userJson]);
      })
    );
  }

  getRegistrationsByTournament(tournamentId: number, page: number): Observable<RegistrationEntity[]> {
    transformRegistrations(this.arenaTournamentDs.getRegistrationsByTournament(tournamentId, page));
  }

  getRegistrationsByUser(userId: string, page: number): Observable<RegistrationEntity[]> {
    return undefined;
  }

  getShowcaseTournaments(page: number): Observable<TournamentEntity[]> {
    return undefined;
  }

  getTournamentById(tournamentId: number): Observable<TournamentEntity> {
    return undefined;
  }

  getTournamentsByGame(gameName: string, page: number): Observable<TournamentEntity[]> {
    return undefined;
  }

  getTournamentsByMode(mode: string, page: number): Observable<TournamentEntity[]> {
    return undefined;
  }

  getTournamentsByUser(userId: string, page: number): Observable<TournamentEntity[]> {
    return undefined;
  }

  getTournamentsContainingTitles(title: string, page: number): Observable<TournamentEntity[]> {
    return undefined;
  }

  getUserById(id: string): Observable<UserEntity> {
    return undefined;
  }

  searchGamesByName(gameName: string, page: number): Observable<GameEntity[]> {
    return undefined;
  }

  searchTournaments(title: string, page: number, gameId?: string): Observable<TournamentEntity[]> {
    return undefined;
  }

  updateCurrentUserEmail(email: string): Observable<boolean> {
    return undefined;
  }

  updateCurrentUserNickname(nickname: string): Observable<boolean> {
    return undefined;
  }

  updateCurrentUserPassword(password: string): Observable<boolean> {
    return undefined;
  }

  updateCurrentUserProfileImage(image: Uint8Array): Observable<boolean> {
    return undefined;
  }


  private transformRegistrations(MultipleRegistrationJSON) {
    return undefined;
  }

}
