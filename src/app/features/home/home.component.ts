import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ThemeToggleComponent } from '../../shared/theme/theme.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { NotesService, PublicNote } from '../../core/services/notes/notes.service';
import { GalleryComponent } from '../../shared/gallery/gallery/gallery';

// const HOME_NOTES_KEY = makeStateKey<PublicNote[]>('home-public-notes');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ThemeToggleComponent, HeaderComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private notesService = inject(NotesService);

  notes$ = this.notesService.loadNotes();

  notesStats$ = this.notes$.pipe(
    map(notes => ({
      total: notes.length,
      latest: notes[0] ?? null
    }))
  );

  get year() {
    return new Date().getFullYear();
  }

  constructor() {
    //TODO set dynamic title, meta (seo)
  }

}
