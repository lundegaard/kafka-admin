import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const createStoreMdw = () => {
  const middlewares = [apiMiddleware, thunk];
  if (process.env.NODE_ENV === 'production') { return applyMiddleware(...middlewares)(createStore); }
  middlewares.push(logger);
  return composeWithDevTools(applyMiddleware(...middlewares))(createStore);
};

const configureStore = (rootReducer, initialState) => createStoreMdw()(rootReducer, initialState);

export default configureStore;
