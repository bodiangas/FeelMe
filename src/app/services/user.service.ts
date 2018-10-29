import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { TmdbService } from '../tmdb.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { reject } from 'q';

export interface ConexionData {
  via;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _user: User;
  connected = false;
  connectedSubject: Subject<boolean> = new Subject<boolean>();
  private dbData: Observable<any>;

  constructor(
    private anAuth: AngularFireAuth,
    private tmdb: TmdbService,
    private db: AngularFireDatabase
  ) {
    this.anAuth.user.pipe(filter(u => !!u)).subscribe(u => {
      this._user = u;
      this.connected = true;
      console.log('here connection');
      this.emmitIsConnected();
      const listsPath = `users/${u.uid}`;
      const lists = this.db.list(listsPath);
      lists.push('coucou');
      this.dbData = lists.valueChanges();
    });
  }

  emmitIsConnected() {
    this.connectedSubject.next(this.connected);
  }

  signinVia(data: ConexionData) {
    if (data.via === 1) {
      return this.googleLogin();
    }
    if (data.via === 2) {
      return this.facebookLogin();
    }
    if (data.via === 3) {
      return this.emailSignUp(data.email, data.password);
    }
  }

  loginVia(data: ConexionData) {
    if (data.via === 1) {
      return this.googleLogin();
    }
    if (data.via === 2) {
      return this.facebookLogin();
    }
    if (data.via === 3) {
      return this.emailLogin(data.email, data.password);
    }
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return new Promise<User>((resolve) => {
      this.anAuth.auth
        .signInWithPopup(provider)
        .then(credential => {
          console.log('Welcome to Firestarter!!!', 'success');
          this._user = credential.user;
          resolve(this._user);
          this.connected = true;
        })
        .catch(error => this.handleError(error));
        this.emmitIsConnected();
    });
  }

  //// Email/Password Auth ////

  async emailSignUp(email: string, password: string) {
    return new Promise<User>((resolve) => {
      this.anAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
          console.log('Welcome new user!', 'success');
          this._user = credential.user; // if using firestore
          resolve(this._user);
          this.connected = true;
          this.emmitIsConnected();
        })
        .catch(error => reject(error));
    });
  }

  async emailLogin(email: string, password: string) {
    return new Promise<User>((resolve) => {
      this.anAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        console.log('Welcome back!', 'success');
        this._user = credential.user;
        resolve(this._user);
        this.connected = true;
        this.emmitIsConnected();
      })
      .catch(error => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  // Sends email allowing user to reset password
  async resetPassword(email: string) {
    const fbAuth = auth();
    return fbAuth
        .sendPasswordResetEmail(email)
        .then(() => console.log('Password update email sent', 'info'))
        .catch(error => this.handleError(error));
  }

  public signOut() {
    this.anAuth.auth.signOut().then(() => {
      console.log('deconnected');
      // this.router.navigate(['/']);
      this._user = undefined;
      this.connected = false;
      this.emmitIsConnected();
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    console.log(error.message, 'error');
  }
}
