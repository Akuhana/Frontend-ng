// src/app/square-layout.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'square-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square-layout.component.html',
})
export class SquareLayoutComponent {
    /** Layout direction: 'row' for board, 'column' for login */
    @Input() layout: 'row' | 'column' = 'row';

    get layoutClass(): string {
        return this.layout === 'row'
        ? 'flex flex-row gap-4'
        : 'flex flex-column gap-3';
    }

    /** dynamic sizing */
    get viewportStyle() {
        if (this.layout === 'row') {
        // fixed square for your board
        return {
            width: 'min(90vmin, 90vh)',
            height: 'min(90vmin, 90vh)'
        };
        } else {
        // adaptive box for login
        return {
            width: 'auto',
            height: 'auto',
            'max-width': '30rem',    // or whatever you want
            'max-height': '90vh'
        };
        }
    }
}