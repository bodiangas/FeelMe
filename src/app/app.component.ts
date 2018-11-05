import { Component, OnInit } from '@angular/core';
import { TmdbService } from './tmdb.service';
import { MovieResponse } from './tmdb-data/Movie';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter } from 'rxjs/operators';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
