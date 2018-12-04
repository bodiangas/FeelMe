import { Component, OnInit, Inject } from "@angular/core";
import { User } from "firebase";
import { FirebaseService } from "src/app/services/firebase.service";
import { UserService } from "src/app/services/user.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData, DialogCreateListComponent } from "../movie.component";

@Component({
    selector: 'app-dialog-add-movie',
    templateUrl: './dialog-add-movie.html',
  })
  export class DialogAddMovieComponent implements OnInit {
    selectedValue: string;
    listName: string;
    private _user: User;
  
    constructor(
      private firebase: FirebaseService,
      private userService: UserService,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<DialogAddMovieComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  
    ngOnInit() {
      this.userService.userSubject.subscribe(
        (user) => {
          if (user)
            this._user = user;
        }
      )
    }
  
    openDialogCreateList() {
      const dialogRef = this.dialog.open(DialogCreateListComponent, {
        width: '250px',
        data: { name: this.listName }
      });
  
      dialogRef.afterClosed().subscribe((result: string) => {
        this.listName = result;
        this.firebase.createNewList(this._user.uid, {
          name: this.listName,
          movies: []
        });
      });
    }
  
    onNoClick() {
      this.dialogRef.close();
    }
  }