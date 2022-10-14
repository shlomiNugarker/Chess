import { gState, isColorPieceWorthCurrPlayerColor, isEmptyCell } from '../app'

export function getAllPossibleCoordsKnight(
  pieceCoord: {
    i: number
    j: number
  },
  board: string[][] = gState.gBoard
) {
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
      if (isEmptyCell(gState.gBoard, nextCoord)) res.push(nextCoord)
      else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //-> eatable  coord
      }
    }
  }
  return res
}
