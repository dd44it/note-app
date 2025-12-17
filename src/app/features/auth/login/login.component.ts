import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { form, Field, required, minLength, maxLength } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [Field, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  credentials = signal<{ login: string, password: string }>({
    login: '',
    password: '',
  });

  credentialsForm = form(this.credentials, (schemaPath) => {
    required(schemaPath.login, { message: 'Login is required' });
    minLength(schemaPath.login, 3, { message: 'Minimum 3 characters' });
    maxLength(schemaPath.login, 30, { message: 'Maximum 30 characters' });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Minimum 8 characters' });
    maxLength(schemaPath.password, 16, { message: 'Maximum 16 characters' });
  });

  submit() {
    // event.preventDefault();
    if (!this.credentialsForm().valid()) {
      return;
    }

    const value = this.credentials();
    console.log('Login submit:', value);
  }

}
