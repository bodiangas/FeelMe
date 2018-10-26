import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie: MovieResponse;

  movieDetails: MovieDetailsComponent;
  posterUrl: string;
  display = false;
  displayButton = 'Display details';
  private value;
  private connected = false;
  truncatedOverview;

  constructor(private tmdbservice: TmdbService) { }

  ngOnInit() {
    this.value = this.movie.vote_average ? this.movie.vote_average * 10 : 0;
    console.log(this.movie.id);
    this.movie.poster_path === null ?
      this.posterUrl = 'http://via.placeholder.com/154x218?text=Not+avaliable' :
      this.posterUrl = this.tmdbservice.getPath(this.movie.poster_path);
    this.truncatedOverview = this.truncate(this.movie.overview, 130, '...');
  }

  changeButton() {
    this.display = !this.display;
    this.display === true ?
      this.displayButton = 'Hide details' :
      this.displayButton = 'Display details';
  }

  truncate(elem, limit, after) {
    if (!elem || !limit) { return; }
    return elem.trim().slice(0, limit) + (after ? after : '');
  }

}
