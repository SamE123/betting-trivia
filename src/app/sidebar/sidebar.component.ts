import { isPlatformBrowser, NgForOf, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgForOf, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  players: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const eventSource = new EventSource('http://localhost:3000/events');
      console.log('SSE connection established:', eventSource.readyState);
      console.log('Attempting updates');
      eventSource.onmessage = (event) => {
        try {
          const updatedPlayers = JSON.parse(event.data);
          
          // Directly trust the server's updatedPlayers data
          // No fallback logic. The server must always send the correct fields.
          this.players = updatedPlayers;
          console.log(this.players)
      
        } catch (e) {
          console.error('Error parsing SSE data:', e);
        }
      };
    }
  }
}
