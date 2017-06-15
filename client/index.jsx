/*
    ./client/index.js
*/
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore';
import routes from './routes.jsx';
import initialState from './reducers/initialState';


injectTapEventPlugin();
const store = configureStore(initialState);

render(
  <Provider store={store}>
    {routes}
  </Provider>, document.getElementById('app'),
);
