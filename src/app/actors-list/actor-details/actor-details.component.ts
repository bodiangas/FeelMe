import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../tmdb.service';
import { PersonResponse } from '../../tmdb-data/Person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})

export class ActorDetailsComponent implements OnInit {
  private _person: PersonResponse;
  public g: String;
  public bio: String;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
  }

  ngOnInit() {
    this.tmdb
      .getPerson(this.route.params['_value'].id)
      .then((a: PersonResponse) => console.log('id', this._person = a))
      .catch(err => console.error('Error getting actor:', err));
  }

  get Person(): PersonResponse {
    return this._person;
  }
  get Gender(): String {
    if (this._person.gender === 0) {
      this.g = 'Femme';
    } else {
      this.g = 'Homme';
    }
    return this.g;
  }

  get Poster(): String {
    return this._person.profile_path;
  }

  get name(): String {
    return this._person.name;
  }
  get Biograhie(): String {
    if (this._person.biography.length === 0) {
      this.bio = this._person.name + ' ';
    } else {
      this.bio = this._person.biography;
    }
    return this.bio;
  }
}
