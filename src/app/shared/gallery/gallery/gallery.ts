import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {InspirationImage, InspirationService} from '../../../core/services/inspiration/inspiration.service';
import {tap} from 'rxjs';
import { ImageCardComponent } from '../../ui/image-card/image-card.component';
import { ImageLightboxComponent } from '../../ui/image-lightbox/image-lightbox.component';
// import { LikeService } from '../../core/services/like/like.service';

@Component({
  standalone: true,
  selector: 'app-gallery',
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    ImageCardComponent,
    ImageLightboxComponent
  ],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryComponent {
  protected readonly inspirationService = inject(InspirationService);
  // private likeService = inject(LikeService);
  images: InspirationImage[] = [];
  lightboxOpen = signal(false);
  lightboxIndex = signal(0);
  inspiration$ = this.inspirationService.loadRandomImages(8).pipe(
    tap(imgs => this.images = imgs)
  );

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }
  // toggleLike(id: string) {
  //   this.likeService.toggleLike(id);
  // }
}
