import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TmdbService } from './tmdb.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserComponent } from './user/user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResearchComponent } from './research/research.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieComponent, DialogOverviewComponent } from './movie/movie.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MainNavComponent, DialogCreateListComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SigninChoiceComponent } from './user/signin-choice/signin-choice.component';
import { LoginDialogComponent } from './user/login-dialog/login-dialog.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SearchService } from './search.service';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginEmailComponent } from './user/login-email/login-email.component';
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    ResearchComponent,
    MovieDetailsComponent,
    MovieComponent,
    MoviesListComponent,
    MainNavComponent,
    SigninChoiceComponent,
    LoginDialogComponent,
    routingComponents,
    MovieComponent,
    DialogOverviewComponent,
    DialogCreateListComponent,
    ForgetPasswordComponent,
    LoginEmailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    LayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  entryComponents: [
    SigninChoiceComponent,
    LoginDialogComponent,
    DialogOverviewComponent,
    LoginEmailComponent,
    ForgetPasswordComponent,
    DialogCreateListComponent
  ],
  providers: [TmdbService, UserService, SearchService, AuthGuardService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
