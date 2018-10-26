import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, SearchTrendingQuery, MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Input() name: string;
  @Input() param?;

  private listName = null;
  private _movies: MovieResult[] = null;
  private _moviesTab: MovieResult[][] = null;
  private _movieSelected = false;

  constructor(tmdb: TmdbService) {
    tmdb.init('544a04ed01152432f1d7ed782ed24b73');
    setTimeout(() =>
      tmdb.getTrending({ media_type: 'movie', time_window: 'week' } as SearchTrendingQuery)
        .then((d: SearchMovieResponse) => console.log('Movies tend:', this._movies = d.results)), 1000);
     /*   console.log('dddddddddd', this._moviesTab[0]);
    // this._moviesTab.push(this._movies );
    setTimeout(() =>
      tmdb.getPopular()
        .then((d: SearchMovieResponse) => console.log('Movies Pop:', this._movies = d.results)), 1000);
    this._moviesTab.push(this._movies);
    setTimeout(() =>
      tmdb.getUpcoming()
        .then((d: SearchMovieResponse) => console.log('Movies Upcom:', this._movies = d.results)), 1000);
    this._moviesTab.push(this._movies);*/
  }

  ngOnInit() {
    this.listName = name;
    console.log(this.listName);
  }
  get movies() {
    return this._movies;
  }
}
