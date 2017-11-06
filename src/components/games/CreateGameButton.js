import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createGame from '../../actions/games/create'

class CreateGameButton extends PureComponent {
  render() {
    return (
      <div className="CreateGameButton">
        <RaisedButton
          label="Create Game"
          primary={true}
          onClick={this.props.createGame}
          icon={<StarIcon />} />
      </div>
    )
  }
}

export default connect(null, { createGame })(CreateGameButton)
