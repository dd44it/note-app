import { Routes } from '@angular/router';
import { NoteListComponent } from './public/note-list/note-list.component';
import { NoteViewComponent } from './public/note-view/note-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'note/:id', component: NoteViewComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
