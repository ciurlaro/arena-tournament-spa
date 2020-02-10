import {UseCaseWithParams} from '../use-case';
import {ArenaTournamentRepository} from '../../repositories/is-logged-in-use-case';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

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
