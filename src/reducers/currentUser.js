// src/reducers/currentUser.js
import { USER_SIGNED_IN } from '../actions/user/sign-in'
import { USER_SIGNED_OUT } from '../actions/user/sign-out'

const CURRENT_USER_KEY = 'currentUserMemoryGame'
const currentUserFromLocalStorage = JSON.parse(
  window.localStorage.getItem(CURRENT_USER_KEY) || 'null'
)

export default (state = currentUserFromLocalStorage, { type, payload } = {}) => {
  switch (type) {
    case USER_SIGNED_IN :
      const currentUser = { ...payload }
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
      return currentUser

    case USER_SIGNED_OUT :
      window.localStorage.removeItem(CURRENT_USER_KEY)
      return null

    default :
      return state
  }
}
