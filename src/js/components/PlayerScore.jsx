import React from 'react'

const Score = ({ id, score, player }) => {

  return (
    <div id={ id } className="player-display column centered">
      <div className="player-title row centered">
        <h2>{ player }</h2>
      </div>
      <div className="player-score row centered">
        <h3>{ score }</h3>
      </div>
    </div>
  )
}

export default Score
