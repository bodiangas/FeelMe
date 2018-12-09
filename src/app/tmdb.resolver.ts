import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { TmdbService } from './tmdb.service';

@Injectable()
export class TmdbResolver implements Resolve<any> {
  constructor(private tmdbService: TmdbService) {}

  resolve() {
    return this.tmdbService.init('544a04ed01152432f1d7ed782ed24b73').getHomeMovies();
  }
}
