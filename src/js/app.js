import "babel-polyfill";

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import store from './store';
import { Provider } from 'react-redux';

import Main from './components/Main.jsx';

class App extends Component {
  render() {
    const state = store.getState();
    return (
      <div className="app">
        <Main {...state} />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('main')
);
