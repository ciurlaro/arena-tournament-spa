import {HttpParams} from '@angular/common/http';

export abstract class ArenaTournamentEndpoints {

  /** Post endpoints  */

  abstract createGameModeUrl(): [string, HttpParams];

  abstract createGameUrl(): [string, HttpParams];

  abstract createRegistrationUrl(): [string, HttpParams];

  abstract createTournamentUrl(): [string, HttpParams];

  abstract createUserUrl(): [string, HttpParams];


  /** Get endpoints  */

  abstract allGamesUrl(page: number): [string, HttpParams];

  abstract gameByNameUrl(name: string): [string, HttpParams];

  abstract searchGamesByNameUrl(query: string, page: number): [string, HttpParams];

  abstract gamesContainingNameUrl(gameName: string, page: number): [string, HttpParams];

  abstract gamesByModeUrl(mode: string, page: number): [string, HttpParams];


  abstract allTournamentsUrl(page: number): [string, HttpParams];

  abstract tournamentByIdUrl(id: number): [string, HttpParams];

  abstract tournamentsByGameName(gameName: string, page: number): [string, HttpParams];

  abstract tournamentsByModeUrl(mode: string, page: number): [string, HttpParams];

  abstract tournamentsByAdmin(userId: string, page: number): [string, HttpParams];

  abstract searchTournamentsByNameUrl(query: string, page: number): [string, HttpParams];

  abstract getShowCaseTournaments(page: number): [string, HttpParams];

  abstract getTournamentsContainingTitle(title: string, page: number): [string, HttpParams];

  abstract allRegistrationsUrl(page: number): [string, HttpParams];

  abstract registrationByIdUrl(id: number): [string, HttpParams];

  abstract registrationsByUserUrl(userId: string, page: number): [string, HttpParams];

  abstract registrationsByTournamentUrl(tournamentId: number, page: number): [string, HttpParams];

  abstract userByIdUrl(userId: string): [string, HttpParams];

  abstract isAccountVerifiedUrl(): [string, HttpParams];

  abstract isAccountSubscribedUrl(): [string, HttpParams];

  abstract searchTournaments(title: string, page: number, gameId?: string): [string, HttpParams];


}
