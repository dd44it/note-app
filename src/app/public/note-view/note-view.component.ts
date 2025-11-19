import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../shared/notes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  imports: [CommonModule]
})
export class NoteViewComponent {
  private notesService = inject(NotesService);
  private route = inject(ActivatedRoute);
  note$ = inject(ActivatedRoute).params.pipe(
    switchMap(params => inject(NotesService).getNoteById(+params['id']))
  );
}
