import TAKE_TILE from '../actions/games/board'
const initialState = ["o","","","","x","","","x","o"]



export default function (state = initialState, {type, payload}) {
  switch (type) {

  case TAKE_TILE :
    const board = { ...payload}
    console.table({...payload});
    console.log(board);
    return [board].concat(state)


  default:
  return state
  }
console.table(state)

}
