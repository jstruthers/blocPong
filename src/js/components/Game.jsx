import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeyHandler, { KEYPRESS, KEYDOWN, KEYUP } from 'react-key-handler'
import {
  getContext,
  launch,
  move,
  handleCollision,
  display
} from '../actions'

import Collider from '../game_objects/Collider.js'

class Game extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      running: null,
      plr: props.paddleLeft.rotation,
      hideCourt: false
    }
  }
  
  beginGame() {
    this.setState({
      running: window.requestAnimationFrame(this.update.bind(this)),
      hideCourt: true
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
  
  playerUp() {
    this.props.paddleLeft.vel.pos.y -= this.props.paddleLeft.acc;
  }
  
  playerDown() {
    this.props.paddleLeft.vel.pos.y += this.props.paddleLeft.acc;
  }
  
  playerBurst() {
    this.props.paddleLeft.windingUp[0] = false
    this.props.paddleLeft.fullyCharged = false
    this.state.plr.angle -= this.state.plr.burst * 0.25
    this.state.plr.burst = 0
  }
  
  update() {
    let {
          ball, paddleLeft, paddleRight, court,
          collider, move, handleCollision, display, getContext
        } = this.props,
        objs = ['paddleLeft', 'paddleRight', 'ball']
    
    function checkPaddleCollision(ball, paddle) {
      let nearestPoint = ball.nearestPoint(paddle.points)[1]
      ball.getPoints(paddle, nearestPoint)
      ball.getNormals(paddle)

      let result = collider.checkCollision(ball, paddle)

      if (result) { handleCollision('ball', [result, paddle]) }
    }
    
    function checkBoundaries(objA, objA_Name) {
      let result = collider.checkBoundaries(objA, court.boundaries)
      if (result) { handleCollision(objA_Name, result) }
    }
    
    getContext(this._canvas.getContext("2d"))
    display('court')
    paddleRight.autoPilot(ball)
    
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
    
    let { paddleLeft } = this.props

    return (
      <div>
        <KeyHandler keyEventName={KEYPRESS} keyValue="w" onKeyHandle={this.playerUp.bind(this)} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="s" onKeyHandle={this.playerDown.bind(this)} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="a"
                    onKeyHandle={
                      paddleLeft.fullyCharged
                        ? this.playerBurst.bind(this)
                        : () => paddleLeft.windingUp = [true, -1]} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="d"
                    onKeyHandle={
                      paddleLeft.fullyCharged
                        ? this.playerBurst.bind(this)
                        : () => paddleLeft.windingUp = [true, 1]} />
        <canvas
            id="canvas"
            className={ this.state.hideCourt ? 'revealed' : 'hidden' }
            ref={ (c) => this._canvas = c }
            width={ this.props.court.size.w }
            height={ this.props.court.size.h }
            onBlur={ this.endGame.bind(this) }
            onClick={ this.props.launch } />
        <img className={ this.state.hideCourt ? 'hidden' : 'revealed' }
             onFocus={ this.beginGame.bind(this) }
             tabIndex="0"
             id="pongCourt" src="./pongCourt.png" alt=""/>
      </div>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
