import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Note} from "../../interfaces/note";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  popupTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent, Note>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    ) {
    data === undefined ? this.popupTitle = 'Nueva nota' : this.popupTitle = 'Actualizar nota';
  }

  onUpdateNote(updatedNote: Note): void {
    this.dialogRef.close(updatedNote);
  }
}
