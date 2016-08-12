import React, { Component } from 'react'
import { connect } from 'react-redux'

import Game from './Game.jsx'
import PlayerScore from './PlayerScore.jsx'

class Main extends Component {
  
  render() {
    return (
      <div id="container"
           className="column">
        <div id="title" className="row centered">
          <h1>blocPong</h1>
        </div>

        <div id="game" className="row centered">
          <PlayerScore id={"left"} score={ this.props.scoreLeft } player={ 'Blue' } />
          <Game />
          <PlayerScore id={"right"} score={ this.props.scoreRight } player={ 'Red' } />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    scoreLeft: state.score.left,
    scoreRight: state.score.right
  }
}

export default connect(mapStateToProps, null)(Main)
