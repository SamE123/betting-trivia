import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlayerNameDialogComponent } from './player-name-dialog/player-name-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoomComponent, SidebarComponent, PlayerNameDialogComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use styleUrls here
})
export class AppComponent {
  title = 'quiz-game';
}
