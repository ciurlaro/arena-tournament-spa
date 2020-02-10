import {Observable} from 'rxjs';

export interface UseCase<T> {
  buildAction(): Observable<T>;
}

export interface UseCaseWithParams<P, O> {
  buildAction(params: P): Observable<O>;
}
