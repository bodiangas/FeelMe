import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MovieResponse } from '../tmdb-data/Movie';
import { Subject } from 'rxjs';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { MovieResult } from '../tmdb-data/searchMovie';

export interface MovieList {
  name: string;
  // userName: string;
  // date: Date;
  // status: boolean;
  movies: MovieResponse[];
  info?: Infos;
}

export interface Infos {
  date?: string;
  status?: boolean;
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
    console.log('save list');
    this.moviesLists.forEach(e => {
      this.firebase.database.ref(`/users/${userId}/lists/${e.name}`).set(e.movies);
      if (e.info) { this.firebase.database.ref(`/users/${userId}/info/${e.name}`).set(e.info); }
    }
    );
  }

  getMoviesLists(userId: string) {
    this.firebase.database.ref(`/users/${userId}/lists/`)
      .on('value', (data: DataSnapshot) => {
        this.moviesLists = [];
        const newMoviesLists: MovieList[] = [];
        data.forEach(e => {
          newMoviesLists.push({
            name: e.key,
            movies: e.val(),
          });
        });
        newMoviesLists.forEach(list => {
          const realmovies: MovieResponse[] = [];
          Array.prototype.forEach.call(list.movies, movie => {
            realmovies.push(movie);
          });
          this.moviesLists.push({
            name: list.name,
            movies: realmovies
          }
          );
        });
        // this.emmitUserMoviesList();
      }
      );

      // dates
      this.firebase.database.ref(`/users/${userId}/info/`)
      .on('value', (data: DataSnapshot) => {
        data.forEach(e => {
          this.moviesLists.find( m => m.name === e.key).info  = e.val();
        });
        console.log('get movies list');
        this.emmitUserMoviesList();
      }
      );
  }

  update(list :any, $key){
    this.firebase.object('listes/'+ $key).update(list)
  }

  getOneList(userId: string, id: number) {
    return new Promise(
      (resolve, reject) => {
        this.firebase.database.ref(`/users/${userId}/lists/` + id).once('value').then(
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
    this.firebase.database.ref(`/users/${userId}/info/${idList}`)
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

  addMovie(userId: string, idList: string, result: MovieResponse | MovieResult) {
    this.moviesLists.find(e => {
      return e.name === idList;
    }).movies.push(result);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  addMovies(userId: string, idList: string, result: MovieResponse[] | MovieResult[]) {
    this.moviesLists.find(e => {
      return e.name === idList;
    }).movies.concat(result);
    this.saveMoviesLists(userId);
    this.emmitUserMoviesList();
  }
  
  renameList(userId : string, idList : string, name : string){
    this.firebase.database.ref(`/users/${userId}/lists/${idList}/${name}`).update({name:name})
  }

  renameList(userId: string, idList: string, list: MovieList) {
    this.deleteList(userId, idList);
    this.createNewList(userId, list);
    this.getMoviesLists(userId);
    this.emmitUserMoviesList();
  }

  changeStatus(userId: string, idList: string, infos: Infos) {
    this.moviesLists.find(e => e.name === idList).info = infos;
    this.firebase.database.ref(`/users/${userId}/info/${idList}`).set(infos);
  }

  movieExist(idList: string, result: MovieResponse | MovieResult): boolean {
    if (this.moviesLists.find(e => {
      return e.name === idList;
    }).movies.find(m => {
      if (m = result) {
        return true;
      }
    })) {
      return true;
    }
    return false;
  }
}
