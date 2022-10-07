import { isColorPieceWorthCurrPlayerColor, isEmptyCell, gState } from '../app'
import { getCellCoord } from '../game'

export function getAllPossibleCoordsKing(pieceCoord: { i: number; j: number }) {
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
        const piece = gState.gBoard[nextCoord.i][nextCoord.j]
        if (!isColorPieceWorthCurrPlayerColor(piece)) res.push(nextCoord) //push eatable coord
      }
    }
  }

  // mark fake tds for cadtling:
  let selectedCellCoord
  if (gState.gSelectedElCell) {
    selectedCellCoord = getCellCoord(gState.gSelectedElCell.id)
  }

  if (
    selectedCellCoord &&
    gState.gBoard[selectedCellCoord.i][selectedCellCoord.j] ===
      gState.gPieces.KING_WHITE
  ) {
    let elCell: HTMLElement | Element | null = null
    if (!gState.gBoard[selectedCellCoord.i][selectedCellCoord.j + 2]) {
      elCell = document.querySelector(
        `#cell-${selectedCellCoord.i}-${selectedCellCoord.j + 3}`
      )
      ;(elCell as HTMLElement).classList.add('castling')
    }
  }
  return res
}
