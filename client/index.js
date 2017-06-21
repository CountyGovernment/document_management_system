// import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import configureStore from './store/configureStore';
import routes from './routes';
import initialState from './reducers/initialState';
// import store from './store/configureStore';
import setAuthorizationToken from './utils/authentication';
// import { setCurrentUser } from './actions/userActions';
// import { getAllDocuments } from './actions/documentActions';
// import { getAllRoles } from './actions/roleActions';
import { getAllUsers } from './actions/userActions';
import { getAllDocuments } from './actions/documentActions';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/toastr/build/toastr.min.css';


injectTapEventPlugin();
const store = configureStore(initialState);
let userToken;
try {
  console.log('userToken', localStorage.shelftoken);
  // userToken = JSON.parse(localStorage.shelftoken);
  userToken = localStorage.shelftoken;
  if (userToken) {
    console.log(userToken, 'condition true');
    setAuthorizationToken(userToken);
    axios.defaults.headers.common.Authorization = userToken;
    // store.dispatch(setCurrentUser(jwtDecode(userToken)));
    // store.dispatch(getAllRoles());
    // store.dispatch(getAllDocuments());
  }
} catch (error) {
  console.log(error, 'there is an error here!');
}

render(
  <Provider store={store}>
    {routes}
  </Provider>, document.getElementById('app'),
);
