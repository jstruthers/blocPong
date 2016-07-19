import React, { Component } from 'react'

import Court from './Court.jsx'

export default class Main extends Component {
  
  render() {
    return (
      
      <div id="container" className="column">
        <div className="row centered">
          <h1>blocPong</h1>
        </div>

        <div className="row centered">
          <Court />
        </div>
      </div>
    )
  }
}
