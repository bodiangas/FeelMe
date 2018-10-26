import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, SearchTrendingQuery, MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() name: string;
  @Input() param?;

  private listName = null;
  private _movies: MovieResult[] = null;
  private _movieSelected = false;

  constructor(tmdb: TmdbService) {
    tmdb.init('544a04ed01152432f1d7ed782ed24b73');
    setTimeout(() =>
      tmdb.getTrending({ media_type: 'movie', time_window: 'week' } as SearchTrendingQuery)
        .then((d: SearchMovieResponse) => console.log('Movies :', this._movies = d.results)), 1000);
  }

  ngOnInit() {
    this.listName = name;
    console.log(this.listName);
  }
  get movies() {
    return this._movies;
  }
  geName(): string {
    return this.listName;
  }

}
