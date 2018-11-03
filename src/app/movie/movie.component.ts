import { Component, OnInit, Input, Inject } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';

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

  posterUrl: string;
  display = false;
  displayButton = 'Display details';
  private value;
  private connected = true;
  truncatedOverview;

  constructor(private tmdbservice: TmdbService, private firebase: FirebaseService, public dialog: MatDialog) {
    this.firebase.movieSubject.subscribe();
  }

  ngOnInit() {
    this.value = this.movie.vote_average ? this.movie.vote_average * 10 : 0;
    console.log(this.movie.id);
    this.posterUrl = this.tmdbservice.getPath(this.movie.poster_path);
    this.truncatedOverview = this.truncate(this.movie.overview, 130, '...');
  }

  changeButton() {
    this.display = !this.display;
    this.display === true ?
      this.displayButton = 'Hide details' :
      this.displayButton = 'Display details';
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

  addMovie() {
  }

  deleteMovie() {
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
