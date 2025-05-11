import { Component } from '@angular/core';
import { FormsModule }             from '@angular/forms';
import { InputTextModule }         from 'primeng/inputtext';
import { ButtonModule }            from 'primeng/button';
import { RouterModule, Router }    from '@angular/router';
import { AuthService }             from '../services/auth.service';
import { SquareLayoutComponent }   from '../square-layout/square-layout.component';
import { NgFor, NgIf } from '@angular/common';
import { PasswordModule }        from 'primeng/password';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    PasswordModule,
    SquareLayoutComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  email = '';
  password = '';
  errors: string[] = [];
  registered = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.errors = []; 
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.registered = true;
      },
      error: err => {
        // err.error.errors is the array we returned from the API
        if (err.status === 400 && err.error?.errors) {
          this.errors = err.error.errors;
        } else {
          this.errors = [ err.error?.message || 'Unknown error' ];
        }
      }
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
