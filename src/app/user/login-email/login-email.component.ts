import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {

  emailForm: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginEmailComponent>,
    private dialog: MatDialog,
    private userservices: UserService) {
    this.emailForm = this.fb.group({
      via: [3],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.emailForm.valid) {
      this.dialogRef.close(this.emailForm.value);
    }
  }

  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.emailForm.value.email;

    const dialogRef = this.dialog.open(ForgetPasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('forgot password dialog was closed');
      if (result) {
        this.userservices.resetPassword(result).then(() => {
          this.dialogRef.close();
        }).catch(error => {
          console.error(error);
          alert('Email inexistant');
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
