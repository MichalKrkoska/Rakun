// Variable for correct positions
var count
var required_correct
// Tile status
export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  CORRECT: "correct"
}

// Creates a new board
export function createBoard(boardSize, numberOfCorrect) {
  required_correct = numberOfCorrect
  const board = []
  const correctPositions = getCorrectPositions()

  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div")
      element.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        element,
        x,
        y,
        correct: correctPositions.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        },
      }
      row.push(tile)
    }
    board.push(row)
  }
  return board
}

// Reveals the tile
export function revealTile(board, tile) {
  // Returns if tile is already revealed or the game is over
  if (tile.status !== TILE_STATUSES.HIDDEN || checkWin(required_correct) || checkLose(board)) {
    return
  }
  console.log(count)
  console.log(count)
  if (tile.correct) {
    tile.status = TILE_STATUSES.CORRECT
    count++
    return
  }
  else{
    tile.status = TILE_STATUSES.MINE
    return
  }
}

// Checks if the game is won
export function checkWin() {
  return count >= required_correct;
}

export function checkLose(board) {
  return board.some(row => {
    return row.some(tile => {
      return tile.status === TILE_STATUSES.MINE
    })
  })
}

export function resetCount(board) {
  count = 0
}

// Returns an array of correct positions (Rakun logo)
function getCorrectPositions() {
  const positions = [{x: 0, y: 3}, {x: 0, y: 4},{x: 0, y: 13},{x: 0, y: 14},
    {x: 1, y: 2},{x: 1, y: 5},{x: 1, y: 12},{x: 1, y: 15},
    {x: 2, y: 1},{x: 2, y: 4},{x: 2, y: 6},{x: 2, y: 11},{x: 2, y: 14},{x: 2, y: 16},
    {x: 3, y: 1},{x: 3, y: 3},{x: 3, y: 4},{x: 3, y: 6},{x: 3, y: 7},{x: 3, y: 8},{x: 3, y: 9},{x: 3, y:10},{x: 3, y:13},{x: 3, y:14},{x: 3, y:16},
    {x: 4, y: 1},{x: 4, y: 3},{x: 4, y: 4},{x: 4, y: 12},{x: 4, y: 13},{x: 4, y: 14},{x: 4, y: 16},
    {x: 5, y: 1},{x: 5, y: 4},{x: 5, y: 8},{x: 5, y: 12},{x: 5, y: 13},{x: 5, y: 16},
    {x: 6, y: 2},{x: 6, y: 8},{x: 6, y: 17},
    {x: 7, y: 2},{x: 7, y: 7},{x: 7, y: 8},{x: 7, y: 9},{x: 7, y: 17},
    {x: 8, y: 1},{x: 8, y: 4},{x: 8, y: 5},{x: 8, y: 6},{x: 8, y: 7},{x: 8, y: 8},{x: 8, y: 9},{x: 8, y: 10},{x: 8, y: 11},{x: 8, y: 17},
    {x: 9, y: 0},{x: 9, y: 3},{x: 9, y: 4},{x: 9, y: 5},{x: 9, y: 6},{x: 9, y: 7},{x: 9, y: 8},{x: 9, y: 9},{x: 9, y: 10},{x: 9, y: 11},{x: 9, y: 12},{x: 9, y: 13},{x: 9, y: 17},
    {x: 10, y: 0},{x: 10, y: 1},{x: 10, y: 2},{x: 10, y: 3},{x: 10, y: 4},{x: 10, y: 5},{x: 10, y: 6},{x: 10, y: 7},{x: 10, y: 8},{x: 10, y: 9},{x: 10, y: 10},{x: 10, y: 11},{x: 10, y: 12},{x: 10, y: 13},{x: 10, y: 14},{x: 10, y: 15},{x: 10, y: 17},
    {x: 11, y: 0},{x: 11, y: 1},{x: 11, y: 2},{x: 11, y: 3},{x: 11, y: 4},{x: 11, y: 5},{x: 11, y: 6},{x: 11, y: 7},{x: 11, y: 8},{x: 11, y: 9},{x: 11, y: 10},{x: 11, y: 11},{x: 11, y: 12},{x: 11, y: 13},{x: 11, y: 14},{x: 11, y: 15},{x: 11, y: 16},
    {x: 12, y: 0},{x: 12, y: 1},{x: 12, y: 2},{x: 12, y: 3},{x: 12, y: 4},{x: 12, y: 5},{x: 12, y: 9},{x: 12, y: 10},{x: 12, y: 11},{x: 12, y: 12},{x: 12, y: 13},{x: 12, y: 14},{x: 12, y: 15},{x: 12, y: 16},
    {x: 13, y: 1},{x: 13, y: 2},{x: 13, y: 3},{x: 13, y: 4},{x: 13, y: 10},{x: 13, y: 11},{x: 13, y: 12},{x: 13, y: 13},{x: 13, y: 14},
    {x: 14, y: 3},{x: 14, y: 4},{x: 14, y: 6},{x: 14, y: 7},{x: 14, y: 8},{x: 14, y: 11},{x: 14, y: 12},
    {x: 15, y: 4},{x: 15, y: 5},{x: 15, y: 6},{x: 15, y: 7},{x: 15, y: 8},{x: 15, y: 10},
    {x: 16, y: 5},{x: 16, y: 6},{x: 16, y: 7},{x: 16, y: 9},
    {x: 17, y: 6},{x: 17, y: 7},{x: 17, y: 8}
  ]
  return positions
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}
