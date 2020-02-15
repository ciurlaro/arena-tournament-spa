import {Injectable} from '@angular/core';
import {UseCase} from '../use-case';
import {ArenaTournamentRepository} from '../../repositories/arena-tournament-repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthChangesUseCase implements UseCase<boolean> {

  constructor(private readonly repo: ArenaTournamentRepository) {
  }

  buildAction(): Observable<boolean> {
    return this.repo.authChangesFlow();
  }
}
