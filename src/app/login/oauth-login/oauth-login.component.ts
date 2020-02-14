import {Component, OnDestroy} from '@angular/core';
import {LoginWithFacebookUseCase} from '../../domain/usecases/login/login-with-facebook-use-case';
import {FacebookOAuthService} from '../../services/facebook-o-auth.service';
import {catchError, flatMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {GoogleOAuthService} from '../../services/google-oauth.service';
import {LoginWithGoogleUseCase} from '../../domain/usecases/login/login-with-google-use-case';

@Component({
  selector: 'app-oauth-login',
  templateUrl: './oauth-login.component.html',
  styleUrls: ['./oauth-login.component.scss']
})
export class OAuthLoginComponent implements OnDestroy {

  private loginSub: Subscription;

  constructor(
    private loginWithFacebookUseCase: LoginWithFacebookUseCase,
    private loginWithGoogleUseCase: LoginWithGoogleUseCase,
    private fbService: FacebookOAuthService,
    private googleService: GoogleOAuthService,
    private router: Router,
  ) {
  }

  onFacebookButtonClicked() {
    this.loginSub = this.pipeLogin(this.fbService.loginAndGetToken(), 'facebook')
      .subscribe();
  }

  onGoogleButtonClicked() {
    this.loginSub = this.googleService.login()
      .pipe(
        flatMap(_ => fromPromise(this.router.navigateByUrl('home'))),
        catchError((err) => {
          console.error(err);
          return of(false);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  private pipeLogin(from: Observable<string>, withProvider: 'google' | 'facebook'): Observable<boolean> {
    return from.pipe(
      flatMap((token) => {
        if (withProvider === 'google') {
          return this.loginWithGoogleUseCase.buildAction(token);
        } else if (withProvider === 'facebook') {
          return this.loginWithFacebookUseCase.buildAction(token);
        }
      }),
      flatMap(_ => fromPromise(this.router.navigateByUrl('home'))),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }
}
