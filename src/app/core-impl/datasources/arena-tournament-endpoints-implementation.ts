import {ArenaTournamentEndpoints, Url} from '../../data/datasources/arena-tournament-endpoints';
import {HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {hostToken, portToken, protocolToken} from '../../../environments/environment.common';

@Injectable({
  providedIn: 'root'
})
export class ArenaTournamentEndpointsImplementation extends ArenaTournamentEndpoints {

  constructor(
    @Inject(protocolToken) private protocol: string,
    @Inject(hostToken) private host: string,
    @Inject(portToken) private port: number
  ) {
    super();
  }


  /** Post endpoints */

  createGameModeUrl(): Url {
    return this.buildUrl('mode');
  }

  createGameUrl(): Url {
    return this.buildUrl('game');
  }

  createRegistrationUrl(): Url {
    return this.buildUrl('registration');
  }

  createTournamentUrl(): Url {
    return this.buildUrl('tournament');
  }

  createUserUrl(): Url {
    return this.buildUrl('createUser');
  }


  /** Get endpoints */

  allGamesUrl(page: number): Url {
    return this.buildUrl('game', (params) => {
      params.append('page', page.toString());
    });
  }

  allRegistrationsUrl(page: number): Url {
    return this.buildUrl('/registration', (params) => {
      params.append('page', page.toString());
    });
  }

  allTournamentsUrl(page: number): Url {
    return this.buildUrl('/tournament', (params) => {
      params.append('page', page.toString());
    });
  }

  gameByNameUrl(name: string): Url {
    return this.buildUrl(`game/${name}`);
  }

  gamesContainingNameUrl(gameName: string, page: number): Url {
    return this.buildUrl('/game/search/containingGameName', (params) => {
      params.append('gameName', gameName);
      params.append('page', page.toString());
    });
  }

  gamesByModeUrl(mode: string, page: number): Url {
    return this.buildUrl('game/search/byMode', (params) => {
      params.append('available_modes_mode_name', mode);
      params.append('page', page.toString());
    });
  }

  getShowCaseTournaments(page: number): Url {
    return this.buildUrl(`tournament/search/byShowCase`, (params) => {
      params.append('page', page.toString());
    });
  }

  getTournamentsContainingTitle(title: string, page: number): Url {
    return this.buildUrl('/tournament/search/containingTitle', (params) => {
      params.append('title', title);
      params.append('page', page.toString());
    });
  }

  isAccountSubscribedUrl(): Url {
    return this.buildUrl('isAccountSubscribed');
  }

  isAccountVerifiedUrl(): Url {
    return this.buildUrl('isAccountVerified');
  }

  registrationByIdUrl(id: number): Url {
    return this.buildUrl(`/user/${id}`);
  }

  registrationsByTournamentUrl(tournamentId: number, page: number): Url {
    return this.buildUrl('/registration/search/byTournamentId', (params) => {
      params.append('tournamentId', tournamentId.toString());
      params.append('page', page.toString());
    });
  }

  registrationsByUserUrl(userId: string, page: number): Url {
    return this.buildUrl('/registration/search/byUserId', (params) => {
      params.append('userId', userId);
      params.append('page', page.toString());
    });
  }

  searchGamesByNameUrl(query: string, page: number): Url {
    return this.buildUrl(`game/search/byGameName`, (params) => {
      params.append('gameName', query);
      params.append('page', page.toString());
    });
  }

  searchTournaments(title: string, page: number, gameId?: string): Url {
    return this.buildUrl('tournament/search/byNameAndGames', (params) => {
      params.append('title', title);
      if (gameId) {
        params.append('gameIds', gameId);
      }
    });
  }

  searchTournamentsByNameUrl(query: string, page: number): Url {
    return this.buildUrl('/tournament/search/byName', (params) => {
      params.append('title', query);
      params.append('page', page.toString());
    });
  }

  tournamentByIdUrl(id: number): Url {
    return this.buildUrl(`/tournament/${id}`);
  }

  tournamentsByAdmin(userId: string, page: number): Url {
    return this.buildUrl('/tournament/search/byUserId', (params) => {
      params.append('admin', userId);
      params.append('page', page.toString());
    });
  }

  tournamentsByGameName(gameName: string, page: number): Url {
    return this.buildUrl('/tournament/search/byGame', (params) => {
      params.append('gameName', gameName);
      params.append('page', page.toString());
    });
  }

  tournamentsByModeUrl(mode: string, page: number): Url {
    return this.buildUrl('/tournament/search/byMode', (params) => {
      params.append('tournamentMode', mode);
      params.append('page', page.toString());
    });
  }

  userByIdUrl(userId: string): Url {
    return this.buildUrl(`/user/${userId}`);
  }


  private buildUrl(path: string, builder?: ((params: HttpParams) => void)): Url {
    const pathh = `${this.protocol}://${this.host}${this.port !== 80 ? `:${this.port}` : ''}/${path}`;
    if (builder) {
      const params = new HttpParams();
      builder(params);
      return {path: pathh, params};
    } else {
      return {path: pathh};
    }
  }

}
