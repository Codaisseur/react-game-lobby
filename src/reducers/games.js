// src/reducers/games.js
import { FETCHED_GAMES, FETCHED_ONE_GAME } from '../actions/games/fetch'
import {
  GAME_CREATED,
  GAME_UPDATED,
  GAME_REMOVED,
  GAME_PLAYERS_UPDATED,
} from '../actions/games/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_GAMES :
      return [ ...payload ]

    case FETCHED_ONE_GAME :
      const gameIds = state.map(g => g._id)
      if (gameIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((game) => {
        if (game._id === payload._id) {
          return { ...payload }
        }
        return game
      })

    case GAME_CREATED :
      const newGame = { ...payload }
      return [newGame].concat(state)

    case GAME_UPDATED :
      return state.map((game) => {
        if (game._id === payload._id) {
          return { ...payload }
        }
        return game
      })

    case GAME_PLAYERS_UPDATED :
      return state.map((game) => {
        if (game._id === payload.game._id) {
          return { ...payload.game, players: payload.players }
        }
        return game
      })

    case GAME_REMOVED :
        return state.filter((game) => (game._id !== payload._id))

    default :
      return state

  }
}
