import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {AuthProviders} from '../../domain/entities/auth-providers';
import {UserEntity} from '../../domain/entities/user-entity';
import {FirebaseAuthDatasource} from '../datasources/firebase-auth-datasource';
import {FirebaseStorageDatasource} from '../datasources/firebase-storage-datasource';
import {map, mergeMap} from 'rxjs/operators';
import {storageImagePathFor} from '../entities/auth-user-entity';
import {ArenaTournamentRepository} from '../../domain/repositories/arena-tournament-repository';
import {GameEntity} from '../../domain/entities/game-entity';
import {TournamentEntity} from '../../domain/entities/tournament-entity';
import {RegistrationEntity} from '../../domain/entities/registration-entity';
import {ArenaTournamentDatasource} from '../datasources/arena-tournament-datasource';
import {GameMapper, ModeMapper, RegistrationMapper, TournamentMapper, UserMapper} from '../mappers/mappers';

@Injectable({
  providedIn: 'root',
})
export class ArenaTournamentRepositoryImplementation extends ArenaTournamentRepository {

  constructor(
    private readonly firebaseAuthDs: FirebaseAuthDatasource,
    private readonly firebaseStorageDs: FirebaseStorageDatasource,
    private readonly arenaTournamentDs: ArenaTournamentDatasource,
    private readonly gameMapper: GameMapper,
    private readonly modeMapper: ModeMapper,
    private readonly tournamentMapper: TournamentMapper,
    private readonly registrationMapper: RegistrationMapper,
    private readonly userMapper: UserMapper,
    private readonly currentUserMapper: CurrentUserMapper,
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
      .pipe(map((value) => value.get('isSubscriber')));
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
              isSubscriber: claims.get('isSubscriber')
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

  createGameMode(modeName: string): Observable<GameE> {
    return this.arenaTournamentDs.createGameMode({modeName}).pipe(
      map((modeJson) => this.modeLinkMapper.fromRemoteSingle(modeJson))
    );
  }

  createRegistration(user: UserEntity, tournament: TournamentEntity, outcome?: string): RegistrationEntity {
    return undefined;
  }

  // tslint:disable-next-line:max-line-length
  createTournament(id: number, playersNumber: number, title: string, description: string, mode: string, admin: UserEntity, game: GameEntity): TournamentEntity {
    return undefined;
  }

  getAllGames(page: number): GameEntity[] {
    return [];
  }

  getGameByName(gameName: string): GameEntity {
    return undefined;
  }

  getGamesByMode(mode: string, page: number): GameEntity[] {
    return [];
  }

  getGamesContainingName(name: string, page: number): GameEntity[] {
    return [];
  }

  getRegistrationById(registrationId: number): RegistrationEntity {
    return undefined;
  }

  getRegistrationsByTournament(tournamentId: number, page: number): RegistrationEntity[] {
    return [];
  }

  getRegistrationsByUser(userId: string, page: number): RegistrationEntity[] {
    return [];
  }

  getShowcaseTournaments(page: number): TournamentEntity[] {
    return [];
  }

  getTournamentById(tournamentId: number): TournamentEntity {
    return undefined;
  }

  getTournamentsByGame(gameName: string, page: number): TournamentEntity[] {
    return [];
  }

  getTournamentsByMode(mode: string, page: number): TournamentEntity[] {
    return [];
  }

  getTournamentsByUser(userId: string, page: number): TournamentEntity[] {
    return [];
  }

  getTournamentsContainingTitles(title: string, page: number): TournamentEntity[] {
    return [];
  }

  getUserById(id: string): UserEntity {
    return undefined;
  }

  searchGamesByName(gameName: string, page: number): GameEntity[] {
    return [];
  }

  searchTournaments(title: string, page: number, gameId?: string): TournamentEntity[] {
    return [];
  }

  updateCurrentUserEmail(email: string): boolean {
    return false;
  }

  updateCurrentUserNickname(nickname: string): boolean {
    return false;
  }

  updateCurrentUserPassword(password: string): boolean {
    return false;
  }

  updateCurrentUserProfileImage(image: Uint8Array): boolean {
    return false;
  }
}
