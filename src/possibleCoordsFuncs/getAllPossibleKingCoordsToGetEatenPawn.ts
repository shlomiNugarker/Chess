import { gState } from '../app'

export function getAllPossibleKingCoordsToGetEatenPawn(_kingCoord: {
  i: number
  j: number
}) {
  let res: { i: number; j: number }[] = []

  const { isBlackTurn } = gState

  const kingPos = gState.isBlackTurn
    ? gState.kingPos.black
    : gState.kingPos.white

  const possibleSteps = [
    {
      i: isBlackTurn ? kingPos.i + 1 : kingPos.i - 1,
      j: isBlackTurn ? kingPos.j + 1 : kingPos.j - 1,
    },
    {
      i: isBlackTurn ? kingPos.i + 1 : kingPos.i - 1,
      j: isBlackTurn ? kingPos.j - 1 : kingPos.j + 1,
    },
  ]

  for (let k = 0; k < possibleSteps.length; k++) {
    if (
      possibleSteps[k].i >= 0 &&
      possibleSteps[k].i < 8 &&
      possibleSteps[k].j >= 0 &&
      possibleSteps[k].j < 8
    ) {
      res.push(possibleSteps[k])
    }
  }

  return res
}
