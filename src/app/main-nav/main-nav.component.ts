import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { User } from 'firebase';
import { MatDialog } from '@angular/material';
import { TmdbService } from '../tmdb.service';
import { MovieGenre } from '../tmdb-data/Movie';
import { SearchMovieQuery } from '../tmdb-data/searchMovie';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {

  minYear: FormControl = new FormControl(1895);
  searchField: FormControl = new FormControl('');

  public searchQuery: SearchMovieQuery = {
    // include_adult: false,
    query: '',
    language: 'fr',
    // page: 1,
    // primary_release_year: 2018,
    // region: '',
    // year: 2018,
  };

  genreControl = new FormControl();
  // filteredGenre: Observable<MovieGenre[]>;
  genres: MovieGenre[] = null;
  private userLists: MovieList[];
  public isConnected = false;
  private _user: User;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  title;
  advancedSearch = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private searchService: SearchService,
    private firebase: FirebaseService,
    private userService: UserService,
    public dialog: MatDialog,
    private tmdb: TmdbService
  ) {
    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').getGenres({language: 'fr'})
      .then(e => this.genres = e.genres);
    /*this.filteredGenre = this.genreControl.valueChanges
    .pipe(startWith(''), map(genre => genre ? this._filterGenres(genre) : this.genres.slice()))*/
  }

  ngOnInit() {
    this.searchField.valueChanges.subscribe(e => {
      this.search();
    });
    this.minYear.valueChanges.subscribe(e => {
      this.search();
    });
    this.genreControl.valueChanges.subscribe(e => {
      this.search();
    });
    this.userSubscription = this.userService.userSubject.subscribe(user => {
      if (user) {
        this._user = user;
        this.isConnected = true;
      }
    });

    this.firebaseSubscription = this.firebase.movieSubject.subscribe(movies => {
      this.userLists = movies;
    });
  }

  /*private _filterGenres(matchValue: string): MovieGenre[] {
    return this.genres.sort((a , b) => {
      return a.name.toLowerCase().indexOf(matchValue);
    });
  }*/

  search() {
    console.log('searched');
    if (this.searchField.value) {
      console.log('really searched', this.searchQuery);
      this.searchQuery.query = this.searchField.value;
      this.router.navigateByUrl('/search');
      /*this.moviesQuery = {
        include_adult: false,
        query: this.searchText,
        language: 'fr',
        page: 1,
        primary_release_year: 2018,
        region: '',
        year: 2018,
      };*/
      if (this.genreControl.value !== null) {
        this.searchService.search(this.searchQuery, this.genreControl.value.map(a => a.id), `${this.minYear.value}`);
      } else {
        this.searchService.search(this.searchQuery, [], `${this.minYear.value}`);
      }
    }
  }

  get lists() {
    return this.userLists;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
  }
}
