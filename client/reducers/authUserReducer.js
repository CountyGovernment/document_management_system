import initialState from './InitialState';
import * as types from './../actions/ActionTypes';

/**
 * Authenticated User reducer
 *
 * @export
 * @param {Object} [state=initialState.isAuth] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.isAuth, action) => {
  switch (action.type) {
    case types.SET_LOGGEDIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
        loggedInUser: action.user,
      });

    case types.LOGOUT_USER:
      return {
        isAuthenticated: false,
        loggedInUser: null,
      };
    default:
      return state;
  }
};
