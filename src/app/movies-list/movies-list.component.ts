import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieResult } from '../tmdb-data/searchMovie';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from 'firebase';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

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
  loaded = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private firebase: FirebaseService, private userService: UserService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firebaseSubscription = this.firebase.movieSubject.subscribe(m => {
      this._moviesList = m;
    });
    this.firebase.emmitUserMoviesList();
    this.route.params.subscribe(params => {
      this.idList = params['name'];
      const list = this._moviesList.find(
        (movie) => movie.name === this.idList);
      if (list) {
        this.loaded = true;
        this._movies = list.movies;
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


  showStatus(value: boolean) {
    return value === true ? 'Publique' : 'Privée';
  }

  renameList() {
    const dialogRef = this.dialog.open(DialogRenameListComponent, {
      // width: '300px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.firebase.renameList(this._user.uid, this.idList, result);
      }
    });
    this.firebase.emmitUserMoviesList();
    this.router.navigateByUrl('/lists');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
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

  get lists() {
    return this._moviesList;
  }
}


// Dialog component for renaming list
@Component({
  selector: 'app-dialog-rename-list',
  templateUrl: './dialog-rename-list.html'
})
export class DialogRenameListComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogRenameListComponent>,
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
