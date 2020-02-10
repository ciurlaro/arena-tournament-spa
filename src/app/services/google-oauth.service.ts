import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {fromPromise} from 'rxjs/internal-compatibility';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class GoogleOAuthService {

  constructor(private fAuth: AngularFireAuth) {
  }

  login(): Observable<boolean> {
    return fromPromise(this.fAuth.signInWithPopup(new GoogleAuthProvider()))
      .pipe(
        map((credentials) => {
          return true;
        }),
      );
  }
}
