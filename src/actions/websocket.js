// src/actions/websocket.js
import io from 'socket.io-client'
import { push } from 'react-router-redux'
import API from '../api/client'
import { AUTH_ERROR } from './loading'

export const CONNECTED_TO_WEBSOCKET = 'CONNECTED_TO_WEBSOCKET'
export const DISCONNECTED_FROM_WEBSOCKET = 'DISCONNECTED_FROM_WEBSOCKET'

const api = new API()

let socket = null

export const connect = () => {
  return dispatch => {
    if (socket) { return }

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
    dispatch({ type: CONNECTED_TO_WEBSOCKET })
  }
}

export const disconnect = () => {
  if (socket) { socket.disconnect() }
  socket = null

  return { type: DISCONNECTED_FROM_WEBSOCKET }
}

export default {
  connect, disconnect
}
