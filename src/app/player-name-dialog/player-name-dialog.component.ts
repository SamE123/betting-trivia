import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-player-name-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h1 mat-dialog-title>Enter Your Name</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="playerName" placeholder="Name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onConfirm()" cdkFocusInitial>OK</button>
    </div>
  `,
})
export class PlayerNameDialogComponent {
  playerName: string = '';

  constructor(private dialogRef: MatDialogRef<PlayerNameDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(this.playerName);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
