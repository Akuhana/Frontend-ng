// src/app/board.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { InputTextModule }   from 'primeng/inputtext';
import { ButtonModule }      from 'primeng/button';
import { PanelModule }       from 'primeng/panel';
import { DragDropModule }    from 'primeng/dragdrop';
import { RippleModule }      from 'primeng/ripple';
import { SquareLayoutComponent } from '../square-layout/square-layout.component';
import { Router }    from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule, NgFor, FormsModule,
    InputTextModule, ButtonModule,
    PanelModule, DragDropModule, RippleModule,
    SquareLayoutComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
    constructor(private router: Router) {}

    /* ---------- state ---------- */
    newItem = '';
    backlogItems: string[] = [];
    priorities: string[][] = [[], [], []];
    userEmail = '';
  
    /* ---------- lifecycle ---------- */
    ngOnInit() {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                // split header.payload.signature, base64-decode the payload
                const payload = JSON.parse(atob(token.split('.')[1]));
                this.userEmail = payload.email || '';
            } catch {
                this.userEmail = '';
            }
        }
    }
    
    /* ---------- actions ---------- */
    logout() {
        // Clear the stored token (and any other auth info)
        localStorage.removeItem('jwt');
        localStorage.removeItem('jwt_exp');

        // Send the user back to the login page
        this.router.navigate(['/login']);
    }

    addItem(): void {
        const text = this.newItem.trim();
        if (text) {
            this.backlogItems.push(text);
            this.newItem = '';
        }
    }

    dragging: { task: string; from: number | null } | null = null;

    dragStart(payload: { task: string; from: number | null }) {
        this.dragging = payload;
    }

    dragEnd() {
        this.dragging = null;
    }

    dropIntoPriority(k: number): void {
        if (!this.dragging) {
            console.warn('dropIntoPriority: nothing being dragged');
            return;
        }

        const { task, from } = this.dragging;

        if (from === null) {
            // came from backlog
            this.backlogItems = this.backlogItems.filter(t => t !== task);
        } else if (from !== k) {
            // came from a different priority column
            this.priorities[from] = this.priorities[from].filter(t => t !== task);
        }

        if (!this.priorities[k].includes(task)) {
            this.priorities[k].push(task);
        }

        this.dragEnd();
    }

    dropIntoBacklog() {
        if (!this.dragging) return;
        const { task, from } = this.dragging;

        if (from !== null) {
        this.priorities[from] =
            this.priorities[from].filter(t => t !== task);
        }
        if (!this.backlogItems.includes(task)) {
            this.backlogItems.push(task);
        }
        this.dragEnd();
    }
}
