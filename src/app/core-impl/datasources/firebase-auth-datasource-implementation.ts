import {FirebaseAuthDatasource} from '../../data/datasources/firebase-auth-datasource';
import {Observable} from 'rxjs';
import {AuthProviders} from '../../domain/entities/auth-providers';
import {AuthUserEntity} from '../../data/entities/auth-user-entity';
import {AngularFireAuth} from '@angular/fire/auth';
import {flatMap, map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {Injectable} from '@angular/core';
import {Claims} from '../../data/rawresponses/claims';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthDatasourceImplementation extends FirebaseAuthDatasource {

  constructor(private firebaseAuth: AngularFireAuth) {
    super();
  }

  createAccountWithEmailPassword(email: string, password: string): Observable<boolean> {
    return fromPromise(this.firebaseAuth.createUserWithEmailAndPassword(email, password))
      .pipe(map((_) => true));
  }

  getAuthMethodsForEmail(email: string): Observable<AuthProviders[]> {
    return fromPromise(this.firebaseAuth.fetchSignInMethodsForEmail(email))
      .pipe(map((providerStrings) => {
        return providerStrings.map(providerString => {
          switch (providerString) {
            case GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD:
              return AuthProviders.GOOGLE;
            case FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD:
              return AuthProviders.FACEBOOK;
            case EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD:
              return AuthProviders.EMAIL_PASSWORD;
          }
        });
      }));
  }

  getCurrentAuthUser(): Observable<AuthUserEntity | null> {
    return fromPromise(this.firebaseAuth.currentUser)
      .pipe(map((user) => {
        if (user) {
          return {
            nickname: user.displayName,
            id: user.uid,
            email: user.email
          };
        } else {
          return null;
        }
      }));
  }

  getCurrentUserAuthMethods(): Observable<AuthProviders[]> {
    return this.userOrError().pipe(flatMap((user) => {
      return this.getAuthMethodsForEmail(user.email);
    }));
  }

  getCurrentUserClaims(): Observable<Claims> {
    return this.userOrError().pipe(
      flatMap((user) => fromPromise(user.getIdTokenResult(true))),
      map((value) => {
        return {isSubscriber: value.claims.isSubscriber ? Boolean(value.claims.isSubscriber) : false};
      })
    );
  }

  getToken(): Observable<string> {
    return this.userOrError().pipe(
      flatMap((user) => fromPromise(user.getIdTokenResult(true))),
      map((tokenResult) => tokenResult.token)
    );
  }

  isCurrentUserEmailVerified(): Observable<boolean> {
    return this.userOrError().pipe(
      map(user => user.emailVerified)
    );
  }

  linkFacebookAuthProvider(token: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.linkWithCredential(FacebookAuthProvider.credential(token)))),
      map((_) => true)
    );
  }

  linkGoogleAuthProvider(token: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.linkWithCredential(GoogleAuthProvider.credential(token)))),
      map((_) => true)
    );
  }

  linkPasswordAuthProvider(password: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.linkWithCredential(EmailAuthProvider.credential(user.email, password)))),
      map((_) => true)
    );
  }

  loginWithEmailPassword(email: string, password: string): Observable<boolean> { //  TODO() https://firebase.google.com/docs/auth/web/auth-state-persistence
    return fromPromise(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((_) => true)
    );
  }

  loginWithGoogleToken(token: string): Observable<boolean> {
    return fromPromise(this.firebaseAuth.signInWithCredential(GoogleAuthProvider.credential(token))).pipe(
      map((_) => true)
    );
  }

  loginWithFacebookToken(token: string): Observable<boolean> {
    return fromPromise(this.firebaseAuth.signInWithCredential(FacebookAuthProvider.credential(token))).pipe(
      map((_) => true)
    );
  }

  logout(): Observable<boolean> {
    return fromPromise(this.firebaseAuth.signOut()).pipe(
      map(_ => true)
    );
  }

  reauthenticateWithGoogle(token: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => user.reauthenticateWithCredential(GoogleAuthProvider.credential(token))),
      map(_ => true)
    );
  }

  reauthenticateWithFacebook(token: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => user.reauthenticateWithCredential(FacebookAuthProvider.credential(token))),
      map(_ => true)
    );
  }

  reauthenticateWithPassword(password: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => user.reauthenticateWithCredential(EmailAuthProvider.credential(user.email, password))),
      map(_ => true)
    );
  }

  updateUserEmail(email: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.updateEmail(email))),
      map(_ => true)
    );
  }

  updateUserNickname(nickname: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.updateProfile({displayName: nickname}))),
      map(_ => true)
    );
  }

  updateUserPassword(password: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.updatePassword(password))),
      map(_ => true)
    );
  }

  updateUserProfileImage(image: string): Observable<boolean> {
    return this.userOrError().pipe(
      flatMap(user => fromPromise(user.updateProfile({photoURL: image}))),
      map(_ => true)
    );
  }

  private userOrError(): Observable<User> {
    return fromPromise(this.firebaseAuth.currentUser)
      .pipe(map((user) => {
        // console.log(`User is: ${JSON.stringify(user)}`);
        if (user) {
          return user;
        } else {
          throw new Error('not authenticated');
        }
      }));
  }
}
