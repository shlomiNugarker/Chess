import { cleanBoard, markCells } from './board'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKing } from './possibleCoordsFuncs/getAllPossibleCoordsKing'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsPawn } from './possibleCoordsFuncs/getAllPossibleCoordsPawn'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'

import {
  isColorPieceWorthCurrPlayerColor,
  gState,
  isBlackPiece,
  isNextStepLegal,
} from './app'
import { checkIfKingThreatened } from './checkIfKingThreatened'

function doCastling(elFromCell: HTMLElement | Element, elToCell: Element) {
  console.log(elFromCell, elToCell)

  // const fromCoord = getCellCoord(elFromCell.id)
  // const toCoord = getCellCoord(elToCell.id)
  // if (
  //   gState.gBoard[toCoord.i][toCoord.j] === gState.gPieces.KING_WHITE
  //   //  ||
  //   // gBoard[toCoord.i][toCoord.j] === ROOK_WHITE
  // ) {
  //   const rookPiece = gState.gBoard[fromCoord.i][fromCoord.j]
  //   const kingPiece = gState.gBoard[toCoord.i][toCoord.j]
  //   gState.gBoard[fromCoord.i][fromCoord.j] = ''
  //   gState.gBoard[toCoord.i][toCoord.j] = ''
  //   if (
  //     fromCoord.j === 0
  //     // || toCoord.j === 4
  //   ) {
  //     gState.gBoard[7][2] = rookPiece
  //     gState.gBoard[7][3] = kingPiece
  //     // // update the DOM
  //     ;(elFromCell as HTMLElement).innerText = ''
  //     ;(elToCell as HTMLElement).innerText = ''
  //     ;(document.querySelector(`#cell-7-3`) as HTMLElement).innerText =
  //       rookPiece
  //     ;(document.querySelector(`#cell-7-2`) as HTMLElement).innerText =
  //       kingPiece
  //     switchTurn()
  //   } else if (
  //     fromCoord.j === 7
  //     // || toCoord.j === 4
  //   ) {
  //     gState.gBoard[7][6] = rookPiece
  //     gState.gBoard[7][5] = kingPiece
  //     // // update the DOM
  //     ;(elFromCell as HTMLElement).innerText = ''
  //     ;(elToCell as HTMLElement).innerText = ''
  //     ;(document.querySelector(`#cell-7-6`) as HTMLElement).innerText =
  //       rookPiece
  //     ;(document.querySelector(`#cell-7-5`) as HTMLElement).innerText =
  //       kingPiece
  //     switchTurn()
  //   }
  // }
  // if (gState.gBoard[toCoord.i][toCoord.j] === gState.gPieces.KING_BLACK) {
  //   const rookPiece = gState.gBoard[fromCoord.i][fromCoord.j]
  //   const kingPiece = gState.gBoard[toCoord.i][toCoord.j]
  //   gState.gBoard[fromCoord.i][fromCoord.j] = ''
  //   gState.gBoard[toCoord.i][toCoord.j] = ''
  //   if (fromCoord.j === 0) {
  //     gState.gBoard[0][2] = rookPiece
  //     gState.gBoard[0][3] = kingPiece
  //     // // update the DOM
  //     ;(elFromCell as HTMLElement).innerText = ''
  //     ;(elToCell as HTMLElement).innerText = ''
  //     ;(document.querySelector(`#cell-0-3`) as HTMLElement).innerText =
  //       rookPiece
  //     ;(document.querySelector(`#cell-0-2`) as HTMLElement).innerText =
  //       kingPiece
  //     switchTurn()
  //   } else if (fromCoord.j === 7) {
  //     gState.gBoard[0][6] = rookPiece
  //     gState.gBoard[0][5] = kingPiece
  //     // // update the DOM
  //     ;(elFromCell as HTMLElement).innerText = ''
  //     ;(elToCell as HTMLElement).innerText = ''
  //     ;(document.querySelector(`#cell-0-6`) as HTMLElement).innerText =
  //       rookPiece
  //     ;(document.querySelector(`#cell-0-5`) as HTMLElement).innerText =
  //       kingPiece
  //     switchTurn()
  //   }
  // }
}

