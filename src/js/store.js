import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

//middleware
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger();

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleware)
);

export default store;
