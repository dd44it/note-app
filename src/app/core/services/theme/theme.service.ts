import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  public currentTheme: Theme = 'light';

  constructor() {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        this.applyTheme(saved);
      } else {
        this.applyTheme('light');
      }
    }
  }

  /** Internal method — safe to call on both server & browser */
  private applyTheme(theme: Theme) {
    this.currentTheme = theme;

    // Only manipulate DOM in the browser
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }

  /** Public API */
  setTheme(theme: Theme) {
    this.applyTheme(theme);
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  get theme(): Theme {
    return this.currentTheme;
  }
}
