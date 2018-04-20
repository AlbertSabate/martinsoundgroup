import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool,
  }
  static defaultProps = {
    show: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      show: props.show,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
    })
  }

  render() {
    if (!this.state.show) {
      return null
    }

    return (
      <div className="loading">
        <div className="loading-bounce" />
        <div className="loading-bounce" />
      </div>
    )
  }
}

export default Loading
