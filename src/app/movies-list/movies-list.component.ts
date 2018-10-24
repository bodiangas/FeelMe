import { Component, OnInit, Input } from '@angular/core';
import { MovieResponse } from '../tmdb-data/Movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: MovieResponse[]; name: string;
  @Input() param?;

  private listName = null;
  private _movies: MovieResponse[] = null;
  private _movieSelected = false;

  constructor() {
  }

  ngOnInit() {
    this.listName = name;
    console.log(this.listName);
  }

  /* get name(): string {
    return this.listName;
  } */

}
