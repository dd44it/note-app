import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common'

import { InspirationImage } from '../../../core/interfacas/image';

@Component({
  selector: 'ui-image-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardComponent {
  @Input({ required: true }) image!: InspirationImage;
  @Output() open = new EventEmitter<InspirationImage>();
  loaded = false;

  onLoad() {
    this.loaded = true;
  }

  openImage(): void {
    this.open.emit(this.image);
  }

}
