import {ArenaTournamentEndpoints} from '../../data/datasources/arena-tournament-endpoints';
import {HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArenaTournamentEndpointsImplementation extends ArenaTournamentEndpoints {

  constructor(
    @Inject('protocol') private protocol: string,
    @Inject('host') private host: string,
    @Inject('port') private port: number
  ) {
    super();
  }



  /** Post endpoints */

  createGameModeUrl(): [string, HttpParams] {
    return this.buildUrl("mode");
  }

  createGameUrl(): [string, HttpParams] {
    return this.buildUrl("game");
  }

  createRegistrationUrl(): [string, HttpParams] {
    return this.buildUrl("registration");
  }

  createTournamentUrl(): [string, HttpParams] {
    return this.buildUrl("tournament");
  }

  createUserUrl(): [string, HttpParams] {
    return this.buildUrl("createUser");
  }


  /** Get endpoints */

  allGamesUrl(page: number): [string, HttpParams] {
    return this.buildUrl("game", (params) => {
      params.append("page", page.toString());
    });
  }

  allRegistrationsUrl(page: number): [string, HttpParams] {
    return this.buildUrl("/registration", (params) => {
      params.append("page", page.toString())
    });
  }

  allTournamentsUrl(page: number): [string, HttpParams] {
    return this.buildUrl("/tournament", (params) => {
      params.append("page", page.toString())
    });
  }

  gameByNameUrl(name: string): [string, HttpParams] {
    return this.buildUrl(`game/${name}`)
  }

  gamesContainingNameUrl(gameName: string, page: number): [string, HttpParams] {
    return this.buildUrl("/game/search/containingGameName", (params) =>  {
      params.append("gameName", gameName);
      params.append("page", page.toString())
    });
  }

  gamesByModeUrl(mode: string, page: number): [string, HttpParams] {
    return this.buildUrl('game/search/byMode', (params) => {
      params.append('available_modes_mode_name', mode);
      params.append('page', page.toString());
    });
  }

  getShowCaseTournaments(page: number): [string, HttpParams] {
    return this.buildUrl(`tournament/search/byShowCase`, (params) => {
      params.append("page", page.toString())
    });
  }

  getTournamentsContainingTitle(title: string, page: number): [string, HttpParams] {
    return this.buildUrl("/tournament/search/containingTitle", (params) =>  {
      params.append("title", title);
      params.append("page", page.toString());
    });
  }

  isAccountSubscribedUrl(): [string, HttpParams] {
    return this.buildUrl("isAccountSubscribed");
  }

  isAccountVerifiedUrl(): [string, HttpParams] {
    return this.buildUrl("isAccountVerified");
  }

  registrationByIdUrl(id: number): [string, HttpParams] {
    return this.buildUrl(`/user/${id}`);
  }

  registrationsByTournamentUrl(tournamentId: number, page: number): [string, HttpParams] {
    return this.buildUrl("/registration/search/byTournamentId", (params) => {
      params.append("tournamentId", tournamentId.toString());
      params.append("page", page.toString())
    });
  }

  registrationsByUserUrl(userId: string, page: number): [string, HttpParams] {
    return this.buildUrl("/registration/search/byUserId", (params) =>  {
      params.append("userId", userId);
      params.append("page", page.toString())
    });
  }

  searchGamesByNameUrl(query: string, page: number): [string, HttpParams] {
    return this.buildUrl(`game/search/byGameName`, (params) => {
      params.append("gameName", query);
      params.append("page", page.toString());
    });
  }

  searchTournaments(title: string, page: number, gameId?: string): [string, HttpParams] {
    return this.buildUrl("tournament/search/byNameAndGames", (params) =>  {
      params.append("title", title);
      if (gameId) {
        params.append("gameIds", gameId);
      }
    });
  }

  searchTournamentsByNameUrl(query: string, page: number): [string, HttpParams] {
    return this.buildUrl("/tournament/search/byName", (params) => {
      params.append("title", query);
      params.append("page", page.toString());
    });
  }

  tournamentByIdUrl(id: number): [string, HttpParams] {
    return this.buildUrl(`/tournament/${id}`)
  }

  tournamentsByAdmin(userId: string, page: number): [string, HttpParams] {
    return this.buildUrl("/tournament/search/byUserId", (params) =>  {
      params.append("admin", userId);
      params.append("page", page.toString());
    });
  }

  tournamentsByGameName(gameName: string, page: number): [string, HttpParams] {
    return this.buildUrl("/tournament/search/byGame", (params) => {
      params.append("gameName", gameName);
      params.append("page", page.toString());
    });
  }

  tournamentsByModeUrl(mode: string, page: number): [string, HttpParams] {
    return this.buildUrl("/tournament/search/byMode", (params) => {
      params.append("tournamentMode", mode);
      params.append("page", page.toString())
    });
  }

  userByIdUrl(userId: string): [string, HttpParams] {
    return this.buildUrl(`/user/${userId}`);
  }


  private buildUrl(path: string, builder: ((params: HttpParams) => void) = () => {
  }): [string, HttpParams] {
    const params = new HttpParams();
    builder(params);
    return [`${this.protocol}://${this.host}${this.port !== 80 ? `:${this.port}` : ''}/${path}`, params];
  }

}
