import { IgState } from './app'
import { paintKingCellToRed } from './board'
import { getAllPossibleCoordsBishop } from './possibleCoordsFuncs/getAllPossibleCoordsBishop'
import { getAllPossibleCoordsKnight } from './possibleCoordsFuncs/getAllPossibleCoordsKnight'
import { getAllPossibleCoordsQueen } from './possibleCoordsFuncs/getAllPossibleCoordsQueen'
import { getAllPossibleCoordsRook } from './possibleCoordsFuncs/getAllPossibleCoordsRook'
import { getAllPossibleKingCoordsToGetEatenPawn } from './possibleCoordsFuncs/getAllPossibleKingCoordsToGetEatenPawn'

export function checkIfKingThreatened(
  board: string[][],
  stateToCheck: IgState,
  isFakeCheck = false
) {
  let isFoundThreatenPiece = false

  let kingPos = stateToCheck.isBlackTurn
    ? stateToCheck.kingPos.black
    : stateToCheck.kingPos.white

  const knightOpts = getAllPossibleCoordsKnight(kingPos, board)
  const queenOpts = getAllPossibleCoordsQueen(kingPos, board, true)
  const pawnOpts = getAllPossibleKingCoordsToGetEatenPawn(kingPos, stateToCheck)
  const bishopOpts = getAllPossibleCoordsBishop(kingPos, board)
  const rookOpts = getAllPossibleCoordsRook(kingPos, board)

  !isFoundThreatenPiece &&
    queenOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = stateToCheck.isBlackTurn
        ? stateToCheck.gPieces.QUEEN_WHITE
        : stateToCheck.gPieces.QUEEN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    knightOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = stateToCheck.isBlackTurn
        ? stateToCheck.gPieces.KNIGHT_WHITE
        : stateToCheck.gPieces.KNIGHT_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    pawnOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = stateToCheck.isBlackTurn
        ? stateToCheck.gPieces.PAWN_WHITE
        : stateToCheck.gPieces.PAWN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    bishopOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = stateToCheck.isBlackTurn
        ? stateToCheck.gPieces.BISHOP_WHITE
        : stateToCheck.gPieces.BISHOP_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    rookOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = stateToCheck.isBlackTurn
        ? stateToCheck.gPieces.ROOK_WHITE
        : stateToCheck.gPieces.ROOK_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  if (!isFoundThreatenPiece) {
    if (!isFakeCheck) {
      stateToCheck.isBlackTurn
        ? (stateToCheck.isBlackKingThreatened = false)
        : (stateToCheck.isWhiteKingThreatened = false)

      document.querySelector('.red')?.classList.remove('red')
    }
    return false
  }
  if (!isFakeCheck) {
    stateToCheck.isBlackTurn
      ? (stateToCheck.isBlackKingThreatened = true)
      : (stateToCheck.isWhiteKingThreatened = true)
  }

  return true
}
