import API from '../../api/client'
import game from './join'
const api = new API()

export const TAKE_TILE = 'TAKE_TILE'

export default () => {
  return (dispatch) => {
    dispatch({
      type: 'TAKE_TILE',
      payload: game
  })
}
}
