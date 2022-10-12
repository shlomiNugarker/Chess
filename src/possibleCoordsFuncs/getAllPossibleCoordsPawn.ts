import { gState, isColorPieceWorthCurrPlayerColor, isEmptyCell } from '../app'

export function getAllPossibleCoordsPawn(
  pieceCoord: { i: number; j: number },
  isWhite: boolean
) {
  let res: { i: number; j: number }[] = []

  let diff = isWhite ? -1 : 1
  let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
  if (isEmptyCell(nextCoord)) res.push(nextCoord)
  // if (!isEmptyCell(nextCoord)) return res

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2
    nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
    if (isEmptyCell(nextCoord)) res.push(nextCoord)
  }

  if (
    isWhite
    //  && pieceCoord.i !== 6
  ) {
    // eatable:
    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
    if (
      // if is there piece a & the piece is not mine
      gState.gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gState.gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }
    if (
      gState.gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gState.gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  } else if (
    !isWhite
    // &&
    //  pieceCoord.i !== 1
  ) {
    // eatable:
    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 }
    if (
      gState.gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gState.gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)

    nextCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 }
    if (
      gState.gBoard[nextCoord.i][nextCoord.j] &&
      !isColorPieceWorthCurrPlayerColor(gState.gBoard[nextCoord.i][nextCoord.j])
    )
      res.push(nextCoord)
  }
  return res
}
