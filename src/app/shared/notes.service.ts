import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';
import { Observable, of, map, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();
  private http = inject(HttpClient);

  getNotes(): Observable<Note[]> {
    return this.notes$;
  }
  /** Get a note by ID */
  // getNoteById(id: string): Observable<Note | null> {
  //   return this.notes$.pipe(
  //     map((notes: Note[]) => notes.find((n: Note) => n.id === id) || null)
  //   );
  // }

  /** Add a new note */
  addNote(note: Note): void {
    const current = this.notesSubject.value;
    this.notesSubject.next([...current, note]);
  }

  /** Update a note */
  updateNote(updatedNote: Note): void {
    const updated = this.notesSubject.value.map(n =>
      n.id === updatedNote.id ? updatedNote : n
    );
    this.notesSubject.next(updated);
  }

  /** Delete a note */
  deleteNote(id: number) {
    const filtered = this.notesSubject.value.filter(n => n.id !== id);
    this.notesSubject.next(filtered);
  }


  getPublicNotes(): Observable<Note[]> {
    return of([
      { id: 1, title: 'Angular SSR Rocks', content: 'Server-side rendering demo...', public: true },
      { id: 2, title: 'Why SSR matters', content: 'SEO, performance, caching...', public: true }
    ]);
  }

  getNoteById(id: number): Observable<Note | null> {
    return this.notes$.pipe(
      map((notes: Note[]) => notes.find(n => n.id === id) || null)
    );
  }

}
