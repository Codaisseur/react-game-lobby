
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Tile from './Tile'
import './Board.css'
import board from '../../reducers/tictactoe'

class Board extends PureComponent {

  takeTile = index => () => {
    this.props.dispatch({
      type: 'TAKE_TILE',
      payload: index
    })
  }

  renderTile = (value, index) => {
    return <Tile key={index} onClick={this.takeTile(index)} value={value} />
  }

  render() {
    return (
      <div className="Board">
        {this.props.board.map(this.renderTile)}
      </div>
    )
  }
}

const mapStateToProps = ({ board }) => ({ board })

export default connect(mapStateToProps)(Board)
// export default Board
