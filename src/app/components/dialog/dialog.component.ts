import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Note} from "../show-diary-notes/show-diary-notes.component";
import {ShowDiaryNotesComponent} from "../show-diary-notes/show-diary-notes.component";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    ) {}

  onUpdateNote(updatedNote: Note) {
    this.dialogRef.close(updatedNote);
  }


}
