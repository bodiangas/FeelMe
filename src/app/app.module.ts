import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchService } from './search.service';


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
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { AppRoutingModule, routingComponents } from './app-routing.module';


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
    routingComponents,
  ],
  imports: [
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
    AppRoutingModule,
    FormsModule
  ],
  providers: [TmdbService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
