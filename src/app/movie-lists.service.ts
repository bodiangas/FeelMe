import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Reference } from '@angular/compiler/src/render3/r3_ast';

export interface List {
  name: string;
  id: number;
  owner: string;
  moviesId: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  myLists: AngularFireList<List[]>;
  fireBaseRef;

  constructor(private firebasedb: AngularFireDatabase) {
    this.fireBaseRef = firebasedb.database.ref();
  }

  getMyList() {
    this.myLists = this.firebasedb.list('lists');
    return this.myLists;
  }

  addMovie(movieId: number, id: number) {
    this.myLists[id].push({
      moviesId: movieId
    });
  }

  deleteMovie(movieId: number, id: number) {
    this.myLists.remove();
  }

  renameList($key: string, id: number) {
    // this.myLists.update($key,);
  }


}
