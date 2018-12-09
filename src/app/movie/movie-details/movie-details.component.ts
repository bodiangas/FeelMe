import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../tmdb.service';
import { MovieResponse } from '../../tmdb-data/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DialogAddMovieComponent, DataSent } from '../dialog-add-movie/dialog-add-movie.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  private id;
  private oldUrl;
  private _movieDetails: MovieResponse;
  private userSubscription = new Subscription();
  private firebaseSubscription = new Subscription();
  private _user: User;
  isConnected;
  lists;

  constructor(private tmdbService: TmdbService, private firebase: FirebaseService, private userService: UserService,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.oldUrl = params['oldPath']);
    });
  }

  ngOnInit() {
    setTimeout(() =>
      this.tmdbService.getMovie(this.id)
        .then((m: MovieResponse) => this._movieDetails = m));
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
  }

  get movieDetails(): MovieResponse {
    return this._movieDetails;
  }

  addMovie() {
    const dialogRef = this.dialog.open(DialogAddMovieComponent, {
      data: {
        movieName: this._movieDetails.title,
        listsNames: this.lists.map(e => e.name)
      }
    });

    dialogRef.afterClosed().subscribe((data: DataSent) => {
      if (data) {
        console.log('dialog closed with', data);
        if (data.newListName) {
          this.createNewList(data.newListName);
        } else {
          if (data.list) {
            this.add(data.list);
          }
        }
      }
    });
  }

  private createNewList(listName) {
    this.firebase.createNewList(this._user.uid, {
      name: listName,
      movies: [this._movieDetails]
    });
  }

  private add(listName: string) {
    if (!this.firebase.movieExist(listName, this._movieDetails)) {
      this.firebase.addMovie(this._user.uid, listName, this._movieDetails);
      this.snackBar.open(`Le film a été ajouté avec succès !`, 'Fermer', {
        duration: 4000,
      });
    } else {
      this.snackBar.open(`Le film existe déja dans la liste !`, 'Fermer', {
        duration: 4000,
      });
    }
  }

  goBack() {
    this.router.navigate([this.oldUrl]);
  }

  getPath(path: string): string {
    return this.tmdbService.getPath(path);
  }
}
