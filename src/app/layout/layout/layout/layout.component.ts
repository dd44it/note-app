import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import {ThemeToggleComponent} from '../../../shared/theme/theme.component';

@Component({
  selector: 'app-layout.component',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ThemeToggleComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  get year (): number {
   return new Date().getFullYear();
  }
}
