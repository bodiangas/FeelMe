import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email: string;
  constructor(
    private dialogRef: MatDialogRef<string>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {
      this.email = data;
    }

  ngOnInit() {
  }

  valid() {
    console.log('Password reset');
    this.dialogRef.close(this.email);
  }

  close() {
    this.dialogRef.close();
  }

}
