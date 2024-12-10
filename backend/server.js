const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();

app.use(cors());
app.use(express.json());

// Global variables
let players = [];
let questions = [];
let questionIndex = 0;

// Keep track of SSE clients
let sseClients = [];

function broadcastPlayers() {
  const data = JSON.stringify(players);
  console.log('Broadcasting Players:', data);
  sseClients.forEach((res) => {
    res.write(`data: ${data}\n\n`);
  });
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Route to load questions from CSV
app.post('/load-questions', (req, res) => {
  const questionsFilePath = './data/questions.csv'; // Adjust the path as needed

  const loadedQuestions = [];
  fs.createReadStream(questionsFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      try {
        const answers = [row['Correct Answer'], row['Answer2'], row['Answer3'], row['Answer4']];
        const correctAnswer = answers[0]; // The first answer is always correct
        shuffleArray(answers); // Shuffle the answers
    
        const shuffledCorrectIndex = answers.indexOf(correctAnswer); // Find the new index of the correct answer
    
        const question = {
          caption: row['Question'],
          image: row['Img'],
          answers,
          correct: answers[shuffledCorrectIndex], // Correct answer after shuffle
        };
        loadedQuestions.push(question);
      } catch (err) {
        console.error('Error parsing row:', err);
      }
    })    
    .on('end', () => {
      shuffleArray(loadedQuestions); // Shuffle the question order
      questions = loadedQuestions;
      console.log('Questions loaded and shuffled:', questions);
      res.json({ message: 'Questions loaded and shuffled successfully', questions });
    })
    .on('error', (err) => {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Error loading questions' });
    });
});

// Question endpoint
app.get('/question', (req, res) => {
  if (questions.length === 0) {
    return res.status(400).json({ error: 'No questions available. Please load questions first.' });
  }

  const question = questions[questionIndex];
  questionIndex = (questionIndex + 1) % questions.length; // Move to the next question

  players.forEach((p) => {
    p.answer = undefined;
    p.stake = undefined;
    p.correct = undefined;
  });
  broadcastPlayers();

  res.json(question);
});

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add the client response to the SSE clients list
  sseClients.push(res);

  // Remove the client when the connection closes
  req.on('close', () => {
    sseClients = sseClients.filter(client => client !== res);
  });

  // Send an initial message to confirm the connection
  res.write(`data: ${JSON.stringify(players)}\n\n`);
});


app.get('/players', (req, res) => {
  res.json(players);
});

app.post('/choose-answer', (req, res) => {
  const { playerName, stake } = req.body; // No `answer` yet
  const player = players.find((p) => p.name === playerName);
  if (!player) {
    return res.status(404).send('Player not found');
  }

  player.stake = stake;
  player.correct = undefined; // Not decided yet

  broadcastPlayers();
  res.json({ message: 'Stake recorded' });
});

app.post('/add-player', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Player name is required' });
  }
  const existingPlayer = players.find((player) => player.name === name);
  if (existingPlayer) {
    return res.status(409).json({ error: 'Player already exists' });
  }
  const newPlayer = { name, score: 4 };
  
  players.push(newPlayer);

  broadcastPlayers();
  res.status(201).json(newPlayer);
  console.log('Current Players:', players);

});

app.post('/submit-answer', (req, res) => {
  const { playerName, answer, bet } = req.body;
  const currentQuestion = questions[questionIndex === 0 ? questions.length - 1 : questionIndex - 1];
  const correctAnswer = currentQuestion.correct;

  const player = players.find((p) => p.name === playerName);
  if (!player) {
    return res.status(404).send('Player not found');
  }

  player.answer = answer || 'No Answer';
  player.stake = Math.round(bet * 100);

  let correct = false;
  if (answer === correctAnswer) {
    const pointsEarned = Math.floor(player.score * bet);
    player.score += Math.max(pointsEarned, 1);
    correct = true;
  } else {
    const pointsLost = Math.floor(player.score * bet);
    player.score -= pointsLost;
    if (player.score < 1) player.score = 1;
  }

  player.correct = correct;

  // Check for a winner
  let winner = null;
  if (player.score > 50) {
    winner = player.name;
  }

  broadcastPlayers();

  res.json({ correct, winner });
});

// Start the server
app.listen(3000, () => {
  console.log('Backend server running at http://localhost:3000');
});
