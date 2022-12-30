const tiles = document.querySelectorAll(".tile"); // grabbing all the tiles of the board
const PLAYER_X = "X"; // defining player X
const PLAYER_O = "O"; // defining player O
let turn = PLAYER_X; // tracking whose turn it is and starting with player X

const boardState = Array(tiles.length); 
boardState.fill(null); // setting all 9 values on the board to null to start

//Getting our HTML Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
let xo = document.querySelector(".XO");

playAgain.addEventListener("click", startNewGame); 

tiles.forEach((tile) => tile.addEventListener("click", tileClick)); // for each tile, when clicked, we will call the function below

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) { // checks if the game is over (bc of visible game over box). if not, move on to play
    return;
  }

  const tile = event.target; // accesses the tile clicked
  const tileNumber = tile.dataset.index; // tells us which tile was clicked
  if (tile.innerText != "") { // checking if the tile has already been filled
    return;
  }

  if (turn === PLAYER_X) { // setting up the alternating turns
    tile.innerText = PLAYER_X;
    boardState[tileNumber] = PLAYER_X;
    xo.innerHTML = "O";
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber] = PLAYER_O;
    xo.innerHTML = "X";
    turn = PLAYER_X;
  }

  checkWinner(); // calling the function below that checks for a winner after each click
}

function checkWinner() {

  for (const winningCombination of winningCombinations) { // looping over all the winning combinations array
    
    const { combo, strikeClass } = winningCombination; // extracting a combo and strike class from our winning combinations combinations array
    const tileValue0 = boardState[combo[0]];
    const tileValue1 = boardState[combo[1]];
    const tileValue2 = boardState[combo[2]];

    if (
      tileValue0 != null &&
      tileValue0 === tileValue1 &&
      tileValue0 === tileValue2
    ) {
      strike.classList.add(strikeClass); // adding strike class for the winning combination
      gameOverScreen(tileValue0); // calling function below to pull up Winner box
      return; // once a winner is found, it'll be declared instead of going on to check that all spaces are filled and declared as a draw
    }
  }

  //Check for a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null); // if every tile is filled in, show game over screen
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Player ${winnerText} Wins!`;
  }
  gameOverArea.className = "visible"; // hidden class is replaced by visible now that there is a winner
  gameOverText.innerText = text;
}

function startNewGame() {
  strike.className = "strike"; // clearing the strike line
  gameOverArea.className = "hidden"; // hiding the game over area again
  boardState.fill(null); // refilling tiles as null and empty
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X; // resetting to Player X
  xo.innerHTML = "X"
}

const winningCombinations = [
  //rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  //columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

