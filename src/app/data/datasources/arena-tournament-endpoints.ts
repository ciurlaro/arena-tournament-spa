import {HttpParams} from '@angular/common/http';

export abstract class ArenaTournamentEndpoints {
  abstract gamesByModeUrl(mode: string, page: number): [string, HttpParams];
}
