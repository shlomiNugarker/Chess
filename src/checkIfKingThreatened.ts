import { gState, IgState } from './app'
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
    : gState.kingPos.white

  const knightOpts = getAllPossibleCoordsKnight(kingPos, board)
  const queenOpts = getAllPossibleCoordsQueen(kingPos, board, true)
  const pawnOpts = getAllPossibleKingCoordsToGetEatenPawn(kingPos)
  const bishopOpts = getAllPossibleCoordsBishop(kingPos, board)
  const rookOpts = getAllPossibleCoordsRook(kingPos, board)

  // const allCords = {
  //   knightOpts,
  //   queenOpts,
  //   pawnOpts,
  //   bishopOpts,
  //   rookOpts,
  // }

  // console.log(allCords)

  !isFoundThreatenPiece &&
    queenOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = gState.isBlackTurn
        ? gState.gPieces.QUEEN_WHITE
        : gState.gPieces.QUEEN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        console.log(pieceToCheck, '===', threatenPiece)
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    knightOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = gState.isBlackTurn
        ? gState.gPieces.KNIGHT_WHITE
        : gState.gPieces.KNIGHT_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        console.log(pieceToCheck, '===', threatenPiece)
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    pawnOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = gState.isBlackTurn
        ? gState.gPieces.PAWN_WHITE
        : gState.gPieces.PAWN_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        console.log(pieceToCheck, '===', threatenPiece)
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    bishopOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = gState.isBlackTurn
        ? gState.gPieces.BISHOP_WHITE
        : gState.gPieces.BISHOP_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        console.log(pieceToCheck, '===', threatenPiece)
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  !isFoundThreatenPiece &&
    rookOpts.forEach((coord) => {
      const pieceToCheck = board[coord.i][coord.j]
      const threatenPiece = gState.isBlackTurn
        ? gState.gPieces.ROOK_WHITE
        : gState.gPieces.ROOK_BLACK

      if (pieceToCheck && pieceToCheck === threatenPiece) {
        console.log(pieceToCheck, '===', threatenPiece)
        isFoundThreatenPiece = true
        !isFakeCheck && paintKingCellToRed(kingPos)
      }
    })

  if (!isFoundThreatenPiece) {
    if (!isFakeCheck) {
      gState.isBlackTurn
        ? (gState.isBlackKingThreatened = false)
        : (gState.isWhiteKingThreatened = false)

      document.querySelector('.red')?.classList.remove('red')
    }
    return false
  }
  if (!isFakeCheck) {
    gState.isBlackTurn
      ? (gState.isBlackKingThreatened = true)
      : (gState.isWhiteKingThreatened = true)
  }

  return true
}
