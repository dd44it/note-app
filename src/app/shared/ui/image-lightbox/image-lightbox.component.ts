import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { InspirationImage } from '../../../core/services/inspiration/inspiration.service';

@Component({
  selector: 'ui-image-lightbox',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})
export class ImageLightboxComponent {
  @Input() images: InspirationImage[] = [];
  @Input() index = 0;
  @Output() close = new EventEmitter<void>();

  get current(): InspirationImage {
    return this.images[this.index];
  }

  next() {
    if (this.index < this.images.length - 1) this.index++;
  }

  prev() {
    if (this.index > 0) this.index--;
  }

  closeLightbox() {
    this.close.emit();
  }
}
