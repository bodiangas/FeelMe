import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private firebase: FirebaseApp, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<boolean> {
    return new Promise(resolve => {
      this.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          alert('Veuillez vous connecter pour créer des listes');
          this.router.navigate(['']);
          resolve(false);
        }
      });
    });
  }
}
