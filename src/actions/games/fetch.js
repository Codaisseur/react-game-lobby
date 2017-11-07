// src/actions/games/fetch.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { GAME_PLAYERS_UPDATED } from './subscribe'

export const FETCHED_GAMES = 'FETCHED_GAMES'
export const FETCHED_ONE_GAME = 'FETCHED_ONE_GAME'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/games')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_GAMES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchPlayers = (game) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/games/${game._id}/players`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: GAME_PLAYERS_UPDATED,
          payload: {
            game,
            players: result.body
          }
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchOneGame = (id) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/games/${id}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_GAME,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
