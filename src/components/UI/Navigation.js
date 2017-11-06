// src/components/ui/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import FlatButton from 'material-ui/FlatButton'

const TITLE = 'MEMORY'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    // implement later
  }

  signUp = () => {
    // implement later
  }

  goHome = () => {
    // implement later
  }

  render() {
    const { signedIn } = this.props
    return (
      <AppBar
        title={TITLE}
        iconElementLeft={
          <IconButton onClick={this.goHome}>
            <GameIcon />
          </IconButton>
        }
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={this.signOut.bind(this)} /> :
          <FlatButton label="Sign up" onClick={this.signUp} />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps)(Navigation)
