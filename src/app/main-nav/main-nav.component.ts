import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { User } from 'firebase';
import { MatDialog } from '@angular/material';
import { TmdbService } from '../tmdb.service';
import { MovieGenre } from '../tmdb-data/Movie';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  public searchText: string;
  private _genres: MovieGenre[] = null;
  private userLists: MovieList[];
  public isConnected = false;
  private _user: User;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  title;
  advancedSearch: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private search: SearchService,
    private firebase: FirebaseService,
    private userService: UserService,
    public dialog: MatDialog,
    private tmdb: TmdbService
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(user => {
      if (user) {
        this._user = user;
        this.isConnected = true;
      }
    });

    this.firebaseSubscription = this.firebase.movieSubject.subscribe(movies => {
      this.userLists = movies;
    });

    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73').getGenres()
      .then(e => this._genres = e.genres);
  }

  navigation() {
    this.search.searchText = this.searchText;
    this.router.navigateByUrl('/search');
    this.search.emmitText();
  }

  get lists() {
    return this.userLists;
  }

  get genres() {
    return this._genres;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
  }
}
