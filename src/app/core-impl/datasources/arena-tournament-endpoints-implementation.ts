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

  gamesByModeUrl(mode: string, page: number): [string, HttpParams] {
    return this.buildUrl('game/search/byMode', (params) => {
      params.append('available_modes_mode_name', mode);
      params.append('page', page.toString());
    });
  }

  private buildUrl(path: string, builder: ((params: HttpParams) => void) = () => {
  }): [string, HttpParams] {
    const params = new HttpParams();
    builder(params);
    return [`${this.protocol}://${this.host}${this.port !== 80 ? `:${this.port}` : ''}/${path}`, params];
  }

}
