import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default (state = initialState.roles, action) => {
  switch (action.type) {
    case types.GET_ALL_ROLES_SUCCESS:
      return action.roles;
    default:
      return state;
  }
};
