'use strick'

const KING_WHITE = '♔'
const QUEEN_WHITE = '♕'
const ROOK_WHITE = '♖'
const BISHOP_WHITE = '♗'
const KNIGHT_WHITE = '♘'
const PAWN_WHITE = '♙'
const KING_BLACK = '♚'
const QUEEN_BLACK = '♛'
const ROOK_BLACK = '♜'
const BISHOP_BLACK = '♝'
const KNIGHT_BLACK = '♞'
const PAWN_BLACK = '♟'

let gGame = {
  isOn: false,
  isBlackTurn: false,
}

var gBoard: string[][]
var gSelectedElCell: HTMLElement | Element | null = null

function init() {
  gBoard = buildBoard()
  renderBoard(gBoard)
  gGame.isOn = true

  const tds: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('.td')

  tds.forEach((el: HTMLTableCellElement) =>
    el.addEventListener('click', cellClicked)
  )
}

function cellClicked(ev: MouseEvent) {
  if (ev.target instanceof Element) {
    if (ev.target.classList.contains('mark') && gSelectedElCell) {
      movePiece(gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    cleanBoard()
    const isSelected = ev.target.classList.contains('selected')

    if (!isSelected) {
      ev.target.classList.add('selected')
      gSelectedElCell = ev.target
    }

    console.log('ev.target.id: ', ev.target.id)
    var cellCoord = getCellCoord(ev.target.id)
    var piece = gBoard[cellCoord.i][cellCoord.j]

    var possibleCoords: { i: number; j: number }[] = []
    switch (piece) {
      case ROOK_BLACK:
      case ROOK_WHITE:
        possibleCoords = getAllPossibleCoordsRook(cellCoord)
        break
      case BISHOP_BLACK:
      case BISHOP_WHITE:
        possibleCoords = getAllPossibleCoordsBishop(
          cellCoord,
          piece === BISHOP_WHITE
        )
        break
      case KNIGHT_BLACK:
      case KNIGHT_WHITE:
        possibleCoords = getAllPossibleCoordsKnight(cellCoord)
        break
      case PAWN_BLACK:
      case PAWN_WHITE:
        possibleCoords = getAllPossibleCoordsPawn(
          cellCoord,
          piece === PAWN_WHITE
        )
        break
    }
    markCells(possibleCoords)
  }
}

function markCells(coords: { i: number; j: number }[]) {
  for (var i = 0; i < coords.length; i++) {
    var coord = coords[i]
    var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    if (!elCell) return
    elCell.innerHTML = '<span class="span"></span>'
    elCell.classList.add('mark')
  }
}

function getAllPossibleCoordsRook(pieceCoord: { i: number; j: number }) {
  var res: { i: number; j: number }[] = []
  return res
}

function getAllPossibleCoordsBishop(
  pieceCoord: { i: number; j: number },
  isWhite: boolean
) {
  var res: { i: number; j: number }[] = []

  const possibleDir = [
    { i: 1, j: -1 }, //bottomLeft
    { i: 1, j: 1 }, //bottomRight
    { i: -1, j: -1 }, //topLeft
    { i: -1, j: 1 }, //topRight
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      var diffI = i * possibleDir[k].i
      var diffJ = i * possibleDir[k].j

      var nextCoord = {
        i: pieceCoord.i + diffI,
        j: pieceCoord.j - diffJ,
      }

      if (
        nextCoord.i > 7 ||
        nextCoord.i < 0 ||
        nextCoord.j > 7 ||
        nextCoord.j < 0
      ) {
        break
      }

      if (isEmptyCell(nextCoord)) {
        res.push(nextCoord)
      } else {
        break
      }
    }
  }
  return res
}

function getAllPossibleCoordsKnight(pieceCoord: { i: number; j: number }) {
  var res: { i: number; j: number }[] = []

  const possibleSteps = [
    { i: -2, j: -1 },
    { i: -2, j: 1 },
    { i: -1, j: 2 },
    { i: -1, j: -2 },
    { i: 1, j: -2 },
    { i: 1, j: 2 },
    { i: 2, j: 1 },
    { i: 2, j: -1 },
  ]

  for (let k = 0; k < possibleSteps.length; k++) {
    const diffI = possibleSteps[k].i
    const diffJ = possibleSteps[k].j

    var nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (isEmptyCell(nextCoord)) res.push(nextCoord)
    }
  }
  return res
}

function getAllPossibleCoordsPawn(
  pieceCoord: { i: number; j: number },
  isWhite: boolean
) {
  var res: { i: number; j: number }[] = []

  var diff = isWhite ? -1 : 1
  var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
  if (isEmptyCell(nextCoord)) res.push(nextCoord)
  else return res

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2
    nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
    if (isEmptyCell(nextCoord)) res.push(nextCoord)
  }

  return res
}

function getCellCoord(strCellId: string) {
  var parts = strCellId.split('-')
  var coord = { i: +parts[1], j: +parts[2] }
  return coord
}

function isEmptyCell(coord: { i: number; j: number }) {
  return gBoard[coord.i][coord.j] === ''
}

function movePiece(
  elFromCell: HTMLElement | Element,
  elToCell: HTMLElement | Element
) {
  var fromCoord = getCellCoord(elFromCell.id)
  var toCoord = getCellCoord(elToCell.id)

  // update the MODEL
  var piece = gBoard[fromCoord.i][fromCoord.j]
  gBoard[fromCoord.i][fromCoord.j] = ''
  gBoard[toCoord.i][toCoord.j] = piece
  // update the DOM
  ;(elFromCell as HTMLElement).innerText = ''
  ;(elToCell as HTMLElement).innerText = piece
}

function cleanBoard() {
  var elTds = document.querySelectorAll('.mark, .selected')
  for (var i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected')
  }
}

function restartGame() {
  gBoard = buildBoard()
  renderBoard(gBoard)
}

function renderBoard(board: string[][]) {
  var strHtml = ''
  for (var i = 0; i < board.length; i++) {
    var row = board[i]
    strHtml += '<tr>'
    for (var j = 0; j < row.length; j++) {
      var cell = row[j]
      // figure class name
      var className = (i + j) % 2 === 0 ? 'white' : 'black'
      var tdId = `cell-${i}-${j}`

      strHtml += `<td id="${tdId}" data-i="${i}" data-j="${j}" class="${className} td" >            
                    ${cell}                   
                  </td>`
    }
    strHtml += '</tr>'
  }
  var elMat = document.querySelector('table')
  if (elMat) elMat.innerHTML = strHtml
}

function buildBoard(): string[][] {
  //build the board 8 * 8
  var board: string[][] = []
  for (var i = 0; i < 8; i++) {
    board[i] = []
    for (var j = 0; j < 8; j++) {
      var piece = ''
      if (i === 1) piece = PAWN_BLACK
      if (i === 6) piece = PAWN_WHITE
      board[i][j] = piece
    }
  }

  board[0][0] = board[0][7] = ROOK_BLACK
  board[0][1] = board[0][6] = KNIGHT_BLACK
  board[0][2] = board[0][5] = BISHOP_BLACK
  board[0][3] = QUEEN_BLACK
  board[0][4] = KING_BLACK

  board[7][0] = board[7][7] = ROOK_WHITE
  board[7][1] = board[7][6] = KNIGHT_WHITE
  board[7][2] = board[7][5] = BISHOP_WHITE
  board[7][3] = QUEEN_WHITE
  board[7][4] = KING_WHITE

  // console.table(board)
  return board
}
