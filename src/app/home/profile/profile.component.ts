import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GetCurrentUserOrNullUseCase} from '../../domain/usecases/use/get-current-user-or-null-usecase';
import {UserEntity} from '../../domain/entities/user-entity';
import {Observable, of, Subscription} from 'rxjs';
import {FacebookOAuthService} from '../../services/facebook-o-auth.service';
import {LinkWithGoogleProviderUseCase} from '../../domain/usecases/user/link-with-google-provider-use-case';
import {flatMap} from 'rxjs/operators';
import {LinkWithFacebookProviderUseCase} from '../../domain/usecases/user/link-with-facebook-provider-use-case';
import {MatDialog} from '@angular/material/dialog';
import {ChoosePasswordComponent} from './choose-password/choose-password.component';
import {LinkWithEmailProviderUseCase} from '../../domain/usecases/user/link-with-email-provider-use-case.service';
import {AuthProviders} from '../../domain/entities/auth-providers';
import {ArenaTournamentRepository} from '../../domain/repositories/arena-tournament-repository';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUser: UserEntity = null;
  currentUserAuthProviders: AuthProviders[] = [];
  private subs: Subscription[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private getCurrentUserOrNullUseCase: GetCurrentUserOrNullUseCase,
    private facebookOAuthService: FacebookOAuthService,
    private linkWithGoogleProviderUseCase: LinkWithGoogleProviderUseCase,
    private linkWithFacebookProviderUseCase: LinkWithFacebookProviderUseCase,
    private linkWithEmailProviderUseCase: LinkWithEmailProviderUseCase,
    private repo: ArenaTournamentRepository
  ) {

  }

  startLinkFLow(provider: `Google` | `Facebook` | 'Email') {
    const messageFun = (isLoginSuccessful: boolean) => {
      return isLoginSuccessful
        ? `Successfully linked with ${provider} account, now you can login with it`
        : `Some error occurred. Try again.`;
    };

    switch (provider) {
      case 'Facebook': {
        this.subs.push(
          this.facebookOAuthService.loginAndGetToken()
            .pipe(
              flatMap((token) => this.linkWithFacebookProviderUseCase.buildAction(token)),
              flatMap((isLoginSuccessful: boolean) => this.snackBar.open(messageFun(isLoginSuccessful)).afterDismissed())
            )
            .subscribe()
        );
        break;
      }
      case 'Google': {
        this.subs.push(
          this.linkWithGoogleProviderUseCase.buildAction()
            .pipe(
              flatMap((isLoginSuccessful: boolean) => this.snackBar.open(messageFun(isLoginSuccessful)).afterDismissed())
            )
            .subscribe()
        );
        break;
      }
      case 'Email': {
        this.subs.push(
          (this.dialog.open(ChoosePasswordComponent, {width: '250px'})
            .afterClosed() as Observable<string | undefined>)
            .pipe(
              flatMap((password) => {
                if (password) {
                  return this.linkWithEmailProviderUseCase.buildAction(password);
                } else {
                  return of(false);
                }
              }),
              flatMap((isLoginSuccessful: boolean) => this.snackBar.open(messageFun(isLoginSuccessful)).afterDismissed())
            )
            .subscribe()
        );
        break;
      }
    }
  }

  ngOnInit(): void {
    this.subs.push(this.getCurrentUserOrNullUseCase.buildAction()
      .subscribe((user) => this.currentUser = user));
    this.subs.push(
      this.repo.getCurrentUserAuthMethods()
        .subscribe((methods) => this.currentUserAuthProviders = methods)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }
}
