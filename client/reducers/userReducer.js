import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.users, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_SUCCESS:
      console.log('users in reducer', action.users);
      // return action.users;
      const users = action.users;
      console.log('new state', Object.assign([], state, users));
      return Object.assign([], state, users);
    // case types.GET_ONE_USERS_SUCCESS:
    //   return action.user;
    // case types.CREATE_USER_SUCCESS:
    //   return [
    //     ...state,
    //     Object.assign({}, action.user),
    //   ];
    default:
      return state;
  }
};
