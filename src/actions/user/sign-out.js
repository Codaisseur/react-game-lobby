import API from '../../api/client'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new API()

export default () => {
  api.signOut()
  return { type: USER_SIGNED_OUT }
}
