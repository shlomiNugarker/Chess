const KING_WHITE = '♔'
const KING_BLACK = '♚'

const BISHOP_WHITE = '♗'
const BISHOP_BLACK = '♝'

const PAWN_WHITE = '♙'
const PAWN_BLACK = '♟'

const QUEEN_WHITE = '♕'
const QUEEN_BLACK = '♛'

const ROOK_WHITE = '♖'
const ROOK_BLACK = '♜'

const KNIGHT_WHITE = '♘'
const KNIGHT_BLACK = '♞'

let gGame = {
  isOn: false,
  isBlackTurn: false,
}

let gBoard: string[][]
let gSelectedElCell: HTMLElement | Element | null = null

// for castling
let isLeftWhiteRookMoved = false
let isRightWhiteRookMoved = false

let isLeftBlackRookMoved = false
let isRighBlackeRookMoved = false

let isWhiteKingMoved = false
let isBlackKingMoved = false

window.onload = function () {
  console.log('init')
  init()
}

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
    // console.log('ev.target.id: ', ev.target)
    const cellCoord = getCellCoord(ev.target.id)
    const piece = gBoard[cellCoord.i][cellCoord.j]
    if (ev.target.classList.contains('eatable') && gSelectedElCell) {
      movePiece(gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    if (ev.target.classList.contains('castling') && gSelectedElCell) {
      doCastling(gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    if (!isColorPieceWorthCurrPlayerColor(piece) && piece !== '') return
    if (ev.target.classList.contains('selected')) {
      ev.target.classList.remove('selected')
      gSelectedElCell = null
      cleanBoard()
      return
    }
    if (ev.target.classList.contains('mark') && gSelectedElCell) {
      movePiece(gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    cleanBoard()
    ev.target.classList.add('selected')
    gSelectedElCell = ev.target
    let possibleCoords: { i: number; j: number }[] = []
    switch (piece) {
      case KING_WHITE:
      case KING_BLACK:
        possibleCoords = getAllPossibleCoordsKing(cellCoord)
        break
      case QUEEN_WHITE:
      case QUEEN_BLACK:
        possibleCoords = getAllPossibleCoordsQueen(cellCoord)
        break
      case ROOK_BLACK:
      case ROOK_WHITE:
        possibleCoords = getAllPossibleCoordsRook(cellCoord)
        break
      case BISHOP_BLACK:
      case BISHOP_WHITE:
        possibleCoords = getAllPossibleCoordsBishop(cellCoord)
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

function doCastling(elFromCell: HTMLElement | Element, elToCell: Element) {
  const fromCoord = getCellCoord(elFromCell.id)
  const toCoord = getCellCoord(elToCell.id)

  if (
    gBoard[toCoord.i][toCoord.j] === KING_WHITE
    //  ||
    // gBoard[toCoord.i][toCoord.j] === ROOK_WHITE
  ) {
    const rookPiece = gBoard[fromCoord.i][fromCoord.j]
    const kingPiece = gBoard[toCoord.i][toCoord.j]

    gBoard[fromCoord.i][fromCoord.j] = ''
    gBoard[toCoord.i][toCoord.j] = ''

    if (
      fromCoord.j === 0
      // || toCoord.j === 4
    ) {
      gBoard[7][2] = rookPiece
      gBoard[7][3] = kingPiece
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-7-3`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-7-2`) as HTMLElement).innerText =
        kingPiece

      switchTurn()
    } else if (
      fromCoord.j === 7
      // || toCoord.j === 4
    ) {
      gBoard[7][6] = rookPiece
      gBoard[7][5] = kingPiece
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-7-6`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-7-5`) as HTMLElement).innerText =
        kingPiece

      switchTurn()
    }
  }

  if (gBoard[toCoord.i][toCoord.j] === KING_BLACK) {
    const rookPiece = gBoard[fromCoord.i][fromCoord.j]
    const kingPiece = gBoard[toCoord.i][toCoord.j]

    gBoard[fromCoord.i][fromCoord.j] = ''
    gBoard[toCoord.i][toCoord.j] = ''

    if (fromCoord.j === 0) {
      gBoard[0][2] = rookPiece
      gBoard[0][3] = kingPiece
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-0-3`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-0-2`) as HTMLElement).innerText =
        kingPiece

      switchTurn()
    } else if (fromCoord.j === 7) {
      gBoard[0][6] = rookPiece
      gBoard[0][5] = kingPiece
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-0-6`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-0-5`) as HTMLElement).innerText =
        kingPiece

      switchTurn()
    }
  }
}

function isColorPieceWorthCurrPlayerColor(piece: string) {
  return gGame.isBlackTurn === isBlackPiece(piece)
}

