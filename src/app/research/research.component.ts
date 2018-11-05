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
  resMovies: SearchMovieResponse;
  moviesQuery: SearchMovieQuery;
  querySubscribtion: Subscription;


  constructor(private tmdb: TmdbService, private search: SearchService) {
  }

  ngOnInit() {
    this.querySubscribtion = this.search.searchTextSubject.subscribe(moviesQuery => {
      this.moviesQuery = {
        query: moviesQuery
      };
      this.getSearch();
    });

  }

  get movies() {
    return this.resMovies;
  }

  getSearch(): void {
    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').searchMovie(this.moviesQuery)
      .then((res: SearchMovieResponse) => this.resMovies = res)
      .catch(err => console.error('Error searching movies:', err));
  }

}
