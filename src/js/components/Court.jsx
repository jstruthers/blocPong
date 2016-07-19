import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getContext, displayBall, displayPaddle } from '../actions'

import bg from '../game_objects/bg'

class Court extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    
    let {
      ball,
      paddleLeft,
      paddleRight,
      courtSize,
      getContext,
      displayBall,
      displayPaddle
    } = this.props
    
    getContext(this._canvas.getContext("2d"))
    
    bg(this._canvas.getContext("2d"), courtSize)
    displayBall(ball.pos, ball.size)
    displayPaddle(paddleLeft.pos, paddleLeft.size)
    displayPaddle(paddleRight.pos, paddleRight.size)
  }
  
  render() {
    return (<canvas id="canvas" ref={ (c) => this._canvas = c } width="600" height="300" />)
  }
}

function mapStateToProps(state) {
  return {
    ball: state.ball,
    paddleLeft: state.paddleLeft,
    paddleRight: state.paddleRight,
    courtSize: state.courtSize
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getContext: (context) => {
      dispatch(getContext(context))
    },
    displayBall: (pos, size) => {
      dispatch(displayBall(pos, size))
    },
    displayPaddle: (pos, size) => {
      dispatch(displayPaddle(pos, size))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
