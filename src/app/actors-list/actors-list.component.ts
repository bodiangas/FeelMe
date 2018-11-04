import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { PersonlistResponse, PersonResult } from '../tmdb-data/SearchPeople';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {

  private _people: PersonResult[] = [];

  constructor(private tmdb: TmdbService) {
    for (let i = 1; i <= 3; i++) {
      tmdb.init('544a04ed01152432f1d7ed782ed24b73') // Clef de TMDB
        .getPopularPerson({ 'page': i })
        .then((p: PersonlistResponse) => {
          this._people.push(...p.results);
        })
        .catch(err => console.error('Error getting actor:', err));
    }
  }
  ngOnInit() { }

  get people() {
    return this._people;
  }

  getPath(path: string): string {
    return this.tmdb.getPath(path);
  }

}
