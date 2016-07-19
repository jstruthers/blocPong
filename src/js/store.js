import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

//middleware
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger();

import Ball from './game_objects/Ball'
import Paddle from './game_objects/Paddle'

const middleware = [logger, thunk],
      court = { w: 600, h: 300},
      paddleSize = {w: 10, h: 50}

const store = createStore(
  rootReducer,
  {
    paddleLeft: new Paddle(
        {
          team: 'left',
          size: paddleSize,
          pos: {x: 20, y: court.h/2 - paddleSize.h/2},
        }),
    paddleRight: new Paddle(   
        {
          team: 'right',
          size: paddleSize,
          pos: {x: court.w - 20, y: court.h/2 - paddleSize.h/2},
        }),
    ball: new Ball(
        {
          size: 5,
          pos: {x: court.w/2, y: court.h/2}
    }),
    courtSize: court
  },
  applyMiddleware(...middleware)
);

export default store;
