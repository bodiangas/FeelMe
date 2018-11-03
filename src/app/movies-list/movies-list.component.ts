import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResult, SearchMovieResponse } from '../tmdb-data/searchMovie';
import { FirebaseDatabase } from '@angular/fire';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { MovieResponse } from '../tmdb-data/Movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})

export class MoviesListComponent implements OnInit {

  private listName = null;
  private idList;
  // public myLists: FirebaseListObservable<any[]>;
  private _movies: MovieResult[] = null;
  private _moviesList: MovieList;
  random = false;

  constructor(private router: Router, private route: ActivatedRoute, private firebase: FirebaseService, private tmdb: TmdbService) {
    this.route.params.subscribe(params => {
      this.idList = params['name'];
    });
    console.log('ID ' + this.idList);
    this.firebase.movieSubject.subscribe(movies => {
      console.log('RESULTAT ', this._moviesList = movies.find(e => e.name = this.idList));
    });
    // console.log('AAAAAAAAAA', this._moviesList);
    // this._movies = this._moviesList.movies;
  }

  ngOnInit() {
    this.listName = name;
    if (this.router.url === '/movies') {
      this.random = true;
      setTimeout(() => this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').searchMovie({query: 'a'})
        .then(e => this._movies = e.results));
    }
  }

  get movies() {
    console.log('ICI', this._movies);
    return this._movies;
  }
  geName(): string {
    return this.listName;
  }

}
