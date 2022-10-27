import { gState } from './app'
import { getCellCoord, switchTurn, updateKingPos } from './game'

export function doCastling(
  elFromCell: HTMLElement | Element,
  elToCell: Element
) {
  const fromCoord = getCellCoord(elFromCell.id)
  const toCoord = getCellCoord(elToCell.id)
  let kingPiece: string = ''
  let newKingCell: { i: number; j: number } | null = null

  // WHITE KING:
  if (
    gState.gBoard[toCoord.i][toCoord.j] === gState.gPieces.KING_WHITE &&
    gState.isCastlingLegal.white
  ) {
    const rookPiece = gState.gBoard[fromCoord.i][fromCoord.j]
    kingPiece = gState.gBoard[toCoord.i][toCoord.j]

    gState.gBoard[fromCoord.i][fromCoord.j] = ''
    gState.gBoard[toCoord.i][toCoord.j] = ''
    if (fromCoord.j === 0) {
      gState.gBoard[7][3] = rookPiece
      gState.gBoard[7][2] = kingPiece
      newKingCell = { i: 7, j: 2 }
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-7-3`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-7-2`) as HTMLElement).innerText =
        kingPiece
      switchTurn()
    } else if (fromCoord.j === 7) {
      gState.gBoard[7][5] = rookPiece
      gState.gBoard[7][6] = kingPiece
      newKingCell = { i: 7, j: 6 }
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-7-5`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-7-6`) as HTMLElement).innerText =
        kingPiece
      switchTurn()
    }
  }

  // BLACK KING:
  if (
    gState.gBoard[toCoord.i][toCoord.j] === gState.gPieces.KING_BLACK &&
    gState.isCastlingLegal.black
  ) {
    const rookPiece = gState.gBoard[fromCoord.i][fromCoord.j]
    kingPiece = gState.gBoard[toCoord.i][toCoord.j]
    gState.gBoard[fromCoord.i][fromCoord.j] = ''
    gState.gBoard[toCoord.i][toCoord.j] = ''
    if (fromCoord.j === 0) {
      gState.gBoard[0][3] = rookPiece
      gState.gBoard[0][2] = kingPiece
      newKingCell = { i: 0, j: 2 }
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-0-3`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-0-2`) as HTMLElement).innerText =
        kingPiece
      switchTurn()
    } else if (fromCoord.j === 7) {
      gState.gBoard[0][5] = rookPiece
      gState.gBoard[0][6] = kingPiece
      newKingCell = { i: 0, j: 6 }
      // // update the DOM
      ;(elFromCell as HTMLElement).innerText = ''
      ;(elToCell as HTMLElement).innerText = ''
      ;(document.querySelector(`#cell-0-5`) as HTMLElement).innerText =
        rookPiece
      ;(document.querySelector(`#cell-0-6`) as HTMLElement).innerText =
        kingPiece
      switchTurn()
    }
  }
  newKingCell && updateKingPos(newKingCell, kingPiece)
}
