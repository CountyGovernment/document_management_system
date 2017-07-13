import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default (state = initialState.users, action) => {
  switch (action.type) {

    case types.GET_ALL_USERS_SUCCESS:
      const users = action.users;
      return Object.assign([], state, users);

    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user),
      ];

    case types.UPDATE_USER_SUCCESS:
      state.map((user) => {
        if (action.id === user.id) {
          return Object.assign({}, user, action.user);
        } else {
          return user;
        }
      });
      return state;

    case types.SEARCH_USERS_SUCCESS:
      return action.users;

    default:
      return state;
  }
};
