// src/app/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SquareLayoutComponent } from '../square-layout/square-layout.component';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, SquareLayoutComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  // emit an event or call a service in real app
  login() {
    localStorage.setItem('isLoggedIn', 'true'); // stub
    window.location.reload();                   // simple nav
  }
}
