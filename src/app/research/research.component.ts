import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchMovieResponse } from '../tmdb-data/searchMovie';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
import { FirebaseService, MovieList } from '../services/firebase.service';
import { DialogAddMovieComponent, DataSent } from '../movie/dialog-add-movie/dialog-add-movie.component';
import { UserService } from '../services/user.service';
import { User } from 'firebase';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit, OnDestroy {

  movies: SearchMovieResponse;
  querySubscribtion: Subscription;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  private lists: MovieList[];
  isConnected = false;
  private _user: User;


  constructor(private firebase: FirebaseService, private search: SearchService, private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.querySubscribtion = this.search.searchMoviesSubject.subscribe(movies => {
      this.movies = movies;
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
    this.firebaseSubscription = this.firebase.movieSubject.subscribe(m =>
      this.lists = m);

  }

  ngOnDestroy() {
    this.querySubscribtion.unsubscribe();
  }

  addAll() {
    const dialogRef = this.dialog.open(DialogAddMovieComponent, {
      // width: '300px',
      data: {
        movieName: 'tout les films',
        listsNames: this.lists.map(e => e.name)
      }
    });

    dialogRef.afterClosed().subscribe((data: DataSent) => {
      if (data) {
        if (data.newListName) {
          this.createNewList(data.newListName);
        } else {
          if (data.list) {
            this.addMovies(data.list);
          }
        }
      }
    });
  }

  private createNewList(listName) {
    this.firebase.createNewList(this._user.uid, {
      name: listName,
      movies: this.movies.results,
      info: {
        date: new Date().toLocaleDateString('fr-FR', {timeZoneName: 'short'}),
        status: false
      }
    });
  }

  private addMovies(listName: string) {
    this.firebase.addMovies(this._user.uid, listName, this.movies.results);
  }

}
