import { Component, OnInit, Inject } from '@angular/core';
import { UserService, ConexionData } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SigninChoiceComponent } from '../signin-choice/signin-choice.component';
import { LoginEmailComponent } from '../login-email/login-email.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog
  ) {
    this.emailForm = this.fb.group({
      via: [1],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
      password: ['', Validators.required, Validators.min(6)]
    });
  }
  ngOnInit() {}

  setEmail() {
    const dialogRef = this.dialog.open(LoginEmailComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog login with email was closed', result);
      if (result) {
        // this.userservices.loginVia(result);
        this.dialogRef.close(result);
      }
    });
  }

  save(via) {
    this.emailForm.patchValue({
      via: via
    });
    console.log(this.emailForm);
    if (this.emailForm.valid || via === 1 || via === 2) {
      this.dialogRef.close(this.emailForm.value);
    }
  }

  signup() {
    const dialogRef = this.dialog.open(SigninChoiceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog signup was closed', result);
      if (result) {
        // this.userservices.signinVia(result);
        this.dialogRef.close(result);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
