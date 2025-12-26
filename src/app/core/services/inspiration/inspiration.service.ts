import { Injectable, inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { of, tap, Observable } from 'rxjs';
import { InspirationImage } from '../../interfacas/image';

const IMAGES_KEY = makeStateKey<InspirationImage[]>('unsplash-images');

@Injectable({ providedIn: 'root' })
export class InspirationService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private state = inject(TransferState);
  private platform = inject(PLATFORM_ID);

  private STORAGE_KEY = 'noteapp_inspiration_likes';

  /** Load liked/disliked ids */
  private getLikes(): Record<string, boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    }
    return {};
  }

  private saveLikes(data: Record<string, boolean>) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  loadRandomImages(count: number): Observable<InspirationImage[]> {
    const cached = this.state.get(IMAGES_KEY, null);
    if (cached) return of(cached);

    return this.http
      .get<InspirationImage[]>(`/api/random-images?count=${count}`)
      .pipe(
        tap((images) => this.state.set(IMAGES_KEY, images))
      );
  }

  like(url: string) {
    const likes = this.getLikes();
    likes[url] = true;
    this.saveLikes(likes);
  }

  dislike(url: string) {
    const likes = this.getLikes();
    likes[url] = false;
    this.saveLikes(likes);
  }
}
