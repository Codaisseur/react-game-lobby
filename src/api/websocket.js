import io from 'socket.io-client'
import API from './client'

const api = new API()

export default class WebSocket {
  constructor(dispatch) {
    this.connect()
    this.socket.on('action', dispatch)
  }

  connect() {
    this.socket = io.connect(api.host, this.authOptions())
  }

  authOptions() {
    if (!api.isAuthenticated()) {
      return {}
    }

    return {
      query: {
        auth_token: api.getToken()
      }
    }
  }
}
