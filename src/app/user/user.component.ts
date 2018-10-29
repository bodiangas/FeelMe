import { Component, OnInit, Inject, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { MatDialog} from '@angular/material';
import { SigninChoiceComponent } from './signin-choice/signin-choice.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserService, ConexionData } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private _user: User;
  public isConnected = false;
  isConnectedSubscribtion: Subscription;

  @Input()
  emailPasswords: ConexionData[];

  constructor(
    public anAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userservices: UserService) {  }

  ngOnInit() {
    this.isConnectedSubscribtion = this.userservices.connectedSubject.subscribe(
      (isconnected: boolean) => {
        console.log('here user init', isconnected);
        this.isConnected = isconnected;
      }
    );
    this.userservices.emmitIsConnected();
  }

  signin() {
    const dialogRef = this.dialog.open(SigninChoiceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result, this.isConnected);
      if (result) {
        this.userservices.signinVia(result).then(() => {
          console.log('Sign up succes', this.isConnected);
        }).catch(error => this.handleError(error));
      }
    });
  }

  login() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) { this.userservices.loginVia(result).then(() => {
        console.log('Log in succes', this.isConnected);
      }).catch(error => this.handleError(error));
    }
    });
  }

  logout() {
    this.userservices.signOut();
    this._user = undefined;
  }


  private handleError(error: Error) {
    console.error(error);
    console.log(error.message, 'error');
  }
}
