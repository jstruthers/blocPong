import React, { Component } from 'react'

export default class Main extends Component {
  
  render() {
    return (
      
      <div id="container" className="column">
        <div className="row centered">
          <h1>blocPong</h1>
        </div>

        <div className="row centered">
          <canvas id="canvas" width="600" height="300" />
        </div>
      </div>
    )
  }
}