import {UserEntity} from '../entities/user-entity';
import {Observable} from 'rxjs';
import {AuthProviders} from '../entities/auth-providers';
import {TournamentEntity} from '../entities/tournament-entity';
import {GameEntity} from '../entities/game-entity';
import {RegistrationEntity} from '../entities/registration-entity';

export abstract class ArenaTournamentRepository {

  abstract createGameMode(modeName: string): Observable<GameEntity>;

  abstract createGame(gameName: string, availableModes: string[], image: string, icon: string): Observable<GameEntity>;

  abstract createRegistration(user: UserEntity, tournament: TournamentEntity, outcome?: string): RegistrationEntity;

  abstract createTournament(
    id: number,
    playersNumber: number,
    title: string,
    description: string,
    mode: string,
    admin: UserEntity,
    game: GameEntity
  ): TournamentEntity;

  abstract updateCurrentUserEmail(email: string): boolean;

  abstract updateCurrentUserPassword(password: string): boolean;

  abstract updateCurrentUserNickname(nickname: string): boolean;

  abstract updateCurrentUserProfileImage(image: Uint8Array): boolean;

  abstract getGameByName(gameName: string): GameEntity;

  abstract searchGamesByName(gameName: string, page: number): GameEntity[];

  abstract getAllGames(page: number): GameEntity[];

  abstract getGamesContainingName(name: string, page: number): GameEntity[];

  abstract getGamesByMode(mode: string, page: number): GameEntity[];

  abstract getTournamentById(tournamentId: number): TournamentEntity;

  abstract getTournamentsByMode(mode: string, page: number): TournamentEntity[];

  abstract getTournamentsByGame(gameName: string, page: number): TournamentEntity[];

  abstract getTournamentsByUser(userId: string, page: number): TournamentEntity[];

  abstract getShowcaseTournaments(page: number): TournamentEntity[];

  abstract getTournamentsContainingTitles(title: string, page: number): TournamentEntity[];

  abstract searchTournaments(title: string, page: number, gameId?: string): TournamentEntity[];

  abstract getRegistrationById(registrationId: number): RegistrationEntity;

  abstract getRegistrationsByUser(userId: string, page: number): RegistrationEntity[];

  abstract getRegistrationsByTournament(tournamentId: number, page: number): RegistrationEntity[];

  abstract getUserById(id: string): UserEntity;

  abstract getCurrentUser(): Observable<UserEntity>;

  abstract isCurrentUserEmailVerified(): Observable<boolean>;

  abstract loginWithEmailAndPassword(email: string, password: string): Observable<boolean>;

  abstract loginWithFacebookToken(token: string): Observable<boolean>;

  abstract loginWithGoogleToken(token: string): Observable<boolean>;

  abstract logout(): Observable<boolean>;

  abstract createAccountWithEmailAndPassword(email: string, password: string): Observable<boolean>;

  abstract getCurrentUserAuthMethods(): Observable<AuthProviders[]>;

  abstract getAuthMethodsForEmail(email: string): Observable<AuthProviders[]>;

  abstract linkGoogleAuthProvider(token: string): Observable<boolean>;

  abstract linkFacebookProvider(token: string): Observable<boolean>;

  abstract linkPasswordAuthProvider(token: string): Observable<boolean>;

  abstract reauthenticateWithGoogleToken(token: string): Observable<boolean>;

  abstract reauthenticateWithFacebookToken(token: string): Observable<boolean>;

  abstract isCurrentUserSubscriber(): Observable<boolean>;
}
