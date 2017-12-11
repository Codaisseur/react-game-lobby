import React, { PureComponent } from 'react'
import './Tile.css'

class Tile extends PureComponent {
  render() {
    console.log(this.props.onClick);
    return (
      <div className="Tile" onClick={this.props.onClick}>

        <p>&nbsp;{ this.props.value }&nbsp;</p>
      </div>
    )
  }
}

export default Tile
