import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {notEmptyValidator} from "../../validators/not-empty.validator";
import {Note} from "../show-diary-notes/show-diary-notes.component";

@Component({
  selector: 'app-add-note',
  templateUrl: './note-form.component.html',
  styleUrls: ['../../app.component.scss']
})
export class NoteFormComponent implements OnInit{
  @Input() note?: Note;
  notes: Note[] = [];
  msgError: string = 'Introduzca un título';
  formGroup = new FormGroup({
    titleControl: new FormControl('',[notEmptyValidator()]),
    contentControl: new FormControl<string | null>(null)
  });
  @Output() onSave: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() {

  }

  ngOnInit(): void {
    if (this.note === undefined) {
      return;
    }
    this.formGroup.controls.titleControl.setValue(this.note.title);
    this.formGroup.controls.contentControl.setValue(this.note.content);
  }

  private getNextId(): number {
    return Math.max(
      0, ...this.notes.map(({id}) => id)
    ) + 1;
  }

  onSaveClick() {
    if (this.formGroup.invalid) {
      return;
    }

    const note: Note = {
      id: this.note?.id ?? this.getNextId(),
      title: this.formGroup.controls.titleControl.value!,
      content: this.formGroup.controls.contentControl.value
    }
    this.onSave.emit(note);
  }

  /*addNote(title: string, content: string): void {
    if (this.titleControl.invalid) {
      return;
    }

    const note = {
      id: this.getNextId(),
      title: title,
      body: content
    }

    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }*/
}
