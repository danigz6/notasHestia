import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Note} from "../../interfaces/note";

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddComponent>) {}

  onAddNote(note:Note): void {
    this.dialogRef.close(note);
  }
}
