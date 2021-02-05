//Variables of the pieces
const X_PIECE = 'x'
const CIRCLE_PIECE = 'circle'

//DOM
const cellElements = document.querySelectorAll('[data-cell]')
const gameboard = document.getElementById('gameBoard')
const resultingMessageElement = document.getElementById('resultingMessage')
const resultingMessageTextElement = document.querySelector('[data-resulting-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn

//Variable to determine all the possible winning combinations within the game
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

//Initiating the game to begin
beginGame()

restartButton.addEventListener('click', beginGame)

function beginGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_PIECE)
    cell.classList.remove(CIRCLE_PIECE)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  resultingMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentPiece = circleTurn ? CIRCLE_PIECE : X_PIECE
  placeMark(cell, currentPiece)
  if (checkWin(currentPiece)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    switchTurns()
    setBoardHoverClass()
  }
}

function setBoardHoverClass() {
  gameboard.classList.remove(X_PIECE)
  gameboard.classList.remove(CIRCLE_PIECE)
  if (circleTurn) {
    gameboard.classList.add(CIRCLE_PIECE)
  } else {
    gameboard.classList.add(X_PIECE)
  }
}

function placeMark(cell, currentPiece) {
  cell.classList.add(currentPiece)
}

function switchTurns() {
  circleTurn = !circleTurn
}

function endGame(draw) {
  if (draw) {
    resultingMessageTextElement.innerText = 'Draw!'
  } else {
    resultingMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  resultingMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_PIECE) || cell.classList.contains(CIRCLE_PIECE)
  })
}

function checkWin(currentPiece) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentPiece)
    })
  })
}