import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/RootReducer';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;

const configureStore = (initialState) => {
  /* eslint-enable */
  return createStore(
    rootReducer,
    initialState,
    /* preloadedState, */
    composeEnhancers(
      applyMiddleware(thunk, reduxImmutableStateInvariant(), logger),
    ),
  );
};

export default configureStore;
