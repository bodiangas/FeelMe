import { Component, OnInit, OnDestroy } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResult } from '../tmdb-data/searchMovie';
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

  private idList;
  private _movies: MovieResult[] | MovieResponse[] = null;
  private _moviesList: MovieList[] = null;
  private _user: User;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  isConnected = false;
  random = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private firebase: FirebaseService, private tmdb: TmdbService, private userService: UserService) {
    if (this.router.url === '/movies') {
      this.random = true;
      setTimeout(() => this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').searchMovie({ query: 'a' })
        .then(e => this._movies = e.results));
    }
  }

  ngOnInit() {
    this.firebaseSubscription = this.firebase.movieSubject.subscribe(m => {
      this._moviesList = m;
    });
    this.firebase.emmitUserMoviesList();
    this.route.params.subscribe(params => {
      if (this.router.url !== '/movies') {
          this.idList = params['name'];
          this._movies = this._moviesList.find(
            (movie) => movie.name === this.idList).movies;
        }
    });

    this.userSubscription = this.userService.userSubject.subscribe(
      (user) => {
        if (user) {
          this._user = user;
          this.isConnected = true;
        }
      }
    );
    this.userService.emmitUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
  }

  deleteList() {
    this.firebase.deleteList(this._user.uid, this.idList);
    this.firebase.emmitUserMoviesList();
    this.router.navigateByUrl('/');
  }

  get movies() {
    return this._movies;
  }

  get name(): string {
    return this.idList;
  }

}
