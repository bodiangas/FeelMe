import { Component, OnInit } from '@angular/core';
import { SearchMovieQuery, SearchMovieResponse } from '../tmdb-data/searchMovie';
import { SearchService } from '../search.service';
import { TmdbService } from '../tmdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {
  movies: SearchMovieResponse;
  moviesQuery: SearchMovieQuery;
  querySubscribtion: Subscription;


  constructor(private tmdb: TmdbService, private search: SearchService) {
  }

  ngOnInit() {
    this.querySubscribtion = this.search.searchMoviesSubject.subscribe(movies => {
      this.movies =  movies;
    });

  }

}
