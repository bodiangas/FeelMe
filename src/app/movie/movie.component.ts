import { Component, OnInit, Input, Inject } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';

export interface DialogData {
  overview: string;
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
  private value;
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
    // this.firebase.emmitUserMoviesList();

    this.value = this.movie.vote_average ? this.movie.vote_average * 10 : 0;
    this.posterUrl = this.tmdbservice.getPath(this.movie.poster_path);
    this.truncatedOverview = this.truncate(this.movie.overview, 130, '...');
  }


  truncate(elem, limit, after) {
    if (!elem || !limit) { return; }
    return elem.trim().slice(0, limit) + (after ? after : '');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '300px',
      data: { title: this.movie.title, overview: this.movie.overview }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  addMovieDefault() {
    const l = this.lists.length - 1;
    const val = this.lists[l].name;
    const idm = this.lists[l].movies.length;
    this.firebase.addMovie(this._user.uid, val, idm, this.movie);
  }

  deleteMovie() {
    console.log('DELETE');
    const val = this.lists.find(m => m.name === this.listName).movies.findIndex(m => m === this.movie);
    this.firebase.deleteMovie(this._user.uid, this.listName, val);
  }

}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.html',
})
export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
