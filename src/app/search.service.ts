import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TmdbService } from './tmdb.service';
import {
  SearchMovieResponse,
  SearchMovieQuery,
  MovieResult
} from './tmdb-data/searchMovie';
import { MovieGenre } from './tmdb-data/Movie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnInit {
  searchMoviesSubject = new Subject<SearchMovieResponse>();
  movies: SearchMovieResponse;

  constructor(
    private tmdb: TmdbService,
    private router: Router) {}

  ngOnInit() {
    /*console.log('here');
    if (this.movies === null) {
      this.router.navigateByUrl('/');
    }*/
  }

  search(moviesQuery: SearchMovieQuery, genres: number[], minYear: string) {
    this.tmdb
      .init('544a04ed01152432f1d7ed782ed24b73')
      .searchMovie(moviesQuery)
      .then((res: SearchMovieResponse) => {
        this.movies = res;
        console.log(res, minYear);
        this.movies.results = this.movies.results.filter(e => e.release_date >= minYear);
        if (genres.length !== 0) {
          let resultFiltered: MovieResult[] = [];
          genres.forEach(g => {
            resultFiltered = this.union (resultFiltered, this.movies.results.filter(r => r.genre_ids.includes(g)));
          });
          console.log('Got movies searched');
          this.movies.results = resultFiltered;
        }
        this.emmitMovies();
      })
      .catch(err => console.error('Error searching movies:', err));
  }

  private union(arr1: any[], arr2: any[]) {
    arr2.forEach((e, pos, array) => {
      if (!arr1.includes(e)) {
        arr1.push(e);
      }
    });
    return arr1;
  }

  private emmitMovies() {
    this.searchMoviesSubject.next(this.movies);
  }
}
