import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { FirebaseService, MovieList } from '../services/firebase.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  public searchText: string;
  private userLists: MovieList[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router, private search: SearchService,
    private firebase: FirebaseService) {
    this.firebase.movieSubject.subscribe(movies => {
      this.userLists = movies;
    });

  }

  navigation() {
    this.search.searchText = this.searchText;
    this.router.navigateByUrl('/search');
    this.search.emmitText();
  }

  get lists() {
    return this.userLists;
  }

}
