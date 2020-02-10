import {ArenaTournamentRepository} from '../../domain/repositories/is-logged-in-use-case';
import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {AuthProviders} from '../../domain/entities/auth-providers';
import {UserEntity} from '../../domain/entities/user-entity';
import {FirebaseAuthDatasource} from '../datasources/firebase-auth-datasource';
import {FirebaseStorageDatasource} from '../datasources/firebase-storage-datasource';
import {map, mergeMap} from 'rxjs/operators';
import {storageImagePathFor} from '../entities/auth-user-entity';

@Injectable({
  providedIn: 'root',
})
export class ArenaTournamentRepositoryImplementation extends ArenaTournamentRepository {

  constructor(
    private readonly firebaseAuthDs: FirebaseAuthDatasource,
    private readonly firebaseStorageDs: FirebaseStorageDatasource
  ) {
    super();
  }


  getCurrentUser(): Observable<UserEntity> {
    return this.firebaseAuthDs.getCurrentAuthUser().pipe(
      mergeMap((authUser) => {
        return authUser ? zip(this.firebaseStorageDs.getFileUrl(storageImagePathFor(authUser)), this.firebaseAuthDs.getCurrentUserClaims())
          .pipe(map(([userProfileImageUrl, claims]) => {
            const user: UserEntity = {
              email: authUser.email,
              id: authUser.id,
              image: userProfileImageUrl,
              nickname: authUser.nickname,
              isSubscriber: claims.get('isSubscriber')
            };
            return user;
          })) : new Observable<UserEntity>(subscriber => {
          subscriber.next(null);
          subscriber.complete();
        });
      })
    );
  }

  createAccountWithEmailAndPassword(email: string, password: string): Observable<boolean> {
    return this.firebaseAuthDs.createAccountWithEmailPassword(email, password);
  }

  getAuthMethodsForEmail(email: string): Observable<AuthProviders[]> {
    return this.firebaseAuthDs.getAuthMethodsForEmail(email);
  }

  getCurrentUserAuthMethods(): Observable<AuthProviders[]> {
    return this.firebaseAuthDs.getCurrentUserAuthMethods();
  }

  isCurrentUserEmailVerified(): Observable<boolean> {
    return this.firebaseAuthDs.isCurrentUserEmailVerified();
  }

  isCurrentUserSubscriber(): Observable<boolean> {
    return this.firebaseAuthDs.getCurrentUserClaims()
      .pipe(map((value) => value.get('isSubscriber')));
  }

  linkFacebookProvider(token: string): Observable<boolean> {
    return this.firebaseAuthDs.linkFacebookAuthProvider(token);
  }

  linkGoogleAuthProvider(token: string): Observable<boolean> {
    return this.firebaseAuthDs.linkGoogleAuthProvider(token);
  }

  linkPasswordAuthProvider(password: string): Observable<boolean> {
    return this.firebaseAuthDs.linkPasswordAuthProvider(password);
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<boolean> {
    return this.firebaseAuthDs.loginWithEmailPassword(email, password);
  }

  loginWithFacebookToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.loginWithFacebookToken(token);
  }

  loginWithGoogleToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.loginWithGoogleToken(token);
  }

  logout(): Observable<boolean> {
    return this.firebaseAuthDs.logout();
  }

  reauthenticateWithFacebookToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.reauthenticateWithFacebook(token);
  }

  reauthenticateWithGoogleToken(token: string): Observable<boolean> {
    return this.firebaseAuthDs.reauthenticateWithGoogle(token);
  }
}
