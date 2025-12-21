import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { InspirationImage } from '../../../core/services/inspiration/inspiration.service';

@Component({
  selector: 'ui-image-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLightboxComponent {
  @Input({ required: true }) images!: InspirationImage[];
  @Input({ required: true }) index!: number;

  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  get current(): InspirationImage {
    return this.images[this.index];
  }
}
