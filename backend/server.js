/*******************************************************************
 * server.js (Node/Express)
 *******************************************************************/
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//=============================
//    Global Game State
//=============================
let players = [];
let questions = [];
let questionIndex = 0;
let gameStarted = false;
let currentQuestion = null;
let winner = null;
let host = null;
let sseClients = [];

// Timer variables
let timeRemaining = 0;
let stakeRemaining = 100;
let globalIntervalId = null;

//=============================
//    SSE: Broadcast
//=============================
function broadcastGameState() {
  const gameState = {
    players,
    questionsLoaded: questions.length > 0,
    questionIndex,
    currentQuestion,
    gameStarted,
    winner,
    host,
    timeRemaining,
    stakeRemaining
  };
  const data = JSON.stringify(gameState);
  sseClients.forEach((res) => {
    res.write(`data: ${data}\n\n`);
  });
}

//=============================
//    Start the "Global" Timer
//=============================
// We'll keep stake at 100 for the first 2.5 seconds (2,500 ms).
function startGlobalInterval() {
  if (globalIntervalId) {
    clearInterval(globalIntervalId);
  }

  let elapsedMs = 0;
  globalIntervalId = setInterval(() => {
    elapsedMs += 100;

    // --------------------------------
    // 1) Decrement TIME every 1 second
    // --------------------------------
    if (elapsedMs % 1000 === 0) {
      timeRemaining--;

      // If time runs out, finalize
      if (timeRemaining < 0) {
        finalizeQuestion();
      }
    }

    // ------------------------------------------------
    // 2) Keep stake at 100 for first 2.5s, then drop
    // ------------------------------------------------
    if (elapsedMs >= 2000 && stakeRemaining > 25) {
      stakeRemaining--;
    }

    // Finally, broadcast the updated state each tick
    broadcastGameState();
  }, 100);
}

function stopGlobalInterval() {
  if (globalIntervalId) {
    clearInterval(globalIntervalId);
    globalIntervalId = null;
  }
}

//=============================
//    Finalize & Next Question
//=============================
function finalizeQuestion() {
  // Score all players at question end
  players.forEach((player) => {
    // If no answer chosen, assign minimal stake & "No Answer"
    if (player.answer === undefined) {
      player.answer = 'No Answer';
      player.stake = 25;
    }
    scorePlayer(player, currentQuestion?.correct);
  });

  checkForWinner();
  broadcastGameState();

  // Show the correct answer for 3s, then proceed or end
  setTimeout(() => {
    if (winner) {
      stopGlobalInterval();
      return;
    }
    nextQuestion();
  }, 3000);

  // Stop the main timer
  stopGlobalInterval();
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex >= questions.length) {
    // If you want to end the game entirely, you can do so here
    // gameStarted = false;
    // return;
    questionIndex = 0; // Or just loop back to the first question
  }

  currentQuestion = questions[questionIndex];

  // Reset ephemeral data for new question
  players.forEach((p) => {
    p.answer = undefined;
    p.stake = undefined;
    p.correct = undefined;
  });

  timeRemaining = 10;
  stakeRemaining = 100;
  startGlobalInterval();
  broadcastGameState();
}

//=============================
//    Score a Single Player
//=============================
function scorePlayer(player, correctAnswer) {
  // Default stake to 100% if not defined
  const bet = (player.stake !== undefined) ? player.stake : 100;
  const betFraction = bet / 100;

  if (player.answer === correctAnswer) {
    // Round up any fractional points
    const pointsEarned = Math.ceil(player.score * betFraction);
    player.score += pointsEarned;
    player.correct = true;
  } else {
    // Also round up points lost, never go below 1
    const pointsLost = Math.ceil(player.score * betFraction);
    player.score -= pointsLost;
    if (player.score < 1) {
      player.score = 1;
    }
    player.correct = false;
  }
}

//=============================
//    Check for Game Winner
//=============================
function checkForWinner() {
  const potentialWinner = players.find((p) => p.score > 50);
  if (potentialWinner) {
    winner = potentialWinner.name;
  }
}

//=============================
//    CSV Loading
//=============================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

app.post('/load-questions', (req, res) => {
  const questionsFilePath = './data/questions.csv';
  const loadedQuestions = [];

  fs.createReadStream(questionsFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      try {
        const answers = [
          row['Correct Answer'],
          row['Answer2'],
          row['Answer3'],
          row['Answer4']
        ];
        const correctAnswer = answers[0];
        shuffleArray(answers);

        loadedQuestions.push({
          caption: row['Question'],
          image: row['Img'],
          answers,
          correct: correctAnswer
        });
      } catch (err) {
        console.error('Error parsing row:', err);
      }
    })
    .on('end', () => {
      shuffleArray(loadedQuestions);
      questions = loadedQuestions;
      broadcastGameState();
      res.json({ message: 'Questions loaded successfully', questions });
    })
    .on('error', (err) => {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Error loading questions' });
    });
});

//=============================
//    Start Game
//=============================
app.post('/start-game', (req, res) => {
  const { playerName } = req.body;
  const player = players.find((p) => p.name === playerName);
  if (!player || !player.isHost) {
    return res.status(403).json({ error: 'Only the host can start the game' });
  }
  if (questions.length === 0) {
    return res.status(400).json({ error: 'No questions loaded.' });
  }

  gameStarted = true;
  winner = null;
  questionIndex = 0;
  currentQuestion = questions[questionIndex];

  players.forEach((p) => {
    p.answer = undefined;
    p.stake = undefined;
    p.correct = undefined;
  });

  timeRemaining = 10;
  stakeRemaining = 100;
  startGlobalInterval();

  broadcastGameState();
  res.json({ message: 'Game started', currentQuestion });
});

//=============================
//    SSE Connection
//=============================
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  sseClients.push(res);
  req.on('close', () => {
    sseClients = sseClients.filter(client => client !== res);
  });

  broadcastGameState();
});

//=============================
//    Choose Answer
//=============================
app.post('/choose-answer', (req, res) => {
  const { playerName, stake, answer } = req.body;
  const player = players.find((p) => p.name === playerName);
  if (!player) {
    return res.status(404).send('Player not found');
  }

  player.stake = stake;
  player.answer = answer;
  player.correct = undefined;

  broadcastGameState();
  res.json({ message: 'Answer recorded' });
});

//=============================
//    Submit Answer (Optional)
//=============================
app.post('/submit-answer', (req, res) => {
  const { playerName, answer, bet } = req.body;
  if (!currentQuestion) {
    return res.status(400).json({ error: 'No current question.' });
  }

  const player = players.find((p) => p.name === playerName);
  if (!player) {
    return res.status(404).send('Player not found');
  }

  player.answer = answer || 'No Answer';
  player.stake = Math.round(bet * 100);

  broadcastGameState();
  res.json({ message: 'Answer submitted' });
});

//=============================
//    Add Player
//=============================
app.post('/add-player', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Player name is required' });
  }
  const existingPlayer = players.find((p) => p.name === name);
  if (existingPlayer) {
    return res.status(409).json({ error: 'Player already exists' });
  }

  const isHost = (players.length === 0);
  const newPlayer = { name, score: 4, isHost };
  players.push(newPlayer);
  if (isHost) {
    host = newPlayer.name;
  }

  broadcastGameState();
  res.status(201).json(newPlayer);
});

//=============================
//    Start the Server
//=============================
app.listen(3000, () => {
  console.log('Backend server running at http://localhost:3000');
});
