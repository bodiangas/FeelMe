import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse, MovieResult } from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private _moviesTab: MovieResult[][] = null;
  private dom;

  constructor(private tmdb: TmdbService) {
    this.tmdb.init('544a04ed01152432f1d7ed782ed24b73');
    setTimeout(() =>
      this.tmdb.getHomeMovies().then((d: SearchMovieResponse[]) => console.log('tab :', this._moviesTab = d.map(e => e.results))));
    setTimeout(() => {
      this.dom = document.querySelectorAll('.lnr');
      this.slidingDM(this.dom);
    }, 3000);
  }

  ngOnInit() {
  }

  get movies() {
    return this._moviesTab;
  }

  slidingDM(arrows) {
    const slides = document.querySelectorAll('.testimonial-item');
    let carouselCount = 0;

    arrows[0].addEventListener('click', function (e) {
      e = e || window.event;
      e.preventDefault();
      carouselCount -= 100;
      slider();
    });
    arrows[1].addEventListener('click', sliderEvent);

    function sliderEvent(e) {
      e = e || window.event;
      e.preventDefault();
      carouselCount += 100;
      slider();
    }

    function slider() {
      switch (carouselCount) {
        case -100:
          carouselCount = 0;
          break;
        case 300:
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
