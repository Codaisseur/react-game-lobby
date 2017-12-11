export const TAKE_TILE = 'TAKE_TILE'

export default (index) => {
  return {
    type: 'TAKE_TILE',
    payload: index
  }
}

//
// takeTile = index => () => {
//   this.props.dispatch({
//     type: 'TAKE_TILE',
//     payload: index
//   })
// }
