import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import joinGame from '../../actions/games/join'

class JoinGameDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
  }

  joinGame = () => {
    const { joinGame, game } = this.props
    joinGame(game)
  }

  render() {
    const { currentUser, open } = this.props

    const actions = [
      <Link to="/">
        <FlatButton
          label="No Thanks"
          primary={true} />
      </Link>,
      <RaisedButton
        label="Join Game"
        primary={true}
        keyboardFocused={true}
        onClick={this.joinGame}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Join Game"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
        >
          Hey <strong>{currentUser.name || 'there'}!</strong> Would you like to join this game?
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, games }, { gameId }) => {
  const game = games.filter((g) => (g._id === gameId))[0]
  const isPlayer = game && game.players.filter((p) => (p.userId === currentUser._id)) > 0

  return {
    game,
    currentUser,
    isPlayer,
    open: game && !isPlayer && game.players.length < 2
  }
}

export default connect(mapStateToProps, { joinGame })(JoinGameDialog)
