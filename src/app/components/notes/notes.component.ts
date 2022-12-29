import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogUpdateComponent} from "../dialog-update/dialog-update.component";
import {DialogAddComponent} from "../dialog-add/dialog-add.component";
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

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DialogAddComponent);

    dialogRef.afterClosed().subscribe( {
      next: value => {
        if (value === undefined) {
          return;
        }
        this.addNote(value);
      }
    });
  }

  openDialog(note: Note): void {
    const dialogRef: MatDialogRef<DialogUpdateComponent, Note> = this.dialog.open(DialogUpdateComponent, {
      data: note
    });
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value === undefined) {
          return;
        }
        const indexNote = this.notes.indexOf(note);
        this.notes[indexNote] = value;
        this.updateLocalStorage();
      }
    });
  }
}


