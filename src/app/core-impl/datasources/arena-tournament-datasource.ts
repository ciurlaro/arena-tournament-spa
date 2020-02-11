import {RegistrationJSON} from "../../data/rawresponses/single/registration-json";
import {TournamentJSON} from "../../data/rawresponses/single/tournament-json";
import {GameJSON} from "../../data/rawresponses/single/game-json";
import {ModeJSON} from "../../data/rawresponses/single/mode-json";
import {MultipleTournamentsJSON} from "../../data/rawresponses/multiple/multiple-tournaments-json";
import {MultipleRegistrationsJSON} from "../../data/rawresponses/multiple/multiple-registrations-json";
import {UserJSON} from "../../data/rawresponses/single/user-json";
import {AccountStatusJSON} from "../../data/rawresponses/single/account-status-json";
import {MultipleGamesJSON} from "../../data/rawresponses/multiple/multiple-games-json";
import {CreateGameModeJSON} from "../../data/rawresponses/creation/create-game-mode-json";
import {CreateGameJSON} from "../../data/rawresponses/creation/create-game-json";
import {CreateRegistrationJSON} from "../../data/rawresponses/creation/create-registration-json";
import {CreateTournamentJSON} from "../../data/rawresponses/creation/create-tournament-json";
import {SubscriptionStatusJSON} from "../../data/rawresponses/single/subscription-status-json";

abstract class ArenaTournamentDatasource {

  abstract createGameMode(gameModeJSON: CreateGameModeJSON): ModeJSON

  abstract createGame(gameJSON: CreateGameJSON): GameJSON

  abstract createRegistration(registrationJSON: CreateRegistrationJSON): RegistrationJSON

  abstract createTournament(tournamentJSON: CreateTournamentJSON): TournamentJSON

  abstract getAllGames(page: number): MultipleGamesJSON

  abstract getGameByName(gameName: string): GameJSON

  abstract searchGamesByName(query: string, page: number): MultipleGamesJSON

  abstract getGameByLink(link: string): GameJSON

  abstract getGamesContainingName(gameName: string, page: number): MultipleGamesJSON

  abstract getGamesByMode(mode: string, page: number): MultipleGamesJSON

  abstract getAllTournaments(page: number): MultipleTournamentsJSON

  abstract getTournamentById(id: Long): TournamentJSON

  abstract getTournamentByLink(link: string): TournamentJSON

  abstract getTournamentsByMode(mode: string, page: number): MultipleTournamentsJSON

  abstract getTournamentsByGameName(gameName: string, page: number): MultipleTournamentsJSON

  abstract getTournamentsByUser(userId: string, page: number): MultipleTournamentsJSON

  abstract searchTournamentsByName(name: string, page: number): MultipleTournamentsJSON

  abstract getShowCaseTournaments(page: number): MultipleTournamentsJSON

  abstract getTournamentsContainingTitle(title: string, page: number): MultipleTournamentsJSON

  abstract getRegistrationById(id: Long): RegistrationJSON

  abstract getRegistrationByLink(link: string): RegistrationJSON

  abstract getRegistrationsByUser(userId: string, page: number): MultipleRegistrationsJSON

  abstract getRegistrationsByTournament(tournamentId: Long, page: number): MultipleRegistrationsJSON

  abstract getUserById(id: string): UserJSON

  abstract getUserByLink(link: string): UserJSON

  abstract getAccountVerificationStatus(): AccountStatusJSON

  abstract getAccountSubscription(): SubscriptionStatusJSON

  abstract searchTournaments(title: string, page: number, gameId?: string): MultipleTournamentsJSON
}
