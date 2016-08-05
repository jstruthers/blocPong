import React, { Component } from 'react'

import Game from './Game.jsx'
import Score from './Score.jsx'

export default class Main extends Component {
  
  render() {
    return (
      <div id="container"
           className="column">
        <div className="row centered">
          <h1>blocPong</h1>
        </div>

        <div className="row centered">
          <Game />
        </div>
        
        <div className="row centered">
          <Score />
        </div>
      </div>
    )
  }
}