function isBlackPiece(piece: string): boolean | undefined {
  switch (piece) {
    case KING_WHITE:
      return false

    case BISHOP_WHITE:
      return false

    case PAWN_WHITE:
      return false

    case QUEEN_WHITE:
      return false

    case ROOK_WHITE:
      return false

    case KNIGHT_WHITE:
      return false

    case KING_BLACK:
      return true

    case BISHOP_BLACK:
      return true

    case PAWN_BLACK:
      return true

    case QUEEN_BLACK:
      return true

    case ROOK_BLACK:
      return true

    case KNIGHT_BLACK:
      return true

    default:
      return undefined
  }
}

function markCells(coords: { i: number; j: number }[]) {
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    let elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    if (!elCell) return

    if (isColorPieceWorthCurrPlayerColor(gBoard[coord.i][coord.j])) {
      elCell.classList.add('castling')
    } else if (gBoard[coord.i][coord.j]) {
      elCell.classList.add('eatable')
    } else {
      elCell.innerHTML = '<span class="span"></span>'
      elCell.classList.add('mark')
    }
  }
}

function getAllPossibleCoordsKing(pieceCoord: { i: number; j: number }) {
  let res: { i: number; j: number }[] = []

  const possibleSteps = [
    { i: -1, j: 0 },
    { i: 0, j: 1 },
    { i: -1, j: 1 },
    { i: -1, j: -1 },
    { i: 0, j: -1 },
    { i: 1, j: 0 },
    { i: 1, j: -1 },
    { i: 1, j: 1 },
  ]

  for (let k = 0; k < possibleSteps.length; k++) {
    const diffI = possibleSteps[k].i
    const diffJ = possibleSteps[k].j
    const nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (isEmptyCell(nextCoord)) res.push(nextCoord)
      else {
        const piece = gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //push eatable coord
      }
    }
  }

  // mark fake tds for cadtling:
  let selectedCellCoord
  if (gSelectedElCell) {
    selectedCellCoord = getCellCoord(gSelectedElCell.id)
  }

  if (
    selectedCellCoord &&
    gBoard[selectedCellCoord.i][selectedCellCoord.j] === KING_WHITE
  ) {
    let elCell: HTMLElement | Element | null = null
    if (!gBoard[selectedCellCoord.i][selectedCellCoord.j + 2]) {
      elCell = document.querySelector(
        `#cell-${selectedCellCoord.i}-${selectedCellCoord.j + 3}`
      )
      // ;(elCell as HTMLElement).innerHTML = '<span class="span"></span>'
      ;(elCell as HTMLElement).classList.add('castling')
    }
  }

  return res
}

function getAllPossibleCoordsQueen(pieceCoord: { i: number; j: number }) {
  let res: { i: number; j: number }[] = []

  const possibleDir = [
    // Bishop:
    { i: 1, j: -1 }, //bottomLeft
    { i: 1, j: 1 }, //bottomRight
    { i: -1, j: -1 }, //topLeft
    { i: -1, j: 1 }, //topRight
    // Rook:
    { i: -1, j: 0 }, //to top
    { i: 1, j: 0 }, // to bottom
    { i: 0, j: 1 }, // to right
    { i: 0, j: -1 }, // to left
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      const diffI = i * possibleDir[k].i
      const diffJ = i * possibleDir[k].j

      const nextCoord = {
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
        const piece = gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //last coord -> eatable
        break
      }
    }
  }

  return res
}

function getAllPossibleCoordsRook(pieceCoord: { i: number; j: number }) {
  let res: { i: number; j: number }[] = []

  const possibleDir = [
    { i: -1, j: 0 }, //to top
    { i: 1, j: 0 }, // to bottom
    { i: 0, j: 1 }, // to right
    { i: 0, j: -1 }, // to left
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      const diffI = i * possibleDir[k].i
      const diffJ = i * possibleDir[k].j

      const nextCoord = {
        i: pieceCoord.i + diffI,
        j: pieceCoord.j + diffJ,
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
        const piece = gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece))
          res.push(nextCoord) //last coord -> eatable
        else if (
          isColorPieceWorthCurrPlayerColor(piece) &&
          isOptionToCastling(piece)
        ) {
          console.log('casling')
          res.push(nextCoord)
        }
        break
      }
    }
  }

  return res
}

