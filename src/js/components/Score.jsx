import React from 'react'
import { connect } from 'react-redux'

const Score = ({ scoreLeft, scoreRight }) => {

  return (
    <div id="score">
      <div className="row centered">
        <h1>Scores</h1>
      </div>
      <div id="players" className="row">
        <div className="column centered">
          <h2>Player One</h2>
          <h3>{ scoreLeft }</h3>
        </div>

        <div className="column centered">
          <h2>Player Two</h2>
          <h3>{ scoreRight }</h3>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    scoreLeft: state.score.left,
    scoreRight: state.score.right
  }
}

export default connect(mapStateToProps, null)(Score)
