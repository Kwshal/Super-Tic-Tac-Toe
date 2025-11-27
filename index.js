let moves = [
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
     Array.from({ length: 9 }, () => null),
]
const superMoves = [
     ...Array.from({ length: 9 }, () => null)
]

const winConditions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
]

let currPlayer = Math.random() > 0.5 ? "x" : "o"
let currPlayerEl = document.getElementById("currPlayer")
currPlayerEl.textContent = currPlayer.toUpperCase()

const board = document.getElementById("board")
const cells = document.querySelectorAll(".cell")
document.getElementById("board").addEventListener('click', placeToken)

function placeToken(e) {
     const el = e.target
     const idx = el.dataset.idx
     if (el.classList.contains('subcell')) {
          const court = el.closest('.cell')
          const courtIdx = +court.dataset.idx
          moves[courtIdx][idx] = currPlayer
          el.textContent = currPlayer
          el.style.pointerEvents = 'none'
          checkWinner(court, courtIdx)
          updateGame(idx)
     }
}

function updateGame(idx) {
     currPlayer = currPlayer === "x" ? "o" : "x"
     currPlayerEl.textContent = currPlayer.toUpperCase()
     cells.forEach(cell => cell.classList.add('inactive'))
     if (cells[idx].firstElementChild.classList.contains('concluded')) {
          const courts = document.querySelectorAll('.cell:not(:has(.concluded))')
          courts.forEach(court => court.classList.remove('inactive'))
     } else cells[idx].classList.remove('inactive')
}

function checkWinner(court, courtIdx) {
     const concluded = checkConclusion(moves[courtIdx], courtIdx)
     if (concluded) {
          court.innerHTML = `<span class="concluded">${concluded.toUpperCase()}</span>`
          const superWinner = checkSuperWinner(superMoves)
          if (superWinner) {
               document.getElementById("win-status").textContent = superWinner
               board.style.pointerEvents = 'none'

          }
     }
}

function checkSuperWinner(arr) {
     for (let i = 0; i < winConditions.length; i++) {
          const [a, b, c] = winConditions[i]
          if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
               return currPlayer.toUpperCase() + ' Wins! 🏆'
          }
     }
     if (arr.length === 9 && arr.every((el) => el === "x" || el === "o")) {
          return "The game is a draw!"
     }
     return false
}

function checkConclusion(arr, courtIdx) {
     for (let i = 0; i < winConditions.length; i++) {
          const [a, b, c] = winConditions[i]
          if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {

               superMoves[courtIdx] = arr[a]

               // console.log(...superMoves)
               return arr[a]
          }
     }
     if (arr.length === 9 && arr.every((el) => el === "x" || el === "o")) {
          return " " // draw, " " (whitespace) is truthy
     }
     return false
}




