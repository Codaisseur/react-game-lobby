// import API from '../../api/client'

export const UPDATE_BOARD = 'UPDATE_BOARD'

// const api = new API()

export default index => (dispatch) => () => {
  dispatch ({
    type: 'UPDATE_BOARD',
    payload: index
  })


}

//
// takeTile = index => () => {
//   this.props.dispatch({
//     type: 'UPDATE_BOARD',
//     payload: index
//   })
// }
