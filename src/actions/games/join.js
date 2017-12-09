// src/actions/games/join.js
import TAKE_TILE from '../../components/games/Board'
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export default (game) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/games/${game._id}/players`, {})
      .then(() => {
        console.table(game.tiles)
        console.table(game)
        dispatch({type: TAKE_TILE, payload: game.tiles})
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
