import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { GameService } from '../game.service';
import { isPlatformBrowser } from '@angular/common';
import { NgForOf, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgForOf, NgIf, MatDialogModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  playerName: string | null = null;
  playerScore: number = 4;
  gameStarted: boolean = false;
  currentQuestion: any = null;
  selectedAnswer: number | null = null;
  winner: string | null = null;

  countdown: number = 10;
  showAnswer: boolean = false;
  intervalId: any;
  stakeIntervalId: any;

  stake: number = 100;
  answerChosen: boolean = false;
  displayStake: number = 100;

  questionsLoaded: boolean = false; // Track if questions are loaded
  loadingQuestions: boolean = false; // Flag for loading questions

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    private gameService: GameService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.promptForPlayerName();
    }
  }

  promptForPlayerName() {
    if (isPlatformBrowser(this.platformId)) {
      const name = prompt('Enter your player name:');
      if (name !== null && name.trim() !== '') {
        this.gameService.addPlayer(name).subscribe({
          next: (player) => {
            this.playerName = player.name;
            this.playerScore = player.score;
            this.loadQuestions(); // Ensure questions are loaded after adding the player
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
  }

  loadQuestions() {
    this.loadingQuestions = true;
    this.gameService.loadQuestions().subscribe({
      next: (response) => {
        console.log('Questions loaded:', response);
        this.questionsLoaded = true;
        this.loadingQuestions = false;
      },
      error: (err) => {
        console.error('Error loading questions:', err);
        this.loadingQuestions = false;
      },
    });
  }

  startGame(): void {
    if (this.questionsLoaded) {
      this.gameStarted = true;
      this.loadQuestion();
    } else {
      console.error('Questions are not yet loaded.');
      alert('Please wait while questions are loading...');
    }
  }

  loadQuestion() {
    if (!this.questionsLoaded) {
      console.error('Cannot load question: Questions are not loaded.');
      return;
    }

    this.gameService.getQuestion().subscribe((data) => {
      this.currentQuestion = data;
      this.selectedAnswer = null;
      this.showAnswer = false;
      this.answerChosen = false;
      this.stake = 100;
      this.displayStake = 100;
      this.startCountdown();
    });
  }

  startCountdown() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.countdown = 10;

    // Clear any previous intervals
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.stakeIntervalId) clearInterval(this.stakeIntervalId);

    // Stake decrement timer
    this.stakeIntervalId = setInterval(() => {
      if (this.stake > 25 && !this.answerChosen && !this.showAnswer) {
        this.stake -= 1;
        this.displayStake = this.stake;
      }
    }, 100);

    // Countdown timer
    this.intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.intervalId);
        clearInterval(this.stakeIntervalId);
        this.revealAndScore();
      }
    }, 1000);
  }

  selectAnswer(index: number) {
    this.selectedAnswer = index;
    this.answerChosen = true;
    clearInterval(this.stakeIntervalId);
  
    let answerText = 'No Answer';
    if (this.selectedAnswer !== null && this.currentQuestion && this.currentQuestion.answers) {
      answerText = this.currentQuestion.answers[this.selectedAnswer];
    }
  
    const chosenData = {
      playerName: this.playerName,
      stake: this.displayStake,
      answer: answerText,
    };
  
    this.gameService.chooseAnswer(chosenData).subscribe(() => {
      // Updates from the server
    });
  }
  

  revealAndScore() {
    this.showAnswer = true;

    this.submitAnswerAndScore((result: any) => {
      if (result.winner) {
        this.winner = result.winner;
      }

      setTimeout(() => {
        if (this.winner) {
          this.showWinScreen();
        } else {
          this.loadQuestion();
        }
      }, 4000);
    });
  }

  showWinScreen() {
    this.currentQuestion = null;
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

  submitAnswerAndScore(callback: (result: any) => void) {
    let answerText = 'No Answer';
    if (this.selectedAnswer !== null && this.currentQuestion && this.currentQuestion.answers) {
      answerText = this.currentQuestion.answers[this.selectedAnswer];
    }
  
    const answerData = {
      playerName: this.playerName,
      answer: answerText,
      bet: this.displayStake / 100,
    };
  
    this.gameService.submitAnswer(answerData).subscribe((result: any) => {
      if (result.correct) {
        const pointsEarned = Math.ceil(this.playerScore * (this.displayStake / 100));
        this.playerScore += Math.max(pointsEarned, 1);
      } else {
        const pointsLost = Math.ceil(this.playerScore * (this.displayStake / 100));
        this.playerScore -= pointsLost;
        if (this.playerScore < 1) this.playerScore = 1;
      }
  
      callback(result);
    });
  }
  
  }
