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


const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'actors',
    component: ActorsComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: 'Lists',
    component: MoviesListComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'actorsList',
    component: ActorsListComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent
  },
  { path: 'movie/:id', redirectTo: '/movies/:id' },
  {
    path: '**',
    component: PageNotFoundComponent
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
  PageNotFoundComponent
];
