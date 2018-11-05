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
  private moviesLists: MovieList[] = [
    {
      name: 'Liste 122227666666666666622222',
      movies: [
        {
          poster_path: '/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
          adult: false,
          overview: 'Framed in the 1940s for the doubleor his integrity and unquenchable sense of hope.',
          release_date: '1994-09-10',
          id: 278,
          original_title: 'The Shawshank Redemption',
          original_language: 'en',
          title: 'The Shawshank Redemption',
          backdrop_path: '/xBKGJQsAIeweesB79KC89FpBrVr.jpg',
          popularity: 6.741296,
          vote_count: 5238,
          video: false,
          vote_average: 8.32
        },
        {
          poster_path: '/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg',
          adult: false,
          overview: 'Under the direction of egins to pursue perfection at any cost, even his humanity.',
          release_date: '2014-10-10',
          id: 244786,
          original_title: 'Whiplash',
          original_language: 'en',
          title: 'Whiplash',
          backdrop_path: '/6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg',
          popularity: 10.776056,
          vote_count: 2059,
          video: false,
          vote_average: 8.29
        },
        {
          poster_path: '/d4KNaTrltq6bpkFS01pYtyXa09m.jpg',
          adult: false,
          overview: 'The story spans the years from 1945 to 1955 and chronicles the fictional Italian-Amedy revenge.',
          release_date: '1972-03-15',
          id: 238,
          original_title: 'The Godfather',
          original_language: 'en',
          title: 'The Godfather',
          backdrop_path: '/6xKCYgH16UuwEGAyroLU6p8HLIn.jpg',
          popularity: 4.554654,
          vote_count: 3570,
          video: false,
          vote_average: 8.26
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
        console.log('get movies list', newMoviesLists);
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
