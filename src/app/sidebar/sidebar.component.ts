import { 
  isPlatformBrowser, 
  NgFor, 
  NgIf 
} from '@angular/common';
import { 
  Component, 
  OnInit, 
  OnDestroy, 
  Inject, 
  PLATFORM_ID, 
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  /**
   * Holds the latest list of players, as received from the scoreboard SSE.
   */
  players: any[] = [];

  /**
   * The SSE event source for the scoreboard.
   */
  private eventSource: EventSource | null = null;
  public systemMessage: String | null = null;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scoreboardUrl = 'http://localhost:3000/scoreboard';
      this.eventSource = new EventSource(scoreboardUrl);
  
      this.eventSource.onmessage = (event) => {
        this.ngZone.run(() => {
          try {
            const gameState = JSON.parse(event.data);
            this.players = gameState.players;
            this.systemMessage = gameState.systemMessage; // Update system message
          } catch (e) {
            console.error('Error parsing scoreboard SSE data:', e);
          }
        });
      };
  
      this.eventSource.onerror = (err) => {
        console.error('Sidebar scoreboard SSE failed:', err);
      };
    }
  }
  
  ngOnDestroy(): void {
    // Clean up SSE connection when the sidebar is destroyed
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
