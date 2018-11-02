import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { AppComponent } from './app.component';
import { ActorsComponent } from './actors/actors.component';
import { UserComponent } from './user/user.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResearchComponent } from './research/research.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'actors/:id',
    component: ActorsComponent
  },
  {
    path: 'actorsList',
    component: ActorsListComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent
  },
  {
    path: 'movies',
    canActivate: [AuthGuardService],
    component: MoviesListComponent
  },
  {
    path: 'list/:id',
    component: MoviesListComponent
  },
  {
    path: 'lists',
    component: MoviesListComponent
  },
  /*{
    path: 'user',
    component: UserComponent
  },*/
  {
    path: 'search',
    component: ResearchComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent,
  ActorsComponent,
  MovieDetailsComponent,
  MoviesListComponent,
  UserComponent,
  HomePageComponent,
  ActorsListComponent,
  PageNotFoundComponent,
  NotFoundComponent
];
