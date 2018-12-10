import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  emailForm: FormGroup;
  title = 'Se connecter';
  cancelMessage = 'Annuler';
  loginEmail = true;
  signUpEmail = false;
  attempted = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private userservices: UserService
  ) {
    this.emailForm = this.fb.group({
      via: [1],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [this.matchFieldValidator('password')]]
    });
  }

  matchFieldValidator(fieldToMatch: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } => {
      const confirmField = control.root.get(fieldToMatch);

      return (confirmField && this.signUpEmail && control.value !== confirmField.value) ? {match: false} : null;
    };
  }
  ngOnInit() {}

  save(via) {
    if (this.signUpEmail && via === 3) {
      via = 4;
    }
    this.emailForm.patchValue({
      via: via
    });
    console.log('Submitted', via);
    if (via === 1 || via === 2 || this.emailForm.valid) {
      this.userservices.auth(this.emailForm.value).then(
        () => {
          this.dialogRef.close();
        }
      ).catch(error => {
        console.error(error);
      });
      this.attempted = true;
    }
  }

  signup() {
    this.signUpEmail = true;
    this.loginEmail = false;
    this.cancelMessage = 'Se connecter';
    this.title = 'S\'inscrire';
  }

  close() {
    if (this.signUpEmail) {
      this.loginEmail = true;
      this.signUpEmail = false;
      this.title = 'Se connecter';
      this.cancelMessage = 'Annuler';
    } else {
      this.dialogRef.close();
    }
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent);
    dialogRef.afterOpen().subscribe(result => {
      if (result) {
        this.userservices.resetPassword(this.emailForm.value.email).catch(error => {
          console.error(error);
          alert('Email inexistant');
        });
        this.dialogRef.close();
      }
    });
  }
}
