import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SigninChoiceComponent } from './signin-choice/signin-choice.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserService, ConexionData } from '../services/user.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private _user: User;
  public isConnected = false;
  private userSubscription: Subscription = new Subscription();

  constructor(
    public anAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userService: UserService,
    private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (user) => {
        if (user) {
          this._user = user;
          this.isConnected = true;
        }
      }
    );
    this.userService.emmitUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  signin() {
    const dialogRef = this.dialog.open(SigninChoiceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result, this.isConnected);
      if (result) {
        this.userService.signinVia(result).then(() => {
          console.log('Sign up succes', this.isConnected);
        }).catch(error => this.handleError(error));
      }
    });
  }

  login() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.userService.loginVia(result).then(() => {
          console.log('Log in succes', this.isConnected);
        }).catch(error => this.handleError(error));
      }
    });
  }

  logout() {
    this.userService.signOut();
    this._user = undefined;
    this.isConnected = false;
  }


  private handleError(error: Error) {
    console.error(error);
    console.log(error.message, 'error');
  }
}
