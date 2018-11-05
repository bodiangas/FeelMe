import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { AppComponent } from './app.component';
import { ActorDetailsComponent } from './actors-list/actor-details/actor-details.component';
import { UserComponent } from './user/user.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResearchComponent } from './research/research.component';
import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'actor/:id',
    component: ActorDetailsComponent
  },
  {
    path: 'actors',
    component: ActorsListComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: 'list/:name',
    canActivate: [AuthGuardService],
    component: MoviesListComponent
  },
  {
    path: 'lists',
    canActivate: [AuthGuardService],
    component: MoviesListComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'search',
    component: ResearchComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent,
  ActorDetailsComponent,
  ActorsListComponent,
  MovieDetailsComponent,
  MoviesListComponent,
  UserComponent,
  HomePageComponent,
  PageNotFoundComponent
];
