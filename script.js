// Imports
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import {
  createBoard,
  revealTile,
  checkWin,
  checkLose,
  resetCount,
} from "./minesweeper.js"

// Global Variables
const BOARD_SIZE = 18
const NUMBER_OF_CORRECT = 146
var board

// HTML elements
var boardElement = document.querySelector(".board")
const reset = document.querySelector(".button-30")

// Initialize game
reset.addEventListener("click", () => {
  resetGame();
})
resetGame();

function checkGameEnd() {
  const win = checkWin(NUMBER_OF_CORRECT)
  const lose = checkLose(board)

  // Shows reset button if game is won or lost
  if (win || lose) {
    reset.style.display = "block";
  }

  // Win animation
  if (win) {
    confetti();
  }
}

function resetGame() {

  // Resets count and hides reset button
  resetCount();
  reset.style.display = "none";

  // Removes all tiles
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  // Create a new board & enables clicking on tiles
  board = createBoard(BOARD_SIZE, NUMBER_OF_CORRECT)
  board.forEach(row => {
    row.forEach(tile => {
      boardElement.append(tile.element)
      tile.element.addEventListener("click", () => {
        revealTile(board, tile)
        checkGameEnd()
      })
    })
  })
  boardElement.style.setProperty("--size", BOARD_SIZE)
}
