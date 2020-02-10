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
import {OAuthLoginComponent} from './login/oauth-login/oauth-login.component';
import {HomeComponent} from './home/home.component';
import {TournamentCardComponent} from './home/tournament-card/tournament-card.component';
import {MatCardModule} from '@angular/material/card';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './http/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OAuthLoginComponent,
    HomeComponent,
    TournamentCardComponent
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
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    {provide: ArenaTournamentRepository, useClass: ArenaTournamentRepositoryImplementation},
    {provide: FirebaseAuthDatasource, useClass: FirebaseAuthDatasourceImplementation},
    {provide: FirebaseStorageDatasource, useClass: FirebaseStorageDatasourceImplementation},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
