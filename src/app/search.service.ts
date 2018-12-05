import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TmdbService } from './tmdb.service';
import { SearchMovieResponse } from './tmdb-data/searchMovie';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchMoviesSubject = new Subject<SearchMovieResponse>();
  movies: SearchMovieResponse;

  constructor(private tmdb: TmdbService) { }

  search(searchedText) {
    const moviesQuery = {
      query: searchedText
    };

    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').searchMovie(moviesQuery)
      .then((res: SearchMovieResponse) => {
        this.movies = res;
        console.log(this.movies);
        this.emmitMovies();
      })
      .catch(err => console.error('Error searching movies:', err));
  }

  private emmitMovies() {
    this.searchMoviesSubject.next(this.movies);
  }

}
