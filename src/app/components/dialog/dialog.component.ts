import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Note} from "../../interfaces/note";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent, Note>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    ) {}

  onUpdateNote(updatedNote: Note): void {
    this.dialogRef.close(updatedNote);
  }
}
