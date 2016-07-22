import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getContext,
  launch,
  move,
  handleEdge,
  recalc,
  handleCollision,
  display,
  handleKeyPress
} from '../actions'

import bg from '../game_objects/bg'

class Court extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      running: null
    }
  }
  
  beginGame() {
    this.setState({
      running: window.requestAnimationFrame(this.update.bind(this))
    })
    this.props.launch()
  }
  
  endGame() {
    this.props.launch()
    window.cancelAnimationFrame(this.state.running)
    this.setState({
      running: null
    })
  }
  
  update() {
    let {
          ball, paddleLeft, paddleRight, courtSize,
          getContext, move, handleEdge, recalc, handleCollision, display
        } = this.props,
        objs = ['paddleLeft', 'paddleRight', 'ball']
    
    getContext(this._canvas.getContext("2d"))
    
    bg(this._canvas.getContext("2d"), courtSize)

    for (let i = 0; i < 3; i += 1) {
      move(objs[i])
      handleEdge(objs[i])
      if (i < 2) { recalc(objs[i]) }
      else {
        if (ball.pos.x <= courtSize.w/2) {
          handleCollision(paddleLeft, ball)
        } else {
          handleCollision(paddleRight, ball)
        }
      }
      display(objs[i])
    }
    
    this.setState({
      running: window.requestAnimationFrame(this.update.bind(this)) 
    })
  }
  
  render() {

    return (
      <canvas
          id="canvas"
          ref={ (c) => this._canvas = c }
          width={ this.props.courtSize.w }
          height={ this.props.courtSize.h }
          onFocus={ this.beginGame.bind(this) }
          onBlur={ this.endGame.bind(this) }
          tabIndex="0"
          onKeyDown={ this.props.handleKeyPress }
          onClick={ this.props.launch } />
    )
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
    launch: () => {
      dispatch(launch())
    },
    move: (obj) => {
      dispatch(move(obj))
    },
    handleEdge: (obj) => {
      dispatch(handleEdge(obj))
    },
    recalc: (obj) => {
      dispatch(recalc(obj))
    },
    handleCollision: (ball, paddle) => {
      dispatch(handleCollision(ball, paddle))
    },
    display: (obj) => {
      dispatch(display(obj))
    },
    handleKeyPress: (event) => {
      dispatch(handleKeyPress(event))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
