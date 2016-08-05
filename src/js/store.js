import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

//middleware
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger();

import Vector from './game_objects/Vector.js'
import Ball from './game_objects/Ball'
import Paddle from './game_objects/Paddle'
import Court from './game_objects/Court.js'
import Collider from './game_objects/Collider.js'

const middleware = [logger, thunk],
      court = { w: 600, h: 300},
      paddleXOffset = 30,
      paddleSize = {w: 15, h: 50},
      paddleSpeed = 3,
      ballRadius = 7,
      ballSpeed = 4,
      friction = 0.05

const store = createStore(
  rootReducer,
  {paddleLeft: new Paddle({
      team: 'left',
      size: paddleSize,
      points: [
        new Vector({
          pos: {
            x: paddleSize.w + paddleXOffset,
            y: court.h / 2 - paddleSize.h / 2
          }
        }),
        new Vector({
          pos: {
            x: paddleSize.w + paddleXOffset,
            y: court.h / 2 + paddleSize.h / 2
          }
        }),
        new Vector({
          pos: {
            x: paddleXOffset,
            y: court.h / 2 + paddleSize.h / 2
          }
        }),
        new Vector({
          pos: {
            x: paddleXOffset,
            y: court.h / 2 - paddleSize.h / 2
          }
        })
      ],
      acc: paddleSpeed,
      vel: new Vector({pos: {x: 0, y: 0}}),
      friction
    }),
    paddleRight: new Paddle(   
      {
        team: 'right',
        size: paddleSize,
        points: [
          new Vector({
            pos: {
              x: court.w - paddleXOffset,
              y: court.h / 2 - paddleSize.h / 2
            }
          }),
          new Vector({
            pos: {
              x: court.w - paddleXOffset,
              y: court.h / 2 + paddleSize.h / 2
            }
          }),
          new Vector({
            pos: {
              x: court.w - paddleXOffset - paddleSize.w,
              y: court.h / 2 + paddleSize.h / 2
            }
          }),
          new Vector({
            pos: {
              x: court.w - paddleXOffset - paddleSize.w,
              y: court.h / 2 - paddleSize.h / 2
            }
          })
        ],
        acc: paddleSpeed,
        vel: new Vector({pos: {x: 0, y: 0}}),
        friction
      }),
    ball: new Ball({
        radius: ballRadius,
        pos: {x: court.w/2, y: court.h/2},
        acc: ballSpeed,
        vel: new Vector({pos: {x: 0, y: 0}})
    }),
    court: new Court({ size: court }),
    collider: new Collider(),
    score: { left: 0, right: 0}
  }
//  applyMiddleware(...middleware)
)

export default store;
