import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { GameService } from '../game.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgForOf, NgIf, MatDialogModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {
  playerName: string | null = null;
  playerScore: number = 4;

  gameStarted: boolean = false;
  currentQuestion: any = null;
  selectedAnswer: number | null = null;
  winner: string | null = null;
  isHost: boolean = false;

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
    private dialog: MatDialog,
    private gameService: GameService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.promptForPlayerName();
      this.subscribeToGameState();
    }
  }

  //=============================
  //    Player Name
  //=============================
  promptForPlayerName() {
    if (!isPlatformBrowser(this.platformId)) return;

    const name = prompt('Enter your player name:');
    if (name && name.trim()) {
      this.gameService.addPlayer(name).subscribe({
        next: (player) => {
          this.playerName = player.name;
          this.playerScore = player.score;
          this.isHost = player.isHost;
        },
        error: (err) => {
          if (err.status === 409) {
            alert('Player name already exists. Please choose a different name.');
            this.promptForPlayerName();
          } else {
            console.error('Error adding player:', err);
          }
        },
      });
    } else {
      alert('Player name is required.');
      this.promptForPlayerName();
    }
  }

  //=============================
  //    SSE Subscription
  //=============================
  subscribeToGameState() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.eventSource = new EventSource('http://localhost:3000/events');

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
    this.gameStarted = gameState.gameStarted;
    this.currentQuestion = gameState.currentQuestion;
    this.winner = gameState.winner;
    this.isHost = (gameState.host === this.playerName);
    this.questionsLoaded = gameState.questionsLoaded;

    // Timers from the server
    this.timeRemaining = gameState.timeRemaining || 0;
    this.stakeRemaining = gameState.stakeRemaining || 100;

    // Update local score from server side
    const me = gameState.players?.find((p: any) => p.name === this.playerName);
    if (me) {
      this.playerScore = me.score;
    }

    // If there's a winner, show final screen
    if (this.winner) {
      this.gameStarted = false;
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
      this.selectedAnswer = null;
      this.answerChosen = false;
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
  selectAnswer(index: number) {
    if (this.answerChosen || this.timeRemaining <= 0) {
      return;
    }

    this.selectedAnswer = index;
    this.answerChosen = true;

    let answerText = 'No Answer';
    if (
      this.currentQuestion &&
      Array.isArray(this.currentQuestion.answers) &&
      this.currentQuestion.answers[index]
    ) {
      answerText = this.currentQuestion.answers[index];
    }

    // Freeze the stake at the current value on the client
    // (The server will keep decrementing stakeRemaining for other players.)
    const chosenData = {
      playerName: this.playerName,
      stake: this.stakeRemaining, // <= This is your local "locked" stake
      answer: answerText,
    };

    this.gameService.chooseAnswer(chosenData).subscribe({
      next: () => {
        // The server + SSE handle the rest
      },
      error: (err) => console.error('Error choosing answer:', err),
    });
  }
}
