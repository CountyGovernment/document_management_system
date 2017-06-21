import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.documents, action) => {
  switch (action.type) {
    // case types.GET_ALL_DOCUMENTS_SUCCESS:
    //   return action.documents;
    case types.GET_ALL_DOCUMENTS_SUCCESS:
      // console.log('users in reducer', action.users);
      // return action.users;
      const documents = action.documents.document;
      // console.log('reducer .....>>>>>', action.documents.document);
      // console.log('new state', Object.assign([], state, users));
      return Object.assign([], state, documents);
    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document),
      ];

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document),
      ];

    default:
      return state;
  }
};
