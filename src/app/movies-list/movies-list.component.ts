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

  idList;
  currentList: MovieList;
  private _movies: MovieResponse[] = null;
  private _moviesList: MovieList[] = null;
  private _user: User;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  isConnected = false;
  loaded = false;
  value;

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
      this.currentList = this._moviesList.find(
        (movie) => movie.name === this.idList);
      if (this.currentList) {
        this.loaded = true;
        this._movies = this.currentList.movies;
        console.log('Get current MOVIES');
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

  changeStatus() {
    this.snackBar.open('Statut changé !', 'Fermer');
    this.firebase.changeStatus(this._user.uid, this.currentList.name, this.currentList.info);
  }

  showStatus(value: boolean) {
    return value === true ? 'Publique' : 'Privée';
  }

  renameList() {
    const dialogRef = this.dialog.open(DialogRenameListComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.currentList.name = result;
        this.firebase.renameList1(this._user.uid, this.idList, this.currentList);
        this.firebase.emmitUserMoviesList();
      }
    });
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

  changeName() {
    this.firebase.renameList(this._user.uid, this.idList, this.name);
    this.firebase.emmitUserMoviesList();
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
  name;
  constructor(
    public dialogRef: MatDialogRef<DialogRenameListComponent>,
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }
}
