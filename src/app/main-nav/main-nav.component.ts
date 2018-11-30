import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { User } from 'firebase';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieGenre } from '../tmdb-data/Movie';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  public searchText: string;
  private _genres: string[];
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
      .then(genres => console.log("GENRES : ", genres.genres.map(e => {
        this._genres.push(e.name);
      })));
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateListComponent, {
      width: '250px',
      data: { name: this.title }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.title = result;
      this.firebase.createNewList(this._user.uid, {
        name: this.title,
        movies: []
      });
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
  }
}

// Dialog component for adding list
@Component({
  selector: 'app-dialog-create-list',
  templateUrl: './dialog-create-list.html'
})
export class DialogCreateListComponent implements OnInit {
  titleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) { }

  ngOnInit(): void {
    this.titleForm = new FormGroup({
      text: new FormControl('Test', Validators.minLength(2))
    });
  }

  get text() {
    return this.titleForm.get('text');
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
