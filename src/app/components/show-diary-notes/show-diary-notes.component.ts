import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {notEmptyValidator} from "../../validators/not-empty.validator";
import {NoteFormComponent} from "../note-form/note-form.component";


export interface Note {
  id: number;
  title: string;
  content: string | null;
}

@Component({
  selector: 'app-show-diary-notes',
  templateUrl: './show-diary-notes.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ShowDiaryNotesComponent implements OnInit{
  notes: Note[] = [];

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.notes = JSON.parse(localStorage.getItem('notes') ?? '[]') as Note[];
  }

  addNote(note: Note): void {
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));

    this.resetForm();
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  resetForm() {

  }

  openDialog(note: Note): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: note
    });
    dialogRef.afterClosed().subscribe({
      next: value => console.log(value)
    });
  }
}


