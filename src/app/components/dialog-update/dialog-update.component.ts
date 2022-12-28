import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Note} from "../../interfaces/note";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss']
})
export class DialogUpdateComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateComponent, Note>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    ) {}

  onUpdateNote(updatedNote: Note) {
    this.dialogRef.close(updatedNote);
  }
}
