import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './note-view.component.html',
})
export class NoteViewComponent {

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private state = inject(TransferState);

  note$: Observable<any> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));

      const KEY = makeStateKey<any>('note-' + id);

      const cached = this.state.get(KEY, null);
      if (cached) return of(cached);

      return this.http.get(`/api/public-notes/${id}`).pipe(
        tap(note => this.state.set(KEY, note))
      );
    })
  );
}
