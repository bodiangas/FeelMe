import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @Input() movie: MovieResponse;

  movieDetails = {};
  posterUrl: string;
  display = false;
  displayButton = 'Display details';
  private value;
  truncatedOverview;

  constructor(private tmdbservice: TmdbService) { }

  ngOnInit() {
    this.value = this.movie.vote_average ? this.movie.vote_average * 10 : 0;
    if (this.movie.poster_path === null) {
      this.posterUrl = 'http://via.placeholder.com/154x218?text=Not+avaliable';
    } else {
      this.posterUrl = this.tmdbservice.getPath(this.movie.poster_path);
    }
    this.truncatedOverview = this.truncate(this.movie.overview, 80, '...');
  }

  changeButton() {
    this.display = !this.display;
    if (this.display === true) {
      this.displayButton = 'Hide details';
    } else {
      this.displayButton = 'Display details';
    }
  }

   truncate = function (elem, limit, after) {
    if (!elem || !limit) { return; }
    let content = elem.trim();
    content = content.slice(0, limit) + (after ? after : '');
    // content = content.join(' ') + (after ? after : '');
    return content;
  };

}
