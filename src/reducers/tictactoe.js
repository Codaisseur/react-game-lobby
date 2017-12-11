const initialState = [
  null, null, null,
  null, null, null,
  null, null, null
]

const playerSymbol = (tiles) => {
  const turnNo = tiles.filter(t => (t !== null)).length + 1
  return turnNo % 2 === 1 ? 'O' : 'X'
}

export default (state = initialState, { type, payload }) => {
  if (type === 'TAKE_TILE') {
    return state.map((value, index) => {
      if (index === payload && value === null) {
        return playerSymbol(state)
      }

      return value
    })
  }

  return state
}
