import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginWithEmailPasswordUseCase} from '../domain/usecases/login/login-with-email-password-use-case';
import {Subscription} from 'rxjs';
import {ArenaTournamentFieldsMatcher} from './arena-tournament-fields-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  loginFormGroup: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new ArenaTournamentFieldsMatcher();
  private loginSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loginWithEmailPasswordUseCase: LoginWithEmailPasswordUseCase
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  onSubmit(data) {
    this.loginSub = this.loginWithEmailPasswordUseCase.buildAction(data)
      .subscribe();
  }

  getPasswordError(): string {
    return this.passwordFormControl.hasError('required') ? 'You must enter a value' :
      this.passwordFormControl.hasError('minlength') ? `At least 6 chars` : '';
  }

  getEmailError(): string {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
      this.emailFormControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}


