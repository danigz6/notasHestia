import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Note} from "../../interfaces/note";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  titleFilter: string = '';
  showDailyNotes: boolean = true;
  searchOption: boolean = true;


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const arr = JSON.parse(localStorage.getItem('notes') ?? '[]') as any[];
    this.notes = arr.map(({date, ...rest}) => {
      return {
        date: new Date(date), ...rest
      } as Note
    });
  }

  @HostListener('document:dblclick')
  onDocumentClick(): void {
    this.searchOption = true;
  }

  addNote(note: Note): void {
    if (note.date != null) {
      this.notes.push(note);
      this.updateLocalStorage();
    }
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notes = [...this.notes];
  }

  chooseCompareDates(compare: boolean): void {
    this.showDailyNotes = compare;
  }

  onTitleNote(title: string): void {
    this.titleFilter = title;
  }

  openDialog(note?: Note): void {
    const dialogRef: MatDialogRef<DialogComponent, Note> = this.dialog.open(DialogComponent, {
      data: note
    });
    dialogRef.afterClosed().subscribe({
      next: updatedNote => {
        //Case 0: return if form inputs are not validated
        if (updatedNote === undefined) {
          return;
        }
        //Case 1: creating new note
        if (note === undefined) {
          this.addNote(updatedNote);
          return;
        }
        //Normal case: editing current note
        const indexNote = this.notes.indexOf(note!);
        this.notes[indexNote] = updatedNote;
        this.updateLocalStorage();
      }
    });
  }
}


