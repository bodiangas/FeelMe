import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MovieResponse } from '../tmdb-data/Movie';
import { Subject, Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';
import { DataSnapshot } from '@angular/fire/database/interfaces';

export interface MovieList {
  name: string;
  movies: MovieResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private moviesListList: MovieList[] = [];
  private firebaseLists: AngularFireList<MovieList[]>;
  movieSubject: Subject<MovieList[]> = new Subject();

  constructor(
    private firebase: AngularFireDatabase,
  ) {
  }

  emmitUserMoviesList() {
    this.movieSubject.next(this.moviesListList);
    console.log('emit movie lists', this.moviesListList);
  }

  saveMoviesLists(userId: string) {
    console.log('saving list data', userId);
    this.firebase.database.ref(`/users/${userId}/lists/`).set(this.moviesListList);
  }

  getMoviesLists(userId: string) {
    this.firebase.database.ref(`/users/${userId}/lists/`)
      .on('value', (data: DataSnapshot) => {
          this.moviesListList = data.val() ? data.val() : [];
          console.log('getting list film', data.val(), this.moviesListList);
          this.emmitUserMoviesList();
        }
      );
  }

  getOneList(userId: string, id: number) {
    return new Promise(
      (resolve, reject) => {
        this.firebase.database.ref(`/users/${userId}/movies/` + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewList(userId: string, newList: MovieList) {
    this.moviesListList.push(newList);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  removeList(userId: string, list: MovieList) {
    const listIndexToRemove = this.moviesListList.findIndex(
      (listEl) => {
        if (listEl === list) {
          return true;
        }
      }
    );
    this.moviesListList.splice(listIndexToRemove, 1);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }
}
