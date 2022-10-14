import { buildBoard, renderBoard } from './board'
import { cellClicked, checkIfKingThreatened, getCellCoord } from './game'

export interface IgState {
  isOn: boolean
  isBlackTurn: boolean
  gBoard: string[][]
  gSelectedElCell: HTMLElement | Element | null
  isWhiteKingThreatened: boolean
  isBlackKingThreatened: boolean
  kingPos: {
    black: { i: number; j: number }
    white: { i: number; j: number }
  }
  eatenPieces: {
    black: string[]
    white: string[]
  }
  gPieces: {
    KING_WHITE: string
    KING_BLACK: string
    BISHOP_WHITE: string
    BISHOP_BLACK: string
    PAWN_WHITE: string
    PAWN_BLACK: string
    QUEEN_WHITE: string
    QUEEN_BLACK: string
    ROOK_WHITE: string
    ROOK_BLACK: string
    KNIGHT_WHITE: string
    KNIGHT_BLACK: string
  }
}

export const gState: IgState = {
  isOn: false,
  isBlackTurn: false,
  gBoard: [],
  gSelectedElCell: null,
  isWhiteKingThreatened: false,
  isBlackKingThreatened: false,
  kingPos: {
    black: { i: 0, j: 4 },
    white: { i: 7, j: 4 },
  },
  eatenPieces: {
    black: [],
    white: [],
  },
  gPieces: {
    KING_WHITE: '♔',
    KING_BLACK: '♚',
    BISHOP_WHITE: '♗',
    BISHOP_BLACK: '♝',
    PAWN_WHITE: '♙',
    PAWN_BLACK: '♟',
    QUEEN_WHITE: '♕',
    QUEEN_BLACK: '♛',
    ROOK_WHITE: '♖',
    ROOK_BLACK: '♜',
    KNIGHT_WHITE: '♘',
    KNIGHT_BLACK: '♞',
  },
}

window.onload = function () {
  init()
}

function init() {
  gState.gBoard = buildBoard()
  renderBoard(gState.gBoard)
  gState.isOn = true

  const tds: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('.td')
  tds.forEach((el: HTMLTableCellElement) =>
    el.addEventListener('click', cellClicked)
  )
}

export function isColorPieceWorthCurrPlayerColor(piece: string) {
  return gState.isBlackTurn === isBlackPiece(piece)
}

export function isOptionToCastling(pieceToCastling: string) {
  if (!gState.gSelectedElCell) return
  const cellCoord = getCellCoord(gState.gSelectedElCell.id)
  const currPiece = gState.gBoard[cellCoord.i][cellCoord.j]
  if (
    (pieceToCastling === gState.gPieces.KING_WHITE &&
      currPiece === gState.gPieces.ROOK_WHITE) ||
    (pieceToCastling === gState.gPieces.ROOK_WHITE &&
      currPiece === gState.gPieces.KING_WHITE) ||
    (pieceToCastling === gState.gPieces.KING_BLACK &&
      currPiece === gState.gPieces.ROOK_BLACK) ||
    (pieceToCastling === gState.gPieces.ROOK_BLACK &&
      currPiece === gState.gPieces.KING_BLACK)
  ) {
    return true
  }
  return false
}

export function isEmptyCell(
  board: string[][],
  coord: { i: number; j: number }
) {
  return board[coord.i][coord.j] === ''
}

export function isBlackPiece(piece: string): boolean | undefined {
  switch (piece) {
    case gState.gPieces.KING_WHITE:
      return false

    case gState.gPieces.BISHOP_WHITE:
      return false

    case gState.gPieces.PAWN_WHITE:
      return false

    case gState.gPieces.QUEEN_WHITE:
      return false

    case gState.gPieces.ROOK_WHITE:
      return false

    case gState.gPieces.KNIGHT_WHITE:
      return false

    case gState.gPieces.KING_BLACK:
      return true

    case gState.gPieces.BISHOP_BLACK:
      return true

    case gState.gPieces.PAWN_BLACK:
      return true

    case gState.gPieces.QUEEN_BLACK:
      return true

    case gState.gPieces.ROOK_BLACK:
      return true

    case gState.gPieces.KNIGHT_BLACK:
      return true

    default:
      return undefined
  }
}

export function isNextStepLegal(
  elFromCell: HTMLElement | Element,
  elToCell: HTMLElement | Element
) {
  const fromCoord = getCellCoord(elFromCell.id)
  const toCoord = getCellCoord(elToCell.id)

  const copiedBoard: string[][] = JSON.parse(JSON.stringify(gState.gBoard))

  const piece = copiedBoard[fromCoord.i][fromCoord.j]
  copiedBoard[fromCoord.i][fromCoord.j] = ''
  copiedBoard[toCoord.i][toCoord.j] = piece

  const isKingThreatened = checkIfKingThreatened(copiedBoard, true)

  return !isKingThreatened
}

// for castling
// let isLeftWhiteRookMoved = false
// let isRightWhiteRookMoved = false

// let isLeftBlackRookMoved = false
// let isRighBlackeRookMoved = false

// let isWhiteKingMoved = false
// let isBlackKingMoved = false
