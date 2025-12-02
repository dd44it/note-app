import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable, of, tap, map } from 'rxjs';
import { ThemeToggleComponent } from '../../shared/theme/theme.component';
import { InspirationImage, InspirationService} from '../../core/services/inspiration/inspiration.service';
import { LikeService } from '../../core/services/like/like.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { ImageCardComponent } from '../../shared/ui/image-card/image-card.component';
import { ImageLightboxComponent } from '../../shared/ui/image-lightbox/image-lightbox.component';
import { NotesService, PublicNote } from '../../core/services/notes/notes.service';

// interface PublicNote {
//   id: number;
//   title: string;
//   content: string;
//   public?: boolean;
//   createdAt?: string;
// }

const HOME_NOTES_KEY = makeStateKey<PublicNote[]>('home-public-notes');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, AsyncPipe, ThemeToggleComponent, HeaderComponent, ImageCardComponent, ImageLightboxComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  private notesService = inject(NotesService);
  private inspirationService = inject(InspirationService);
  private likeService = inject(LikeService);

  images: InspirationImage[] = [];
  lightboxOpen = false;
  lightboxIndex = 0;

  notes$ = this.notesService.loadNotes();

  inspiration$ = this.inspirationService.loadRandomImages(8).pipe(
    tap(imgs => this.images = imgs)
  );

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
    inject(Title).setTitle('NoteApp SSR – Angular 20');
    inject(Meta).updateTag({
      name: 'description',
      content: 'SEO-friendly NoteApp built with Angular 20 SSR'
    });
  }

  openLightbox(i: number) {
    this.lightboxIndex = i;
    this.lightboxOpen = true;
  }

  toggleLike(id: string) {
    this.likeService.toggleLike(id);
  }
}
