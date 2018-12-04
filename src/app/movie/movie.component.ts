import { Component, OnInit, Input, Inject } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogAddMovieComponent } from './dialog-add-movie/dialog-add-movie.component';

export interface DialogData {
  lists: string[];
  title: string;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie: MovieResponse;
  @Input() add: boolean;
  @Input() listName?: string;

  posterUrl: string;
  value;
  truncatedOverview;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  private lists: MovieList[];
  isConnected = false;
  private _user: User;

  constructor(private tmdbservice: TmdbService, private firebase: FirebaseService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (user) => {
        if (user) {
          this._user = user;
          this.isConnected = true;
        }
      }
    );
    this.userService.emmitUser();
    this.firebaseSubscription = this.firebase.movieSubject.subscribe(m =>
      this.lists = m);
    this.firebase.emmitUserMoviesList();

    this.value = this.movie.vote_average ? this.movie.vote_average * 10 : 0;
    this.posterUrl = this.tmdbservice.getPath(this.movie.poster_path);
    this.truncatedOverview = this.truncate(this.movie.overview, 130, '...');
  }

  truncate(elem, limit, after) {
    if (!elem || !limit) { return; }
    return elem.trim().slice(0, limit) + (after ? after : '');
  }

  openDialogAddMovie() {
    const dialogRef = this.dialog.open(DialogAddMovieComponent, {
      width: '300px',
      data: { title: this.movie.title, lists: this.lists }
    });

    console.log("LISTES : " , this.lists)
    dialogRef.afterClosed().subscribe(() => {
      result =>
        this.addMovie(result);
    });
  }

  addMovie(list: string) {
    this.firebase.addMovie(this._user.uid, list, this.movie);
  }

  deleteMovie() {
    const val = this.lists.find(m => m.name === this.listName).movies.findIndex(m => m === this.movie);
    this.firebase.deleteMovie(this._user.uid, this.listName, val);
  }

  get user() {
    return this._user;
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
      listName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  getErrorMessage() {
    return this.titleForm.hasError('required') ? 'Un nom est requis' :
      this.titleForm.hasError('length') ? 'Nom trop court' :
        '';
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
