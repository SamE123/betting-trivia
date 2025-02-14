import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-name-dialog',
  standalone: true,
  templateUrl: './player-name-dialog.component.html',
  styleUrls: ['./player-name-dialog.component.css'],
  imports: [
    // Standard Angular modules
    CommonModule,
    FormsModule,

    // Angular Material modules used in the template
    MatDialogModule,    // <-- For mat-dialog-content, mat-dialog-actions, etc.
    MatButtonModule,    // <-- For mat-button, mat-raised-button
    MatFormFieldModule, // <-- For mat-form-field
    MatInputModule      // <-- For matInput
  ]
})

export class PlayerNameDialogComponent {
  playerName: string = '';

  constructor(
    private dialogRef: MatDialogRef<PlayerNameDialogComponent>
  ) {}

  confirmName(): void {
    if (this.playerName.trim()) {
      this.dialogRef.close(this.playerName.trim());
    } else {
      // Optionally show an error or do nothing
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}


