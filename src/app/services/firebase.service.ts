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
  private moviesLists: MovieList[] = [
    {
      name: 'Liste 1',
      movies: [
        {
          budget: 3000000,
          adult: false,
          title: 'Jolie film'
        }, {
          budget: 4000000,
          adult: false,
          title: 'Mauvais film'
        }, {
          budget: 2000000,
          adult: false,
          title: 'J\'adore film'
        }, {
          budget: 10000000,
          adult: false,
          title: 'Deadpool'
        }
      ]
    }, {
      name: 'Liste 2',
      movies: [
        {
          budget: 3000000,
          adult: true,
          title: 'Jolie film 2 '
        }
      ]
    }, {
      name: 'Liste 3',
      movies: [
        {
          budget: 2000000,
          adult: true,
          title: 'Jolie film 3'
        }
      ]
    }
  ];
  private firebaseLists: AngularFireList<MovieList[]>;
  movieSubject: Subject<MovieList[]> = new Subject();

  constructor(private firebase: AngularFireDatabase) { }

  emmitUserMoviesList() {
    this.movieSubject.next(this.moviesLists);
    // console.log('emit movie lists', this.moviesLists);
  }

  saveMoviesLists(userId: string) {
    console.log('saving list data', userId);
    this.moviesLists.forEach(e => {
      this.firebase.database.ref(`/users/${userId}/lists/${e.name}`).set(e.movies);
    });
  }

  getMoviesLists(userId: string) {
    this.saveMoviesLists(userId);
    this.firebase.database.ref(`/users/${userId}/lists/`)
      .on('value', (data: DataSnapshot) => {
        const newMoviesLists = [];
        data.forEach(e => {
          console.log('test ', e, e.key, e.val());
          newMoviesLists.push({
            name: e.key,
            movies: e.val(),
          });
        });
          // this.moviesListList = data.val() ? data.val() : [];
          if (newMoviesLists.length !== 0) { this.moviesLists = newMoviesLists; }
          console.log('getting list film', data.val(), this.moviesLists);
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
    this.moviesLists.push(newList);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  removeList(userId: string, list: MovieList) {
    const listIndexToRemove = this.moviesLists.findIndex(
      (listEl) => {
        if (listEl === list) {
          return true;
        }
      }
    );
    this.moviesLists.splice(listIndexToRemove, 1);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  removeListBis(userId: string, idList: number) {
    this.firebase.database.ref(`/users/${userId}/lists/${idList}`)
      .remove();
  }
}
