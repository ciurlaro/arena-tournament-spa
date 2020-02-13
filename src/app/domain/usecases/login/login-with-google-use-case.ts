import {UseCaseWithParams} from '../use-case';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ArenaTournamentRepository} from '../../repositories/arena-tournament-repository';

@Injectable({
  providedIn: 'root'
})
export class LoginWithGoogleUseCase implements UseCaseWithParams<string, boolean> {

  constructor(private repo: ArenaTournamentRepository) {
  }

  buildAction(token: string): Observable<boolean> {
    return this.repo.loginWithGoogleToken(token);
  }
}
