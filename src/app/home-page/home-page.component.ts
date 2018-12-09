import { Component } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  private _moviesTab: MovieResult[][];
  images;

  constructor(private tmdb: TmdbService) {
    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73');
    setTimeout(() =>
      this.tmdb.getHomeMovies().then((d: SearchMovieResponse[]) => this._moviesTab = d.map(e => e.results))
    );
  }

  get movies() {
    return this._moviesTab;
  }
}
