import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getContext,
  launch,
  move,
  handleCollision,
  display,
  handleKeyPress
} from '../actions'

import Collider from '../game_objects/Collider.js'

class Game extends Component {
  
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
          ball, paddleLeft, paddleRight, court, collider,
          getContext, move, handleCollision, display
        } = this.props,
        objs = ['paddleLeft', 'paddleRight', 'ball']
    
    function checkPaddleCollision(ball, paddle) {

      if (ball.hasOwnProperty('radius')) {
        let nearestPoint = ball.nearestPoint(paddle.points)[1]
        ball.getPoints(paddle, nearestPoint)
        ball.getNormals(paddle)
      }

      let result = collider.checkCollision(ball, paddle)

      if (result) { handleCollision('ball', [result, paddle]) }
    }
    
    function checkBoundaries(objA, objA_Name) {
      let result = collider.checkBoundaries(objA, court.boundaries)
      if (result) { handleCollision(objA_Name, result) }
    }
    
    getContext(this._canvas.getContext("2d"))

    display('court')
    
    for (let i = 0; i < objs.length; i += 1) {

      move(objs[i])

      checkBoundaries(this.props[objs[i]], objs[i])
      
      if (ball.pos.x <= court.size.w/2 && i === objs.length - 1) {
        checkPaddleCollision(ball, paddleLeft)
      } else {
        checkPaddleCollision(ball, paddleRight)
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
          width={ this.props.court.size.w }
          height={ this.props.court.size.h }
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
    collider: state.collider,
    court: state.court
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
    handleCollision: (objA, result) => {
      dispatch(handleCollision(objA, result))
    },
    display: (obj) => {
      dispatch(display(obj))
    },
    handleKeyPress: (event) => {
      dispatch(handleKeyPress(event.keyCode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
