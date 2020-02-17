import {Observable} from 'rxjs';
import {ArenaTournamentRepository} from '../repositories/arena-tournament-repository';

export interface UseCase<T> {
  buildAction(): Observable<T>;
}

export interface UseCaseWithParams<P, O> {
  buildAction(params: P): Observable<O>;
}

export abstract class RepoUseCase<T> implements UseCase<T> {

  protected constructor(protected repo: ArenaTournamentRepository) {
  }

  abstract buildAction(): Observable<T>;
}

export abstract class RepoUseCaseWithParams<P, O> implements UseCaseWithParams<P, O> {
  protected constructor(protected repo: ArenaTournamentRepository) {
  }

  abstract buildAction(params: P): Observable<O>;

}
