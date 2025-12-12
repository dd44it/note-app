import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Observable, of, tap } from 'rxjs';

export interface PublicNote {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
}

const NOTES_KEY = makeStateKey<PublicNote[]>('notes');

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private ts = inject(TransferState);
  private platform = inject(PLATFORM_ID);

  loadNotes(): Observable<PublicNote[]> {
    const cached = this.ts.get(NOTES_KEY, null);
    if (cached) return of(cached);

    const req = this.http.get<PublicNote[]>('/api/public-notes')
      .pipe(tap(notes => this.ts.set(NOTES_KEY, notes)));

    return isPlatformServer(this.platform) ? req : req;
  }

  loadStaticNotes(): Observable<PublicNote[]> {
    return this.http.get<PublicNote[]>('/assets/notes.json');
  }
}
