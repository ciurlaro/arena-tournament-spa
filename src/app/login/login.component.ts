import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginWithEmailPasswordUseCase} from '../domain/usecases/login/login-with-email-password-use-case';
import {Subscription} from 'rxjs';

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
  matcher = new FieldsMatcher();
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


export class FieldsMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}


