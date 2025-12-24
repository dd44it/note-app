import { Routes } from '@angular/router';
import { NoteListComponent } from './public/note-list/note-list.component';
import { NoteViewComponent } from './public/note-view/note-view.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './layout/layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'note/:id', component: NoteViewComponent },
    ],
  },
  { path: 'public', component: NoteListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
