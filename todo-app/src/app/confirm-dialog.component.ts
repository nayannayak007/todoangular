// confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `<h2 mat-dialog-title>Confirm</h2><mat-dialog-content>{{ data.message }}</mat-dialog-content><mat-dialog-actions> <button mat-button (click)="dialogRef.close(false)">Cancel</button><button mat-button color="primary" (click)="dialogRef.close(true)">Confirm</button></mat-dialog-actions>`,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
