// src/actions/games/subscribe.js
import io from 'socket.io-client'
import { push } from 'react-router-redux'
import API from '../../api/client'
import { AUTH_ERROR } from '../loading'

export const SUBSCRIBED_TO_GAMES_SERVICE = 'SUBSCRIBED_TO_GAMES_SERVICE'
export const GAME_CREATED = 'GAME_CREATED'
export const GAME_UPDATED = 'GAME_UPDATED'
export const GAME_REMOVED = 'GAME_REMOVED'

const api = new API()

export default () =>  {
  return dispatch => {
    if (!api.isAuthenticated()) {
      dispatch({ type: AUTH_ERROR })
      dispatch(push('/sign-in'))
    }

    const socket = io.connect(api.host, {
      query: {
        auth_token: api.getToken()
      }
    })

    socket.on('action', dispatch)

    dispatch({ type: SUBSCRIBED_TO_GAMES_SERVICE })
  }
}