export function cellClicked(ev: MouseEvent) {
  if (ev.target instanceof Element) {
    // console.log('ev.target.id: ', ev.target)
    const cellCoord = getCellCoord(ev.target.id)
    const piece = gState.gBoard[cellCoord.i][cellCoord.j]
    const isEvSelected = ev.target.classList.contains('selected')
    const isEvMarked = ev.target.classList.contains('mark')
    const isEvCastling = ev.target.classList.contains('castling')
    const isEvEatable = ev.target.classList.contains('eatable')

    if (isEvEatable && gState.gSelectedElCell) {
      const isMoveLegal = isNextStepLegal(gState.gSelectedElCell, ev.target)

      if (!isMoveLegal) return

      movePiece(gState.gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    if (isEvCastling && gState.gSelectedElCell) {
      doCastling(gState.gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    if (!isColorPieceWorthCurrPlayerColor(piece) && piece !== '') return

    if (isEvSelected) {
      ev.target.classList.remove('selected')
      gState.gSelectedElCell = null
      cleanBoard()
      return
    }
    if (isEvMarked && gState.gSelectedElCell) {
      const isMoveLegal = isNextStepLegal(gState.gSelectedElCell, ev.target)

      if (!isMoveLegal) return

      movePiece(gState.gSelectedElCell, ev.target)
      cleanBoard()
      return
    }
    cleanBoard()
    ev.target.classList.add('selected')
    gState.gSelectedElCell = ev.target

    let possibleCoords = getPossibleCoords(piece, cellCoord)
    markCells(possibleCoords)
  }
}

function getPossibleCoords(
  piece: string,
  cellCoord: {
    i: number
    j: number
  }
) {
  let possibleCoords: { i: number; j: number }[] = []
  switch (piece) {
    case gState.gPieces.KING_WHITE:
    case gState.gPieces.KING_BLACK:
      possibleCoords = getAllPossibleCoordsKing(gState.gBoard, cellCoord)
      break
    case gState.gPieces.QUEEN_WHITE:
    case gState.gPieces.QUEEN_BLACK:
      possibleCoords = getAllPossibleCoordsQueen(cellCoord, gState.gBoard)
      break
    case gState.gPieces.ROOK_BLACK:
    case gState.gPieces.ROOK_WHITE:
      possibleCoords = getAllPossibleCoordsRook(cellCoord, gState.gBoard)
      break
    case gState.gPieces.BISHOP_BLACK:
    case gState.gPieces.BISHOP_WHITE:
      possibleCoords = getAllPossibleCoordsBishop(cellCoord, gState.gBoard)
      break
    case gState.gPieces.KNIGHT_BLACK:
    case gState.gPieces.KNIGHT_WHITE:
      possibleCoords = getAllPossibleCoordsKnight(cellCoord, gState.gBoard)
      break
    case gState.gPieces.PAWN_BLACK:
    case gState.gPieces.PAWN_WHITE:
      possibleCoords = getAllPossibleCoordsPawn(
        cellCoord,
        piece === gState.gPieces.PAWN_WHITE,
        gState.gBoard
      )
      break
  }
  return possibleCoords
}

function movePiece(
  elFromCell: HTMLElement | Element,
  elToCell: HTMLElement | Element
) {
  const fromCoord = getCellCoord(elFromCell.id)
  const toCoord = getCellCoord(elToCell.id)

  const isKingMoved =
    gState.gBoard[fromCoord.i][fromCoord.j] === '♔' ||
    gState.gBoard[fromCoord.i][fromCoord.j] === '♚'

  const isCellWithPiece = gState.gBoard[toCoord.i][toCoord.j]

  if (isCellWithPiece) {
    // Eat !
    const eatenPiece = gState.gBoard[toCoord.i][toCoord.j]
    if (isBlackPiece(eatenPiece) === true) {
      //model
      gState.eatenPieces.white.push(eatenPiece)
      //dom
      document.querySelector(
        '.eaten-pieces-white'
      )!.innerHTML += `<span>${eatenPiece}</span>`
    } else if (isBlackPiece(eatenPiece) === false) {
      //model
      gState.eatenPieces.black.push(eatenPiece)
      //dom
      document.querySelector(
        '.eaten-pieces-black'
      )!.innerHTML += `<span>${eatenPiece}</span>`
    }
  }

  // update the MODEL
  const piece = gState.gBoard[fromCoord.i][fromCoord.j]
  gState.gBoard[fromCoord.i][fromCoord.j] = ''
  gState.gBoard[toCoord.i][toCoord.j] = piece
  // update the DOM
  ;(elFromCell as HTMLElement).innerText = ''
  ;(elToCell as HTMLElement).innerText = piece

  switchTurn()
  if (isKingMoved) updateKingPos(toCoord, piece)

  checkIfKingThreatened(gState.gBoard, gState)
}

export function updateKingPos(
  toCoord: { i: number; j: number },
  piece: string
) {
  if (piece === '♔') {
    gState.kingPos.white = { i: toCoord.i, j: toCoord.j }
  }
  if (piece === '♚') {
    gState.kingPos.black = { i: toCoord.i, j: toCoord.j }
  }
}

export function switchTurn() {
  gState.isBlackTurn = !gState.isBlackTurn
  if (gState.isBlackTurn) {
    document.querySelector('.turn-white')?.classList.remove('playing')
    document.querySelector('.turn-black')?.classList.add('playing')
  } else {
    document.querySelector('.turn-black')?.classList.remove('playing')
    document.querySelector('.turn-white')?.classList.add('playing')
  }
}

export function getCellCoord(strCellId: string) {
  const parts = strCellId.split('-')
  const coord = { i: +parts[1], j: +parts[2] }
  return coord
}

// function restartGame() {
//   gState.gBoard = buildBoard()
//   renderBoard(gBoard)
// }
