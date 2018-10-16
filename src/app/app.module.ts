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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    ResearchComponent,
    MoviesComponent,
    MoviesListComponent,
    ActorsComponent,
    ActorsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