function isOptionToCastling(pieceToCastling: string) {
  if (!gSelectedElCell) return
  const cellCoord = getCellCoord(gSelectedElCell.id)
  const currPiece = gBoard[cellCoord.i][cellCoord.j]
  if (
    (pieceToCastling === KING_WHITE && currPiece === ROOK_WHITE) ||
    (pieceToCastling === ROOK_WHITE && currPiece === KING_WHITE) ||
    (pieceToCastling === KING_BLACK && currPiece === ROOK_BLACK) ||
    (pieceToCastling === ROOK_BLACK && currPiece === KING_BLACK)
  ) {
    return true
  }
  return
}

function getAllPossibleCoordsBishop(pieceCoord: { i: number; j: number }) {
  let res: { i: number; j: number }[] = []

  const possibleDir = [
    { i: 1, j: -1 }, //bottomLeft
    { i: 1, j: 1 }, //bottomRight
    { i: -1, j: -1 }, //topLeft
    { i: -1, j: 1 }, //topRight
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      const diffI = i * possibleDir[k].i
      const diffJ = i * possibleDir[k].j

      const nextCoord = {
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
        const piece = gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //last coord -> eatable
        break
      }
    }
  }
  return res
}

function getAllPossibleCoordsKnight(pieceCoord: { i: number; j: number }) {
  let res: { i: number; j: number }[] = []

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
    const nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (isEmptyCell(nextCoord)) res.push(nextCoord)
      else {
        const piece = gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //-> eatable  coord
      }
    }
  }
  return res
}

function getAllPossibleCoordsPawn(
  pieceCoord: { i: number; j: number },
  isWhite: boolean
) {
  let res: { i: number; j: number }[] = []

  let diff = isWhite ? -1 : 1
  let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
  if (isEmptyCell(nextCoord)) res.push(nextCoord)

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2
    nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
    if (isEmptyCell(nextCoord)) res.push(nextCoord)
  }

  if (isWhite && pieceCoord.i !== 6) {
    // eatable:
    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
    if (
      // if is there piece a & the piece is not mine
      gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }
    if (
      gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  } else if (!isWhite && pieceCoord.i !== 1) {
    // eatable:
    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 }
    if (
      gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 }
    if (
      gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  }

  return res
}

function getCellCoord(strCellId: string) {
  const parts = strCellId.split('-')
  const coord = { i: +parts[1], j: +parts[2] }
  return coord
}

function isEmptyCell(coord: { i: number; j: number }) {
  return gBoard[coord.i][coord.j] === ''
}

function movePiece(
  elFromCell: HTMLElement | Element,
  elToCell: HTMLElement | Element
) {
  const fromCoord = getCellCoord(elFromCell.id)
  const toCoord = getCellCoord(elToCell.id)

  if (gBoard[toCoord.i][toCoord.j]) {
    console.log('eating !', gBoard[toCoord.i][toCoord.j])
  }

  // update the MODEL
  const piece = gBoard[fromCoord.i][fromCoord.j]
  gBoard[fromCoord.i][fromCoord.j] = ''
  gBoard[toCoord.i][toCoord.j] = piece
  // update the DOM
  ;(elFromCell as HTMLElement).innerText = ''
  ;(elToCell as HTMLElement).innerText = piece

  switchTurn()
}

function cleanBoard() {
  const elTds = document.querySelectorAll(
    '.mark, .selected, .eatable, .castling'
  )
  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected', 'eatable', 'castling')
  }
}

function restartGame() {
  gBoard = buildBoard()
  renderBoard(gBoard)
}

function switchTurn() {
  gGame.isBlackTurn = !gGame.isBlackTurn

  if (gGame.isBlackTurn) {
    document.querySelector('.turn-white')?.classList.remove('playing')
    document.querySelector('.turn-black')?.classList.add('playing')
  } else {
    document.querySelector('.turn-black')?.classList.remove('playing')
    document.querySelector('.turn-white')?.classList.add('playing')
  }
}

function renderBoard(board: string[][]) {
  let strHtml = ''
  for (let i = 0; i < board.length; i++) {
    const row = board[i]
    strHtml += '<tr>'
    for (let j = 0; j < row.length; j++) {
      const cell = row[j]
      // figure class name
      const className = (i + j) % 2 === 0 ? 'white' : 'black'
      const tdId = `cell-${i}-${j}`

      strHtml += `<td id="${tdId}" data-i="${i}" data-j="${j}" class="${className} td" >
                    ${cell}
                  </td>`
    }
    strHtml += '</tr>'
  }
  const elMat = document.querySelector('table')
  if (elMat) elMat.innerHTML = strHtml
}

function buildBoard(): string[][] {
  //build the board 8 * 8
  const board: string[][] = []
  for (let i = 0; i < 8; i++) {
    board[i] = []
    for (let j = 0; j < 8; j++) {
      let piece = ''
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
