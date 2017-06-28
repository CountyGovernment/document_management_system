import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.documents, action) => {
  switch (action.type) {
    case types.GET_ALL_DOCUMENTS_SUCCESS:
      const documents = action.documents.document;
      return Object.assign([], state, documents);


    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document),
      ];


    case types.GET_ONE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, { document: action.document });


    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document),
      ];


    case types.SEARCH_DOCUMENTS_SUCCESS:
      console.log('action.documents', action.documents);
      return action.documents;

    default:
      return state;
  }
};
