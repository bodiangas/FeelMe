import { Component, OnInit, Inject } from "@angular/core";
import { UserService, ConexionData } from "src/app/services/user.service";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SigninChoiceComponent } from "../signin-choice/signin-choice.component";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.css"]
})
export class LoginDialogComponent implements OnInit {

  emailForm: FormGroup;
  isEmail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog:MatDialog,
    private userservices:UserService,
    @Inject(MAT_DIALOG_DATA) { via, email, password }: ConexionData
  ) {
    this.emailForm = this.fb.group({
      via: [1, via],
      email: [email, [Validators.required, Validators.email]],
      password: [password, Validators.required]
    });
  }
  ngOnInit() {}

  setEmail() {
    this.isEmail = true;
  }

  save(via) {
    this.emailForm.patchValue({
      via: via
    });
    console.log(this.emailForm);
    if (this.emailForm.valid || via == 1 || via == 2) {
      this.dialogRef.close(this.emailForm.value);
    }
  }

  signup(){
    let via;
    let email:string;
    let password:string;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data= {
      via,
      email,
      password
    };
    
    const dialogRef=this.dialog.open(SigninChoiceComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.userservices.signinVia(result);
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
