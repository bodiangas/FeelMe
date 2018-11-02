import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResult } from '../tmdb-data/searchMovie';
import { FirebaseDatabase } from '@angular/fire';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})

export class MoviesListComponent implements OnInit {

  private listName = null;
  private idList;
  // public myLists: FirebaseListObservable<any[]>;
  private _movies: MovieResult[] = null;
  private _movieSelected = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.idList = +params['id'];
    });
    console.log('ID ' + this.idList);
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
