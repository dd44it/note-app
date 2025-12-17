import { Routes } from '@angular/router';
import { NoteListComponent } from './public/note-list/note-list.component';
import { NoteViewComponent } from './public/note-view/note-view.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'public', component: NoteListComponent },
  { path: 'note/:id', component: NoteViewComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
