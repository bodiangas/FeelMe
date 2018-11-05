import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../../tmdb.service';
import { MovieResponse } from '../../tmdb-data/Movie';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  // @Input() id: number;
  // movieDetails$: Observable<MovieResponse>;

  private id;
  private _movieDetails: MovieResponse;

  constructor(private tmdbservice: TmdbService,
    private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    console.log('ID ' + this.id);
  }

  ngOnInit() {
    setTimeout(() =>
      this.tmdbservice.init('544a04ed01152432f1d7ed782ed24b73').getMovie(this.id)
        .then((m: MovieResponse) => {
          console.log('Movie with ', this._movieDetails = m);
        }));
  }

  get movieDetails(): MovieResponse {
    return this._movieDetails;
  }

  gotoMovies(movie: MovieResponse) {
    const movieId = movie ? movie.id : null;
    // pass id movie to movies
    this.router.navigate(['/movies', { id: movieId }]);
  }

  getPath(path: string): string {
    return this.tmdbservice.getPath(path);
  }
}
