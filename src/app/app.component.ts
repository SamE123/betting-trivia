import { Component } from '@angular/core';
import { RoomComponent } from './room/room.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RoomComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-game';
  
  // The parent's copy of the chosen name
  playerName: string | null = null;

  // This method handles the event from <app-room>
  onPlayerNameSelected(name: string | null) {
    this.playerName = name;
  }
}
