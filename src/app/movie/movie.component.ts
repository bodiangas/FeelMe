import { Component, OnInit, Input, Inject } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { DialogAddMovieComponent, DataSent } from './dialog-add-movie/dialog-add-movie.component';
import { Router } from '@angular/router';
import { MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie: MovieResult;
  @Input() add: boolean;
  @Input() listName?: string;

  posterUrl: string;
  value;
  truncatedOverview;
  oldPath;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  private lists: MovieList[];
  isConnected = false;
  private _user: User;

  constructor(private tmdbservice: TmdbService, private firebase: FirebaseService,
    private userService: UserService, private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) { }

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

    this.oldPath = this.router.url;
    this.value = this.movie.vote_average ? this.movie.vote_average : 0;
    this.posterUrl = this.tmdbservice.getPath(this.movie.poster_path);
    this.truncatedOverview = this.truncate(this.movie.overview, 60, '...');
  }

  truncate(elem, limit, after) {
    if (!elem || !limit) { return; }
    return elem.trim().slice(0, limit) + (after ? after : '');
  }

  openDialogAddMovie() {
    const dialogRef = this.dialog.open(DialogAddMovieComponent, {
      data: {
        movieName: this.movie.title,
        listsNames: this.lists.map(e => e.name)
      }
    });

    dialogRef.afterClosed().subscribe((data: DataSent) => {
      if (data) {
        if (data.newListName) {
          this.createNewList(data.newListName);
        } else {
          if (data.list) {
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
    if (!this.firebase.movieExist(listName, this.movie)) {
      this.firebase.addMovie(this._user.uid, listName, this.movie);
      this.snackBar.open(`Le film a été ajouté avec succès !`, 'Fermer', {
        duration: 4000,
      });
    } else {
      this.snackBar.open(`Le film existe déja dans la liste !`, 'Fermer', {
        duration: 4000,
      });
    }
  }

  deleteMovie() {
    const val = this.lists.find(m => m.name === this.listName).movies.findIndex(m => m === this.movie);
    this.firebase.deleteMovie(this._user.uid, this.listName, val);
    this.router.navigateByUrl(this.oldPath);
  }

  get user() {
    return this._user;
  }

}
