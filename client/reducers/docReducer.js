import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.document, action) => {
  switch (action.type) {
    case types.GET_ONE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, action.document);

    default:
      return state;
  }
};
