import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case types.GET_ONE_USER_SUCCESS:
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};
