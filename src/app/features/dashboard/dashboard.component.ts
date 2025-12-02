import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <h2>Private Dashboard</h2>
    <p>Here you can edit and create your private notes (client-only).</p>
  `
})
export class DashboardComponent {}
