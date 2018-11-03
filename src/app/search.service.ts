import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTextSubject: Subject<string> = new Subject<string>();
  searchText: string;
  constructor() { }

  emmitText() {
    this.searchTextSubject.next(this.searchText);
  }

}
