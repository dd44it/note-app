import { Component, inject } from '@angular/core';
// import { NotesService } from '../../shared/notes.service';
import {NotesService} from '../../core/services/notes/notes.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  imports: [RouterLink, AsyncPipe]
})
export class NoteListComponent {
  notes$ = inject(NotesService).loadNotes();
}
