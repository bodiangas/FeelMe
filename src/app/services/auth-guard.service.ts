import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private firebase: FirebaseApp,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          alert('Vueillez vous connecter pour créer des listes');
          this.router.navigate(['']);
          resolve(false);
        }
      });
    });
  }
}
