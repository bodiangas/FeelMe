import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResearchComponent } from './research/research.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ShareListComponent } from './share-list/share-list.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent
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
    path: 'shareList',
    canActivate: [AuthGuardService],
    component : ShareListComponent
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
  MovieDetailsComponent,
  MoviesListComponent,
  UserComponent,
  HomePageComponent,
  PageNotFoundComponent,
  ShareListComponent
];
