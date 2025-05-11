// src/app/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SquareLayoutComponent } from '../square-layout/square-layout.component';
import { RouterModule, Router }      from '@angular/router';
import { PasswordModule }        from 'primeng/password';
import { AuthService, AuthResponse } from '../services/auth.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    SquareLayoutComponent,
    RouterModule,
    PasswordModule,
    NgIf, NgForOf
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errors: string[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // emit an event or call a service in real app
  login() {
    this.errors = [];
    this.auth.login(this.username, this.password).subscribe({
      next: (resp: AuthResponse) => {
        // store token and optionally expiration
        localStorage.setItem('jwt', resp.token);
        localStorage.setItem('jwt_exp', resp.expiration);
        // navigate to the board
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errors = ['Invalid email or password'];
        } else {
          this.errors = [ err.error?.message || 'Login failed' ];
        }
      }
    });
  }
}
