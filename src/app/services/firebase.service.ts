import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MovieResponse } from '../tmdb-data/Movie';
import { Subject } from 'rxjs';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { MovieResult } from '../tmdb-data/searchMovie';

export interface MovieList {
  name: string;
  movies: MovieResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private moviesLists: MovieList[] = [];
  movieSubject: Subject<MovieList[]> = new Subject();

  constructor(private firebase: AngularFireDatabase) { }

  emmitUserMoviesList() {
    this.movieSubject.next(this.moviesLists);
  }

  saveMoviesLists(userId: string) {
    this.moviesLists.forEach(e =>
      this.firebase.database.ref(`/users/${userId}/lists/${e.name}`).set(e.movies)
    );
  }

  getMoviesLists(userId: string) {
    this.saveMoviesLists(userId);
    this.firebase.database.ref(`/users/${userId}/lists/`)
      .on('value', (data: DataSnapshot) => {
        const newMoviesLists = [];
        data.forEach(e => {
          newMoviesLists.push({
            name: e.key,
            movies: e.val(),
          });
        });
        console.log('get movies list');
        if (newMoviesLists.length !== 0) { this.moviesLists = newMoviesLists; }
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

  deleteList(userId: string, idList: string) {
    this.firebase.database.ref(`/users/${userId}/lists/${idList}`)
      .remove();
    this.getMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  deleteMovie(userId: string, idList: string, idMovie: number) {
    this.firebase.database.ref(`/users/${userId}/lists/${idList}/${idMovie}`)
      .remove();
    this.getMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  addMovie(userId: string, idList: string, idMovie: number, movie: MovieResponse | MovieResult) {
    this.moviesLists.find(e => {
      return e.name === idList;
    }).movies.push(movie);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }

}
