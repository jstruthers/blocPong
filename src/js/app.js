import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import store from './store';
import { Provider } from 'react-redux';

import Main from './components/Main.jsx';

@Radium
class App extends React.Component {
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
