import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.users, action) => {
  switch (action.type) {

    case types.GET_ALL_USERS_SUCCESS:
      const users = action.users;
      return Object.assign([], state, users);

    case types.GET_ONE_USER_SUCCESS:
      return action.id;

    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user),
      ];

    default:
      return state;
  }
};
