import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogClose, MatDialogModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('2000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SuccessComponent {

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

}
