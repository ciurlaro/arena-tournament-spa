import {Injectable} from '@angular/core';
import {UseCaseWithParams} from '../use-case';
import {ArenaTournamentRepository} from '../../repositories/is-logged-in-use-case';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginWithFacebookUseCase implements UseCaseWithParams<string, boolean> {

  constructor(private repo: ArenaTournamentRepository) {
  }

  buildAction(token: string): Observable<boolean> {
    return this.repo.loginWithFacebookToken(token);
  }
}
