import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  players: any[] = [];
  private eventSource: EventSource | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.eventSource = new EventSource('http://localhost:3000/events');
      this.eventSource.onmessage = (event) => {
        // Force Angular to detect changes triggered by SSE
        this.ngZone.run(() => {
          try {
            const gameState = JSON.parse(event.data);
            this.players = gameState.players;
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        });
      };

      this.eventSource.onerror = (err) => {
        console.error('Sidebar SSE failed:', err);
        // Optionally handle reconnection or cleanup
      };
    }
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
