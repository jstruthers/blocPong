import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getContext, move, handleEdge, display, handleKeyPress } from '../actions'

import bg from '../game_objects/bg'

class Court extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    requestAnimationFrame(() => {this.update()})
  }
  
  update() {
    let {
          ball, paddleLeft, paddleRight, courtSize,
          getContext, move, handleEdge, display
        } = this.props,
        objs = ['ball', 'paddleLeft', 'paddleRight']
    
    getContext(this._canvas.getContext("2d"))
    
    bg(this._canvas.getContext("2d"), courtSize)

    for (let i = 0; i < 3; i += 1) {
      move(objs[i])
      handleEdge(objs[i])
      display(objs[i])
    }
    
    requestAnimationFrame(() => {this.update()})
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
    move: (obj) => {
      dispatch(move(obj))
    },
    handleEdge: (obj) => {
      dispatch(handleEdge(obj))
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
