import {Observable} from 'rxjs';
import {AuthProviders} from '../../domain/entities/auth-providers';
import {AuthUserEntity} from '../entities/auth-user-entity';
import {Claims} from '../rawresponses/claims';

export abstract class FirebaseAuthDatasource {
  abstract updateUserEmail(email: string): Observable<boolean>;

  abstract updateUserPassword(password: string): Observable<boolean>;

  abstract updateUserProfileImage(image: string): Observable<boolean>;

  abstract updateUserNickname(nickname: string): Observable<boolean>;

  abstract loginWithEmailPassword(email: string, password: string): Observable<boolean>;

  abstract loginWithFacebookToken(token: string): Observable<boolean>;

  abstract loginWithGoogleToken(token: string): Observable<boolean>;

  abstract logout(): Observable<boolean>;

  abstract createAccountWithEmailPassword(email: string, password: string): Observable<boolean>;

  abstract getCurrentUserAuthMethods(): Observable<AuthProviders[]>;

  abstract getAuthMethodsForEmail(email: string): Observable<AuthProviders[]>;

  abstract linkFacebookAuthProvider(token: string): Observable<boolean>;

  abstract linkGoogleAuthProvider(token: string): Observable<boolean>;

  abstract linkPasswordAuthProvider(password: string): Observable<boolean>;

  abstract reauthenticateWithPassword(password: string): Observable<boolean>;

  abstract reauthenticateWithGoogle(token: string): Observable<boolean>;

  abstract reauthenticateWithFacebook(token: string): Observable<boolean>;

  abstract getToken(): Observable<string>;

  abstract getCurrentAuthUser(): Observable<AuthUserEntity | null>;

  abstract getCurrentUserClaims(): Observable<Claims>;

  abstract isCurrentUserEmailVerified(): Observable<boolean>;
}
