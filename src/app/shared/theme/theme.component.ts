import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button class="toggle-btn" (click)="toggle()">
      {{ themeService.currentTheme === 'dark' ? '🌞 Light' : '🌙 Dark' }}
    </button>
  `,
  styles: [`
    .toggle-btn {
      cursor: pointer;
      padding: 0.6rem 1.1rem;
      border-radius: 8px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--fg);
      box-shadow: 0 2px 4px var(--card-shadow);
      font-size: 0.9rem;
      transition: background 0.2s ease;
    }
    .toggle-btn:hover {
      background: var(--card-border);
    }
  `]
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  toggle() {
    this.themeService.toggleTheme();
  }
}
