import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {notEmptyValidator} from "../../validators/not-empty.validator";
import {Note} from "../../interfaces/note";
import {dateValidator} from "../../validators/date.validator";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit{
  @Input() note?: Note;
  formGroup = new FormGroup({
    titleControl: new FormControl('',[notEmptyValidator()]),
    contentControl: new FormControl<string | null>(null),
    dateControl: new FormControl<Date>(this.note?.date ?? new Date(), [dateValidator()])
  });
  @Output() onSave: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() {}

  ngOnInit(): void {
    if (this.note === undefined) {
      return;
    }
    this.formGroup.controls.titleControl.setValue(this.note.title);
    this.formGroup.controls.contentControl.setValue(this.note.content);
  }

  private getNextId(): number {
    const notes = JSON.parse(localStorage.getItem('notes') ?? '[]') as Note[];
    return Math.max(
      0, ...notes.map(({id}) => id)
    ) + 1;
  }

  onSaveClick(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const note: Note = {
      id: this.note?.id ?? this.getNextId(),
      title: this.formGroup.controls.titleControl.value!,
      content: this.formGroup.controls.contentControl.value,
      date: this.formGroup.controls.dateControl.value!
    }
    this.onSave.emit(note);
  }
}
