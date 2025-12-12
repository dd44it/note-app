import { Component, Input, Output, EventEmitter } from '@angular/core';

import { InspirationImage } from '../../../core/services/inspiration/inspiration.service'

@Component({
  selector: 'ui-image-card',
  standalone: true,
  imports: [],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css',
})
export class ImageCardComponent {
  @Input() image!: InspirationImage;
  @Output() open = new EventEmitter<void>();

  openImage() {
    this.open.emit();
  }

}
