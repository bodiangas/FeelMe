import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

    constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<DialogAddMovieComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(data);
      }

    popupListCreated() {
      console.log('create new list', this.datasent.newListName);
      this.dialogRef.close(this.datasent);
    }

    close() {
      this.dialogRef.close();
    }

    /*createNewList() {
      this.data.lists.push({
        movies: [this.data.movie],
        name: this.newListName
      });
      this.dialogRef.close();
    }*/

    /*openDialogCreateList() {


      const dialogRef = this.dialog.open(DialogCreateListComponent, {
        width: '250px',
        data: { name: this.listName }
      });

      dialogRef.afterClosed().subscribe((result: string) => {
        this.selectedValue = result;
        this.firebase.createNewList(this._user.uid, {
          name: this.listName,
          movies: []
        });
      });
    }*/
  }

  // Dialog component for adding list
/*@Component({
  selector: 'app-dialog-create-list',
  templateUrl: './dialog-create-list.html'
})
export class DialogCreateListComponent implements OnInit {
  titleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) { }

  ngOnInit(): void {
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

  onNoClick() {
    this.dialogRef.close();
  }
}*/
