import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessComponent } from '../components/modals/success/success.component';
import { ErrorComponent } from '../components/modals/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) {}

  openSuccessModal(message: string): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      data: { message },
      width: 'auto',
      position: { top: '1rem', right: '1rem'}, // Adjust the width as needed
      panelClass: ['overlay-dialog'],
      disableClose: false,
      hasBackdrop: false,
      exitAnimationDuration: 2000,
    });

    setTimeout(() => {
      dialogRef.close();
    }, 1000);
  }

  openErrorModal(message: string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      data: { message },
      width: 'auto',
      position: { top: '1rem', right: '1rem'}, // Adjust the width as needed
      panelClass: ['overlay-dialog'],
      disableClose: false,
      hasBackdrop: false,
      exitAnimationDuration: 2000,
    });

    setTimeout(() => {
      dialogRef.close();
    }, 1000);
  }

  closeModal(dialogRef: MatDialogRef<any>): void {
    // Close the dialog using the provided MatDialogRef
    dialogRef.close();
  }

}
