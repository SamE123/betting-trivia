import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';  // <-- import MatDialog
import { NgForOf, NgIf } from '@angular/common';
import { GameService } from '../game.service';
import { PlayerNameDialogComponent } from '../player-name-dialog/player-name-dialog.component'; // <--- your new dialog
import { MatDialogModule } from '@angular/material/dialog';
import {SettingsComponent} from '../host-settings/host-settings.component'
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgForOf, NgIf, MatDialogModule, SettingsComponent],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {

  @Output() playerNameChange = new EventEmitter<string | null>();
  @Output() isHostChange = new EventEmitter<boolean>();
  


  playerName: string | null = null;
  playerScore: number = 4;
  gameStarted: boolean = false;
  currentQuestion: any = null;
  selectedAnswer: number | null = null;
  winner: string | null = null;
  isHost: boolean = false;
  systemMessage: string | null = null;
  showSettings: boolean = false; // Toggle state for settings panel
  isUpdatingSettings: boolean = false; 
  phaseThreshold: number = 50;
  categories: string[] = [''];
  subcategories: string[] = [''];
  isAnswerUpdating: boolean = false; 
  isPlayingAgain: boolean = false; // New flag
  secondPlaythrough: boolean = false; 
  canChangeSettings: boolean = true; 


  
  // Timer data from the server
  timeRemaining: number = 0;
  stakeRemaining: number = 100;

  // Additional flags
  questionsLoaded: boolean = false;
  loadingQuestions: boolean = false;
  answerChosen: boolean = false;

  private eventSource: EventSource | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private gameService: GameService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef // Add ChangeDetectorRef
  ) {}
  
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCategoriesAndSubcategories();
      this.openPlayerNameDialog();
  
      // Placeholder message for waiting state
      this.currentQuestion = {
        image: 'https://via.placeholder.com/400?text=Waiting+for+Players',
        caption: 'Waiting for players to join...',
        answers: [],
        correct: null,
      };
    }
  }
  
  loadCategoriesAndSubcategories() {
    this.gameService.loadCategories().subscribe({
      next: (data: { categories: string[]; subcategories: string[] }) => {
        this.categories = data.categories.sort((a, b) => a.localeCompare(b));
        this.subcategories = data.subcategories.sort((a, b) => a.localeCompare(b));
    
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }



  openPlayerNameDialog() {
    // Instead of using prompt, open a Material dialog
    const dialogRef = this.dialog.open(PlayerNameDialogComponent, {
      width: '300px', 
      disableClose: true  // user must click OK or Cancel
    });

    dialogRef.afterClosed().subscribe((chosenName) => {
      if (chosenName) {
        // user typed a name and pressed OK
        this.addPlayer(chosenName);
      } else {
        // user canceled or closed
        // optionally, you can call openPlayerNameDialog() again or do something else
      }
    });
  }

  addPlayer(chosenName: string) {
    // This replicates the logic from your old promptForPlayerName
    this.gameService.addPlayer(chosenName).subscribe({
      next: (player) => {
        this.playerName = player.name;
        this.playerScore = player.score;
        this.playerNameChange.emit(this.playerName);

        // Then subscribe to SSE, etc.
        this.subscribeToGameState();
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Player name already exists. Please choose a different name.');
          // Re-open the dialog if you want them to pick a new name
          this.openPlayerNameDialog();
        } else if (err.status === 403) {
          alert(err.error.error || 'Cannot join the game at this time.');
          // Optionally, you can handle this differently, such as closing the dialog
        } else {
          console.error('Error adding player:', err);
        }
      },
    });
  }

  
  //=============================
  //    SSE Subscription
  //=============================
  subscribeToGameState() {
    if (!this.playerName) {
      return; // can't subscribe if name is not set
    }
  
    // Instead of 'http://localhost:3000/events', include the player's name
    const url = `http://localhost:3000/events/${encodeURIComponent(this.playerName)}`;
  
    this.eventSource = new EventSource(url);
  
    this.eventSource.onmessage = (event) => {
      this.ngZone.run(() => {
        try {
          const gameState = JSON.parse(event.data);
          this.updateFromGameState(gameState);
        } catch (e) {
          console.error('Error parsing game state update:', e);
        }
      });
    };
  
    this.eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      // Optionally handle SSE errors or attempt to reconnect
    };
  }
  
  ngOnDestroy() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  //=============================
  //    Update from Game State
  //=============================
  updateFromGameState(gameState: any) {

    if(gameState.newQuestion){
      this.isAnswerUpdating = true; 
      this.answerChosen = false; 
      this.selectedAnswer = null;
      this.isAnswerUpdating = false;
    }
    
    this.gameStarted = gameState.gameStarted;
    this.currentQuestion = gameState.currentQuestion;
    this.winner = gameState.winner;
    this.isHost = (gameState.host === this.playerName);
    this.questionsLoaded = gameState.questionsLoaded;
    this.systemMessage = gameState.systemMessage || null;

    // Timers from the server
    this.timeRemaining = gameState.timeRemaining || 0;
    this.stakeRemaining = gameState.stakeRemaining || 100;

    // Update local score from server side
    const me = gameState.players?.find((p: any) => p.name === this.playerName);
    if (me) {
      this.playerScore = me.score;
    }

    this.isHostChange.emit(this.isHost);

    // If there's a winner, show final screen
    if (this.winner) {
      this.gameStarted = false;
      this.isPlayingAgain = false;
      this.canChangeSettings = true; 
 
      const winImage = 'https://via.placeholder.com/400?text=Winner!';
      const winMessage = `${this.winner} has won!`;
      this.currentQuestion = {
        image: winImage,
        caption: winMessage,
        answers: [],
        correct: null,
      };
    }

    // Fresh question => reset local selection flags
    if (this.currentQuestion && this.timeRemaining === 10) {
    }
  }

  //=============================
  //    Start Game (Host Only)
  //=============================
  startGame(): void {
    if (!this.isHost) {
      console.error('Only the host can start the game');
      return;
    }
    this.canChangeSettings = false; 
    console.log('Loading qs');

    this.loadingQuestions = true;
    this.gameService.loadQuestions().subscribe({
      next: () => {
        this.loadingQuestions = false;
        this.gameService.startGame({ playerName: this.playerName! }).subscribe({
          next: (startResponse) => {
            console.log('Game started:', startResponse);
            // SSE will keep us updated
          },
          error: (err) => {
            console.error('Error starting game:', err);
          },
        });
      },
      error: (err) => {
        this.loadingQuestions = false;
        console.error('Error loading questions:', err);
      },
    });
  }

  //=============================
  //    Manually get next question (optional)
  //=============================
  loadQuestion() {
    if (!this.questionsLoaded) {
      console.error('No questions loaded yet.');
      return;
    }
    if (!this.gameStarted) {
      console.error('Game not started yet.');
      return;
    }

    this.gameService.getQuestion().subscribe({
      next: (data) => {
        console.log('Fetched next question from server:', data);
      },
      error: (err) => console.error('Error getting question:', err),
    });
  }

  //=============================
  //    Select an Answer
  //=============================
  selectAnswer(index: number): void {
    if (this.answerChosen || this.timeRemaining <= 0 || this.isAnswerUpdating) {
      return;
    }
  
    this.answerChosen = true;
    this.selectedAnswer = index;

  
    // Trigger change detection to update the UI immediately
    this.cdr.detectChanges();
  
    const answerText = this.currentQuestion?.answers?.[index] || 'No Answer';
    const chosenData = {
      playerName: this.playerName,
      stake: this.stakeRemaining,
      answer: answerText,
    };
  
    console.log(chosenData);
    this.gameService.chooseAnswer(chosenData).subscribe({
      next: () => {
        console.log('Answer submitted successfully');
        console.log(this.answerChosen);
      },
      error: (err) => {
        console.error('Error choosing answer:', err);
        this.answerChosen = false; // Unlock UI if the server call fails
        this.cdr.detectChanges(); // Update UI
      },
    });
  }
  

  updateSettings(settings: any): void {
    console.log('Updating settings:', settings);
  
    this.gameService.updateGameSettings(settings).subscribe({
      next: () => {
        console.log('Settings applied successfully');
        this.showSettings = false; // Close settings page
        this.isUpdatingSettings = false;
      },
      error: (err) => {
        console.error('Error applying settings:', err);
        //this.isUpdatingSettings = false; // Ensure UI is re-enabled on error
      },
    });

  }
  
  playAgain(): void {
    this.canChangeSettings = false; 
    console.log("Playing again...");
    console.log("The playing again value is as below...");
    console.log(this.isPlayingAgain);
    this.secondPlaythrough = true; 
  
    if (this.isPlayingAgain) {
      console.log("Returning playing again");
      return; // Prevent multiple clicks
    }
  
    console.log("Made it past playingAgain return");
  
    this.isPlayingAgain = true; // Disable "Play Again" button
    this.gameService.resetGame().pipe(
      switchMap(() => {
        console.log('Game reset successfully');
        // Reset local variables for UI
        this.winner = null;
        this.gameStarted = false;
        this.questionsLoaded = false;
        //this.subscribeToGameState(); // Ensure updated state
  
        // Call startGame after resetGame is successful
        return this.gameService.startGame({ playerName: this.playerName! });
      }),
      catchError((err) => {
        console.error('Error during play again process:', err);
        this.isPlayingAgain = false; // Re-enable button on error
        return of(null); // Handle the error gracefully
      })
    ).subscribe({
      next: (startResponse) => {
        if (startResponse) {
          console.log('Game started:', startResponse);
          // Wait for SSE to update the question before re-enabling the button
          setTimeout(() => {
            this.isPlayingAgain = false; // Re-enable button after 1 second
          }, 1000); // Adjust the delay as needed
        } else {
          this.isPlayingAgain = false; // Re-enable button if no startResponse
        }
      },
      error: (err) => {
        console.error('Unexpected error:', err); // Should rarely happen with catchError
        this.isPlayingAgain = false; // Re-enable on unexpected error
      },
    });
  }
      }
