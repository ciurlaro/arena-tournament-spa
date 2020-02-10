import {UseCaseWithParams} from '../use-case';
import {ArenaTournamentRepository} from '../../repositories/is-logged-in-use-case';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface LoginWithEmailPasswordUseCaseParams {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginWithEmailPasswordUseCase implements UseCaseWithParams<LoginWithEmailPasswordUseCaseParams, boolean> {

  constructor(private repo: ArenaTournamentRepository) {
  }

  buildAction(params: LoginWithEmailPasswordUseCaseParams): Observable<boolean> {
    return this.repo.loginWithEmailAndPassword(params.email, params.password);
  }

}
