var choices = document.querySelectorAll(".choice");
var restartButton = document.getElementById("restart-btn");
var playerScoreDisplay = document.getElementById("player-score");
var computerScoreDisplay = document.getElementById("computer-score");


// Object to keep track of the scores
var scoreboard = {
  player: 0,
  computer: 0
};

// Event listeners for the icons
for (var i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", playGame);
}

// Event listener for the restart-game button
restartButton.addEventListener("click", restartGame);



function playGame(event) {
  restartButton.style.display = "inline-block";
  var playerChoice = event.target.id;
  var computerChoice = getComputerChoice();
  var winner = getWinner(playerChoice, computerChoice);
  console.log(playerChoice, computerChoice, winner);
  updateScore(winner, computerChoice);
}


function getComputerChoice() {
  var randomNumber = Math.random() * 3;
  var computerChoice = "";
  if (randomNumber <= 1)
    computerChoice = "rock";
  else if (randomNumber > 1 && randomNumber <= 2)
    computerChoice = "paper";
  else
    computerChoice = "scissors";
  return computerChoice;
}


function getWinner(playerChoice, computerChoice) {
  var winner = "";
  if (playerChoice === computerChoice)
    winner = "draw";
  else if (playerChoice === "rock") {
    if (computerChoice === "scissors")
      winner = "player";
    else
      winner = "computer";
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock")
      winner = "player";
    else
      winner = "computer";
  } else if (playerChoice === "scissors") {
    if (computerChoice === "paper")
      winner = "player";
    else
      winner = "computer";
  }
  return winner;
}


function updateScore(winner, computerChoice) {
  if (winner === "player") {
    scoreboard.player++;
    playerScoreDisplay.textContent = scoreboard.player;
  } else if (winner === "computer") {
    scoreboard.computer++;
    computerScoreDisplay.textContent = scoreboard.computer;
  }
}


function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  playerScoreDisplay.textContent = scoreboard.player;
  computerScoreDisplay.textContent = scoreboard.computer;
}