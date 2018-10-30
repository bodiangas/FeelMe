import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService, ConexionData } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin-choice',
  templateUrl: './signin-choice.component.html',
  styleUrls: ['./signin-choice.component.css']
})
export class SigninChoiceComponent implements OnInit {
  emailForm: FormGroup;
  form: FormGroup;
  private isEmail = false;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SigninChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) { via, email, password }: ConexionData) {
    this.emailForm = this.fb.group({
      via: [1, via],
      email: [email, [Validators.required, Validators.email]],
      password: [password, Validators.required],
      confirmPassword: ['', [Validators.required, this.matchFieldValidator('password')]]
    });
  }

  matchFieldValidator(fieldToMatch: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } => {
      const confirmField = control.root.get(fieldToMatch);

      return (confirmField && control.value !== confirmField.value) ? { match: false } : null;
    };
  }

  ngOnInit() {
  }

  setEmail() {
    this.isEmail = true;
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

  close() {
    this.dialogRef.close();
  }
}
