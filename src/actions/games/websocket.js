// src/actions/games/subscribe.js
import io from 'socket.io-client'
import { push } from 'react-router-redux'
import API from '../../api/client'
import { AUTH_ERROR } from '../loading'

export const CONNECTED_TO_GAMES_SERVICE = 'CONNECTED_TO_GAMES_SERVICE'
export const DISCONNECTED_FROM_GAMES_SERVICE = 'DISCONNECTED_FROM_GAMES_SERVICE'
export const GAME_CREATED = 'GAME_CREATED'
export const GAME_UPDATED = 'GAME_UPDATED'
export const GAME_REMOVED = 'GAME_REMOVED'

const api = new API()

let socket = null

export const connect = () => {
  return dispatch => {
    if (!api.isAuthenticated()) {
      dispatch({ type: AUTH_ERROR })
      dispatch(push('/sign-in'))
      return
    }

    socket = io.connect(api.host, {
      query: {
        auth_token: api.getToken()
      }
    })

    socket.on('action', dispatch)
    dispatch({ type: CONNECTED_TO_GAMES_SERVICE })
  }
}

export const disconnect = () => {
  return dispatch => {
    if (socket) socket.disconnect()
    dispatch({ type: DISCONNECTED_FROM_GAMES_SERVICE })
  }
}

export default {
  connect, disconnect
}