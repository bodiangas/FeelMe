import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {TmdbService} from './tmdb.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { UserComponent } from './user/user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResearchComponent } from './research/research.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatDialogModule, MatFormField, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SigninChoiceComponent } from './user/signin-choice/signin-choice.component';
import { LoginDialogComponent } from './user/login-dialog/login-dialog.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailConnexionComponent } from './user/email-connexion/email-connexion.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    ResearchComponent,
    MoviesComponent,
    MoviesListComponent,
    ActorsComponent,
    ActorsListComponent,
    MainNavComponent,
    SigninChoiceComponent,
    LoginDialogComponent,
    EmailConnexionComponent,
    ForgotPasswordComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SigninChoiceComponent,
    LoginDialogComponent,
  ],
  providers: [TmdbService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
