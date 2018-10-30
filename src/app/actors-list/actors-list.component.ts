import { Component, OnInit } from '@angular/core';

import {TmdbService} from '../tmdb.service';
import {PersonlistResponse} from '../tmdb-data/PersonList';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {
  private _personlist: PersonlistResponse;
  public people = [];

  constructor(private tmdb: TmdbService) {
    for (let i = 1; i <= 10; i++) {
      tmdb.init('544a04ed01152432f1d7ed782ed24b73') // Clef de TMDB
        .getListPerson({'page': i})
        .then( (p: PersonlistResponse) => {
          this.people.push(...p.results);
        } )
        .catch( err => console.error('Error getting actor:', err) );
    }
  }
  ngOnInit() {}

  get PersonList(): PersonlistResponse {
    return this._personlist;
  }
}
