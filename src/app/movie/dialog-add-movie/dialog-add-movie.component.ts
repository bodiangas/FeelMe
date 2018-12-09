import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';


export interface DialogData {
  movieName: string;
  listsNames: string[];
}

export interface DataSent {
  list?: string;
  newListName?: string;
}

@Component({
  selector: 'app-dialog-add-movie',
  templateUrl: './dialog-add-movie.html',
})
export class DialogAddMovieComponent {
  datasent: DataSent = {};
  titleForm: FormGroup;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAddMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public snackBar: MatSnackBar) {
    this.titleForm = new FormGroup({
      listName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  getErrorMessage() {
    return this.titleForm.hasError('required') ? 'Un nom est requis' :
      this.titleForm.hasError('length') ? 'Nom trop court' :
        '';
  }
  popupListCreated(message: string, action: string) {
    this.snackBar.open(`Liste ${message} créee avec succès avec son contenu :D !`, action, {
      duration: 4000,
    });
    this.dialogRef.close(this.datasent);
  }

  close() {
    this.dialogRef.close();
  }

}
