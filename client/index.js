import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import configureStore from './store/ConfigureStore';
import routes from './Routes';
import initialState from './reducers/InitialState';
import setAuthorizationToken from './utils/Authentication';
import { setCurrentUser } from './actions/UserActions';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/toastr/build/toastr.min.css';


injectTapEventPlugin();
const store = configureStore(initialState);
let userToken;
try {
  userToken = localStorage.shelftoken;
  if (userToken) {
    setAuthorizationToken(userToken);
    axios.defaults.headers.common.Authorization = userToken;
    store.dispatch(setCurrentUser(jwtDecode(userToken)));
  }
} catch (error) {
  console.log(error, 'error in setting authorization token!');
}

render(
  <Provider store={store}>
    {routes}
  </Provider>, document.getElementById('app'),
);
