import API from '../../api/client'
import websocket from '../games/websocket'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new API()

export default () => {
  return dispatch => {
    api.signOut()
    websocket.disconnect()(dispatch)
    return { type: USER_SIGNED_OUT }
  }
}
