// src/app/app.component.ts
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, BoardComponent, CommonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
