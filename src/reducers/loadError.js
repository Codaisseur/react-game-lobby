// src/reducers/loadError.js
import { LOAD_ERROR, LOAD_SUCCESS, CLEAR_LOAD_ERROR } from '../actions/loading'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOAD_ERROR :
      return '' + payload

    case CLEAR_LOAD_ERROR :
    case LOAD_SUCCESS :
      return null

    default :
      return state
  }
}
