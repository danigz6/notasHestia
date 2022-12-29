import { Pipe, PipeTransform } from '@angular/core';
import {Note} from "../interfaces/note";

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(value: Note[], title: string, showDailyNotes: boolean): Note[] {
    const date = new Date();
    return value.filter((note) => {
      return note.title.includes(title) && (!showDailyNotes || date.toDateString() === note.date.toDateString());
    });
  }

}
