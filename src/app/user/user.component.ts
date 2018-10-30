import { Component, OnInit, Inject, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter } from 'rxjs/operators';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
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

  @Input()
  emailPasswords: ConexionData[];

  constructor(
    public anAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userservices: UserService) {
    this.anAuth.user.pipe(filter(u => !!u)).subscribe(u => {
      this._user = u;
      /*const listsPath = `users/${u.uid}`;
      const lists = this.db.list(listsPath);
      lists.push("coucou");
      this.dbData = lists.valueChanges();*/
    });
  }

  ngOnInit() {
  }

  signin() {
    // tslint:disable-next-line:prefer-const
    let via;
    // tslint:disable-next-line:prefer-const
    let email: string;
    // tslint:disable-next-line:prefer-const
    let password: string;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      via,
      email,
      password
    };

    const dialogRef = this.dialog.open(SigninChoiceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.userservices.signinVia(result);
    });

  }

  login() {
    // tslint:disable-next-line:prefer-const
    let email: string;
    // tslint:disable-next-line:prefer-const
    let password: string;
    // tslint:disable-next-line:prefer-const
    let via;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      via,
      email,
      password
    };

    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.userservices.loginVia(result);
    });

  }

  logout() {
    this.userservices.signOut();
    this._user = undefined;
  }

}
