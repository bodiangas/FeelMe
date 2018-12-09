import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, MovieResult } from '../tmdb-data/searchMovie';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private _moviesTab: MovieResult[][];
  movies;
  images;

  constructor(private tmdb: TmdbService, private route: ActivatedRoute) {
    setTimeout(() =>
      this.tmdb.getHomeMovies().then((d: SearchMovieResponse[]) => {
        this.movies = d.map(e => e.results);
      })
    );
    // this._moviesTab = this.route.snapshot.data.message.map(e => e.results);
    // console.log('DATA : ', this._moviesTab);
  }

  ngOnInit() {
  }

  get moviesTab() {
    return this._moviesTab;
  }
}
