var choices = document.querySelectorAll(".choice");
var restartButton = document.getElementById("restart-btn");
var playerScoreDisplay = document.getElementById("player-score");
var computerScoreDisplay = document.getElementById("computer-score");
var computerChoiceIcon = document.getElementById("computer-choice-icon");
var result = document.getElementById("result");
var computerChoiceSpan = document.getElementById("computer-choice");
var modal = document.getElementsByClassName("modal")[0];

// Object to keep track of the scores
var scoreboard = {
  player: 0,
  computer: 0
};

// Play game
function playGame(event) {
  restartButton.style.display = "inline-block";
  var playerChoice = event.target.id;
  var computerChoice = getComputerChoice();
  var winner = getWinner(playerChoice, computerChoice);
  updateScore(winner, computerChoice);
}

// Get computer's choice
function getComputerChoice() {
  var randomNumber = Math.random() * 3;
  var computerChoice = "";
  if (randomNumber <= 1) computerChoice = "rock";
  else if (randomNumber > 1 && randomNumber <= 2) computerChoice = "paper";
  else computerChoice = "scissors";
  return computerChoice;
}

// Get game winner
function getWinner(playerChoice, computerChoice) {
  var winner = "";
  if (playerChoice === computerChoice) winner = "draw";
  else if (playerChoice === "rock") {
    if (computerChoice === "scissors") winner = "player";
    else winner = "computer";
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock") winner = "player";
    else winner = "computer";
  } else if (playerChoice === "scissors") {
    if (computerChoice === "paper") winner = "player";
    else winner = "computer";
  }
  return winner;
}

// Updates the current score according to the winner
function updateScore(winner, computerChoice) {
  if (winner === "player") {
    scoreboard.player++;
    playerScoreDisplay.textContent = scoreboard.player;
    result.textContent = "You Win";
    result.classList.add("text-win");
  } else if (winner === "computer") {
    scoreboard.computer++;
    computerScoreDisplay.textContent = scoreboard.computer;
    result.textContent = "You Lose";
    result.classList.add("text-lose");
  } else {
    result.textContent = "Its a Draw";
  }
  computerChoiceIcon.classList.add("fa-hand-" + computerChoice);
  computerChoiceSpan.innerHTML =
    "<strong>" +
    computerChoice[0].toUpperCase() +
    computerChoice.slice(1) +
    "</strong>";
  modal.style.display = "block";
}

//Restarts the game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  playerScoreDisplay.textContent = scoreboard.player;
  computerScoreDisplay.textContent = scoreboard.computer;
}

function clearModal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    var currentIconClass = computerChoiceIcon.classList.item(2);
    computerChoiceIcon.classList.remove(currentIconClass);
    result.classList.remove("text-lose");
    result.classList.remove("text-win");
  }
}

// Event listeners for the icons
for (var i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", playGame);
}

// Event listener for the restart-game button
restartButton.addEventListener("click", restartGame);

// Event listener for clearing the modal
window.addEventListener("click", clearModal);
