import { Component, OnInit, OnDestroy } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResult, SearchMovieResponse } from '../tmdb-data/searchMovie';
import { FirebaseDatabase } from '@angular/fire';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from 'firebase';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})

export class MoviesListComponent implements OnInit, OnDestroy {

  private listName = null;
  private idList;
  // public myLists: FirebaseListObservable<any[]>;
  private _movies: MovieResult[] | MovieResponse[] = null;
  private _moviesList: MovieList[];
  private userSubscription = new Subscription();
  isConnected = false;
  random = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private firebase: FirebaseService, private tmdb: TmdbService, private userService: UserService) {
    this.route.params.subscribe(params => {
      this.idList = params['name'];
    });
    console.log('ID ' + this.idList);
    // this.firebase.movieSubject.subscribe(movies => {
    //   console.log('RESULTAT ', this._moviesList = movies.find(e => e.name = this.idList));
    // });
    // console.log('AAAAAAAAAA', this._moviesList);
    // this._movies = this._moviesList.movies;
  }

  ngOnInit() {
    let _user: User;
    this.listName = this.idList;
    this.userSubscription = this.userService.userSubject.subscribe(
      (user) => {
        if (user) {
          _user = user;
          this.isConnected = true;
        }
      }
    );
    this.userService.emmitUser();
    if (this.router.url === '/movies') {
      this.random = true;
      setTimeout(() => this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').searchMovie({ query: 'a' })
        .then(e => this._movies = e.results));
    } else {
      this.firebase.movieSubject.subscribe(m => {
        let LISTE: MovieList;
        console.log('MES LISTES', this._moviesList = m);
        console.log('LA LISTE', LISTE = this._moviesList.find(
          (movie) => movie.name === this.idList));
        const nMovies: MovieResponse[] = null;
        this._movies = LISTE.movies;
        console.log('LA VRAIE LISTE ', this._movies);
      });
      // find((m: MovieList) => m.name = this.listName).movies);
    }

  }

  ngOnDestroy() {

  }

  get movies() {
    return this._movies;
  }

  get name(): string {
    return this.listName;
  }

}
