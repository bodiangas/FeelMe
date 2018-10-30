import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResult } from '../tmdb-data/searchMovie';
import { FirebaseDatabase } from '@angular/fire';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() name: string;
  @Input() param?;

  private listName = null;
  // public myLists: FirebaseListObservable<any[]>;
  private _movies: MovieResult[] = null;
  private _movieSelected = false;

  constructor(tmdb: TmdbService, db: FirebaseDatabase) {
  }

  ngOnInit() {
    this.listName = name;
    console.log(this.listName);
  }
  get movies() {
    return this._movies;
  }
  geName(): string {
    return this.listName;
  }

}
