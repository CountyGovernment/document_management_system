import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const configureStore = (initialState) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;
  /* eslint-enable */
  return createStore(
    rootReducer,
    initialState,
    /* preloadedState, */
    composeEnhancers(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
    ),
    applyMiddleware(thunk),
  );
};

export default configureStore;
