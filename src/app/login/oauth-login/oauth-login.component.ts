import {Component, OnDestroy} from '@angular/core';
import {LoginWithFacebookUseCase} from '../../domain/usecases/login/login-with-facebook-use-case';
import {FacebookOAuthService} from '../../services/facebook-o-auth.service';
import {flatMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
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
    private fbService: FacebookOAuthService
  ) {
  }

  onFacebookButtonClicked() {
    this.loginSub = this.fbService.loginAndGetToken()
      .pipe(
        flatMap((token) => this.loginWithFacebookUseCase.buildAction(token))
      )
      .subscribe();
  }

  onGoogleButtonClicked() {
    this.loginSub = this.loginWithGoogleUseCase.buildAction()
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
