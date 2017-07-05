import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case types.GET_ONE_USER_SUCCESS:
      console.log('one user reducer', action.user);
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};
