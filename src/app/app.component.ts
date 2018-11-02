import { Component, OnInit } from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable, Subscription} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {filter} from 'rxjs/operators';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private _movie: MovieResponse;
  private _user: User;
  private dbData: Observable<any>;

  private moviesListSubscription: Subscription = new Subscription();

  constructor(private tmdb: TmdbService, public anAuth: AngularFireAuth, private db: AngularFireDatabase
    , private fbService: FirebaseService) {
    // setTimeout( () =>
    //   tmdb.init('544a04ed01152432f1d7ed782ed24b73') // Clef de TMDB
    //       .getMovie(13)
    //       .then( (m: MovieResponse) => console.log('Movie 13:', this._movie = m) )
    //       .catch( err => console.error('Error getting movie:', err) ),
    //   1000 );

  }

  ngOnInit() {
    this.moviesListSubscription = this.fbService.movieSubject.subscribe(
      movies => console.log( 'movies changed', movies)
    );
    this.fbService.emmitUserMoviesList();
  }

  get movie(): MovieResponse {
    return this._movie;
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  // login() {
  //   this.anAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }

  // logout() {
  //   this.anAuth.auth.signOut();
  //   this._user = undefined;
  // }

  // get user(): User {
  //   return this._user;
  // }

  // get lists(): Observable<any> {
  //   return this.dbData;
  // }
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
