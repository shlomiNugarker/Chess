import { gState, isColorPieceWorthCurrPlayerColor, isEmptyCell } from '../app'

export function getAllPossibleCoordsQueen(pieceCoord: {
  i: number
  j: number
}) {
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
        const piece = gState.gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //last coord -> eatable
        break
      }
    }
  }

  return res
}
