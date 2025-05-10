// src/app/app.component.ts
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule, NgFor } from '@angular/common';   // ← bring back CommonModule
// PrimeNG modules
import { InputTextModule }   from 'primeng/inputtext';
import { ButtonModule }      from 'primeng/button';
import { PanelModule }       from 'primeng/panel';
import { DragDropModule }    from 'primeng/dragdrop';
import { RippleModule }      from 'primeng/ripple';          // nice click waves
import { FormsModule }       from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
    // PrimeNG
    InputTextModule,
    ButtonModule,
    PanelModule,
    DragDropModule,
    RippleModule
  ],
  providers: [
    provideAnimations()
  ]
})
export class AppComponent {
  /* ---------- state ---------- */
  newItem = '';
  backlogItems: string[] = [];
  priorities: string[][] = [[], [], []];

  /* ---------- actions ---------- */
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

  dropIntoPriority(k: number) {
    
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
