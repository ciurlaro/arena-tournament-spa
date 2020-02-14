import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginWithEmailPasswordUseCase} from '../domain/usecases/login/login-with-email-password-use-case';
import {Router} from '@angular/router';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, flatMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';

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
  matcher = new FieldsStateMatcher();
  private loginSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loginWithEmailPasswordUseCase: LoginWithEmailPasswordUseCase,
    private router: Router
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  onSubmit(data) {
    this.loginSub = this.loginWithEmailPasswordUseCase.buildAction(data).pipe(
      catchError((err: Error, _) => {
        this.showError(err);
        return of(false);
      }),
      flatMap(isLoginSuccessful => {
        if (isLoginSuccessful) {
          return fromPromise(this.router.navigateByUrl('home'));
        } else {
          return of(false);
        }
      })
    )
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
    if (!this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  private showError(err: Error) {

  }
}


export class FieldsStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}


