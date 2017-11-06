import { push } from 'react-router-redux'
import API from '../../api/client'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new API()

export default () => {
  return dispatch => {
    api.signOut()
    dispatch(push('/sign-in'))
    dispatch({ type: USER_SIGNED_OUT })
  }
}
