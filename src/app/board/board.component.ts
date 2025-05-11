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
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../models/todo-item';

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
    constructor(
        private router: Router,
        private todoService: TodoService
    ) {}

    /* ---------- state ---------- */
    newItem = '';
    backlogItems: TodoItem[]  = [];
    priorities: TodoItem[][] = [[], [], []];
    userEmail = '';
    dragging: { task: TodoItem; from: number | null } | null = null;
  
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

        // load all todos
        this.todoService.getAll().subscribe(all => {
            this.backlogItems = all.filter(t => t.priority === 0);
            this.priorities[0] = all.filter(t => t.priority === 1);
            this.priorities[1] = all.filter(t => t.priority === 2);
            this.priorities[2] = all.filter(t => t.priority === 3);
        });
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
        const name = this.newItem.trim();
        if (!name) return;

        this.todoService.create(name).subscribe(todo => {
            this.backlogItems.push(todo);
            this.newItem = '';
        });
    }

    dragStart(payload: { task: TodoItem; from: number | null }) {
        this.dragging = payload;
    }

    dragEnd() {
        this.dragging = null;
    }

    dropIntoPriority(k: number): void {
        if (!this.dragging) return;
        const { task, from } = this.dragging;

        // if dropped back onto the same priority, do nothing
        if (from === k) {
            return this.dragEnd();
        }

        // remove from old list
        if (from === null) {
            this.backlogItems = this.backlogItems.filter(t => t.id !== task.id);
        } else if (from !== k) {
            this.priorities[from] = this.priorities[from].filter(t => t.id !== task.id);
        }

        // update priority and persist
        task.priority = k + 1;
        this.todoService.update(task).subscribe(() => {
            this.priorities[k].push(task);
            this.dragEnd();
        });
    }

    dropIntoBacklog(): void {
        if (!this.dragging) return;
        const { task, from } = this.dragging;

        // if dropped back into backlog where it started, do nothing
        if (from === null) {
            return this.dragEnd();
        }
        
        if (from !== null) {
            this.priorities[from] = this.priorities[from].filter(t => t.id !== task.id);
        }

        task.priority = 0;
        this.todoService.update(task).subscribe(() => {
            this.backlogItems.push(task);
            this.dragEnd();
        });
    }

    deleteTask(task: TodoItem, fromIndex: number | null) {
        this.todoService.delete(task.id).subscribe(() => {
            // remove from whichever list it was in
            if (fromIndex === null) {
                this.backlogItems = this.backlogItems.filter(t => t.id !== task.id);
            } else {
                this.priorities[fromIndex] = this.priorities[fromIndex].filter(t => t.id !== task.id);
            }
        });
    }

}
