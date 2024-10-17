import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatDialogClose],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('2000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ErrorComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

}
