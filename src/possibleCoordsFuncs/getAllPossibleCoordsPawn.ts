import { isColorPieceWorthCurrPlayerColor, isEmptyCell } from '../app'

export function getAllPossibleCoordsPawn(
  pieceCoord: { i: number; j: number },
  isWhite: boolean,
  board: string[][]
) {
  let res: { i: number; j: number }[] = []

  let diff = isWhite ? -1 : 1
  let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
  if (isEmptyCell(board, nextCoord)) res.push(nextCoord)

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2
    nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
    if (isEmptyCell(board, nextCoord)) res.push(nextCoord)
  }

  if (isWhite) {
    // eatable:
    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
    if (
      // if is there piece a & the piece is not mine
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }
    if (
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  } else if (!isWhite) {
    // eatable:
    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 }
    if (
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 }
    if (
      board[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(board[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  }
  return res
}
