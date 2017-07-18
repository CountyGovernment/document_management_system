import initialState from './InitialState';
import * as types from '../actions/ActionTypes';

/**
 * Message reducer
 *
 * @export
 * @param {Object} [state=initialState.message] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.message, action) => {
  switch (action.type) {
    case types.SUCCESS_MESSAGE:
      return action.successMessage;

    case types.ERROR_MESSAGE:
    // console.log('getting here');
      // console.log(action.errorMessage, 'action.errorMessage');
      return action.errorMessage;
      // return null;

    default:
      return state;
  }
};
