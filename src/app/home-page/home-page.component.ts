import { Component } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  private _moviesTab: MovieResult[][] = null;

  constructor(private tmdb: TmdbService) {
    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73');
    setTimeout(() =>
      this.tmdb.getHomeMovies().then((d: SearchMovieResponse[]) => this._moviesTab = d.map(e => e.results)));
    setTimeout(() => {
      this.slidingDM(document.querySelectorAll('.lnr'));
    }, 3000);
  }

  get movies() {
    return this._moviesTab;
  }

  slidingDM(arrows) {
    let slides;
    let bouger;
    let carouselCount = 0;

    arrows[0].addEventListener('click', sliderEvent);
    arrows[1].addEventListener('click', sliderEvent);
    arrows[2].addEventListener('click', sliderEvent);

    function sliderEvent(e: Event) {
      bouger = e.srcElement.getAttribute('id');
      slides = document.querySelectorAll(`.testimonial-item#${bouger}`);
      e = e || window.event;
      e.preventDefault();
      carouselCount += 100;
      slider();
    }

    function slider() {
      switch (carouselCount) {
        case 1900:
          carouselCount = 0;
          break;
        default:
          break;
      }
      console.log(carouselCount);
      for (let i = 0; i < slides.length; i += 1) {
        slides[i].setAttribute('style', 'transform:translateX(-' + carouselCount + '%)');
      }
    }
  }
}
