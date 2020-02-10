import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ArenaTournamentRepositoryImplementation} from './data/repositories/arena-tournament-repository-implementation';
import {ArenaTournamentRepository} from './domain/repositories/is-logged-in-use-case';
import {FirebaseAuthDatasource} from './data/datasources/firebase-auth-datasource';
import {FirebaseAuthDatasourceImplementation} from './core-impl/datasources/firebase-auth-datasource-implementation';
import {FirebaseStorageDatasource} from './data/datasources/firebase-storage-datasource';
import {FirebaseStorageDatasourceImplementation} from './core-impl/datasources/firebase-storage-datasource-implementation';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../environments/environment';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {IsLoggedInUseCase} from './domain/usecases/login/is-logged-in-use-case';
import {LoginWithEmailPasswordUseCase} from './domain/usecases/login/login-with-email-password-use-case';
import {OAuthLoginComponent} from './login/oauth-login/oauth-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OAuthLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    IsLoggedInUseCase,
    LoginWithEmailPasswordUseCase,
    {provide: ArenaTournamentRepository, useClass: ArenaTournamentRepositoryImplementation},
    {provide: FirebaseAuthDatasource, useClass: FirebaseAuthDatasourceImplementation},
    {provide: FirebaseStorageDatasource, useClass: FirebaseStorageDatasourceImplementation}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
