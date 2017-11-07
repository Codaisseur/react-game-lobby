// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchGames, { fetchPlayers } from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateGameButton from '../components/games/CreateGameButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToWebsocket()
  }

  goToGame = gameId => event => this.props.push(`/play/${gameId}`)

  isJoinable(game) {
    return game.players.length < 2 &&
      !this.isPlayer(game)
  }

  isPlayer(game) {
    if (!this.props.currentUser) { return false }
    return game.players.map(p => p.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  isPlayable(game) {
    return game.players.length === 2
  }

  renderGame = (game, index) => {
    let ActionIcon = this.isJoinable(game) ? JoinGameIcon : WatchGameIcon
    if (this.isPlayer(game)) ActionIcon = this.isPlayable(game) ? PlayGameIcon : WaitingIcon

    if (!game.players[0].name) { this.props.fetchPlayers(game) }

    const title = game.players.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <MenuItem
        key={index}
        onClick={this.goToGame(game._id)}
        rightIcon={<ActionIcon />}
        primaryText={title} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateGameButton />
        <Paper className="paper">
          <Menu>
            {this.props.games.map(this.renderGame)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentUser }) => ({ games, currentUser })

export default connect(mapStateToProps, { fetchGames, subscribeToWebsocket, fetchPlayers, push })(Lobby)
