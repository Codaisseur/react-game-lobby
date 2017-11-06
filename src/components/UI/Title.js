// src/components/ui/Title.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Title extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    level: PropTypes.number,
  }

  classNames() {
    const { level } = this.props
    return `Title level-${level || 1}`
  }

  render() {
    return(
      <h1 className={this.classNames()}>
        { this.props.content }
      </h1>
    )
  }
}

export default Title
