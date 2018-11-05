import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../tmdb.service';
import { MovieResponse } from '../../tmdb-data/Movie';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  private id;
  private _movieDetails: MovieResponse;

  constructor(private tmdbservice: TmdbService,
    private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
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
