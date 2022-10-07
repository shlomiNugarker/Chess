import { gState, isColorPieceWorthCurrPlayerColor } from './app'

export function buildBoard(): string[][] {
  //build the board 8 * 8
  const board: string[][] = []
  for (let i = 0; i < 8; i++) {
    board[i] = []
    for (let j = 0; j < 8; j++) {
      let piece = ''
      if (i === 1) piece = gState.gPieces.PAWN_BLACK
      if (i === 6) piece = gState.gPieces.PAWN_WHITE
      board[i][j] = piece
    }
  }

  board[0][0] = board[0][7] = gState.gPieces.ROOK_BLACK
  board[0][1] = board[0][6] = gState.gPieces.KNIGHT_BLACK
  board[0][2] = board[0][5] = gState.gPieces.BISHOP_BLACK
  board[0][3] = gState.gPieces.QUEEN_BLACK
  board[0][4] = gState.gPieces.KING_BLACK

  board[7][0] = board[7][7] = gState.gPieces.ROOK_WHITE
  board[7][1] = board[7][6] = gState.gPieces.KNIGHT_WHITE
  board[7][2] = board[7][5] = gState.gPieces.BISHOP_WHITE
  board[7][3] = gState.gPieces.QUEEN_WHITE
  board[7][4] = gState.gPieces.KING_WHITE

  // console.table(board)
  return board
}

export function renderBoard(board: string[][]) {
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

export function cleanBoard() {
  const elTds = document.querySelectorAll(
    '.mark, .selected, .eatable, .castling'
  )
  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected', 'eatable', 'castling')
  }
}

export function markCells(coords: { i: number; j: number }[]) {
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    let elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    if (!elCell) return

    if (isColorPieceWorthCurrPlayerColor(gState.gBoard[coord.i][coord.j])) {
      elCell.classList.add('castling')
    } else if (gState.gBoard[coord.i][coord.j]) {
      elCell.classList.add('eatable')
    } else {
      elCell.innerHTML = '<span class="span"></span>'
      elCell.classList.add('mark')
    }
  }
}
