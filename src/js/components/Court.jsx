import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getContext, display, handleEdge, handleKeyPress } from '../actions'

import bg from '../game_objects/bg'

class Court extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    
    let {
          ball, paddleLeft, paddleRight, courtSize,
          getContext, display, handleEdge
        } = this.props,
        objs = ['ball', 'paddleLeft', 'paddleRight']
    
    getContext(this._canvas.getContext("2d"))
    
    bg(this._canvas.getContext("2d"), courtSize)
    for (let i = 0; i < 3; i += 1) {
      handleEdge(objs[i])
      display(objs[i])
    }
    
//    checkCollision()
//    handleEdge()
//    move()
  }
  
  render() {
    return (
      <canvas
          id="canvas"
          ref={ (c) => this._canvas = c }
          width={ this.props.courtSize.w }
          height={ this.props.courtSize.h }
          tabIndex="0"
          onKeyDown={ this.props.handleKeyPress } />
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
    display: (obj) => {
      dispatch(display(obj))
    },
    handleEdge: (obj) => {
      dispatch(handleEdge(obj))
    },
    handleKeyPress: (event) => {
      dispatch(handleKeyPress(event))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Court);
