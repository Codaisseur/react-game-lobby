import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneGame, fetchPlayers } from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import JoinGameDialog from '../components/games/JoinGameDialog'

const playerShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string
})

class Game extends PureComponent {
  static propTypes = {
    fetchOneGame: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    game: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(playerShape),
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      started: PropTypes.bool,
      turn: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(PropTypes.shape({
        symbol: PropTypes.string,
        _id: PropTypes.string,
        won: PropTypes.bool,
        visible: PropTypes.bool
      }))
    }),
    currentPlayer: playerShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  componentWillMount() {
    const { game, fetchOneGame, subscribeToWebsocket } = this.props
    const { gameId } = this.props.match.params

    if (!game) { fetchOneGame(gameId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { game } = nextProps

    if (game && !game.players[0].name) {
      this.props.fetchPlayers(game)
    }
  }

  render() {
    const { game } = this.props

    if (!game) return null

    const title = game.players.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <div className="Game">
        <h1>Game!</h1>
        <p>{title}</p>

        <h1>YOUR GAME HERE! :)</h1>

        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>

        <JoinGameDialog gameId={game._id} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, games }, { match }) => {
  const game = games.filter((g) => (g._id === match.params.gameId))[0]
  const currentPlayer = game && game.players.filter((p) => (p.userId === currentUser._id))[0]

  return {
    currentPlayer,
    game,
    isPlayer: !!currentPlayer,
    hasTurn: currentPlayer && currentPlayer._id === currentUser._id,
    isJoinable: game && !currentPlayer && game.players.length < 2
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneGame,
  fetchPlayers
})(Game)
