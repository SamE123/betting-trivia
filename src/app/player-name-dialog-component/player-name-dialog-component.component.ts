import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * PlayerNameDialogComponent
 * A sleek Angular Material dialog that prompts the user for their player name.
 */
@Component({
  selector: 'app-player-name-dialog',
  standalone: true,
  // We reference external HTML/CSS files here:
  templateUrl: './player-name-dialog.component.html',
  styleUrls: ['./player-name-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class PlayerNameDialogComponent {
  playerName: string = '';

  constructor(
    private dialogRef: MatDialogRef<PlayerNameDialogComponent>
  ) {}

  confirmName(): void {
    if (this.playerName.trim()) {
      // Pass the name back to the caller
      this.dialogRef.close(this.playerName.trim());
    } else {
      // Optionally do something if empty (e.g. show an error message)
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
