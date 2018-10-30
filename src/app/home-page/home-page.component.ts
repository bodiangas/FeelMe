import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, SearchTrendingQuery, MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Input() name: string;
  @Input() param?;

  private listName = null;
  private _moviesTab: MovieResult[][] = null;
  // private _movieSelected = false;
  private slideIndex = 1;

  constructor(tmdb: TmdbService) {
    tmdb.init('544a04ed01152432f1d7ed782ed24b73');
    setTimeout(() =>
      tmdb.getHomeMovies().then((d: SearchMovieResponse[]) => console.log('tab :', this._moviesTab = d.map(e => e.results))));
  }

  ngOnInit() {
    this.listName = name;
    console.log(this.listName);
    this.showDivs(this.slideIndex);
  }

  get movies() {
    return this._moviesTab;
  }

  plusDivs(n: number) {
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n: number) {
    let i;
    const x = document.getElementsByClassName('mySlides');
    if (n > x.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = x.length; }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
    x[this.slideIndex - 1].style.display = 'block';
  }
}
