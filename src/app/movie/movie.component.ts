import { Component, OnInit, Input, Inject } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { MatDialog} from '@angular/material';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { DialogAddMovieComponent, DialogData, DataSent } from './dialog-add-movie/dialog-add-movie.component';

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
      // width: '300px',
      data: {
        movieName: this.movie.title,
        listsNames: this.lists.map(e => e.name)
      }
    });

    console.log('LISTES : ' , this.lists);
    dialogRef.afterClosed().subscribe( (data: DataSent) => {
      if (data) {
        console.log('dialog closed with', data);
        if (data.newListName) {
          this.createNewList(data.newListName);
        } else {
          if (data.list ) {
            this.addMovie(data.list);
          }
        }
      }
    });
  }

  private createNewList(listName) {
    this.firebase.createNewList(this._user.uid, {
      name: listName,
      movies: [this.movie]
    });
  }

  private addMovie(listName: string) {
    this.firebase.addMovie(this._user.uid, listName, this.movie);
  }

  deleteMovie() {
    const val = this.lists.find(m => m.name === this.listName).movies.findIndex(m => m === this.movie);
    this.firebase.deleteMovie(this._user.uid, this.listName, val);
  }

  get user() {
    return this._user;
  }

}
