import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default (state = [initialState.documents], action) => {
  switch (action.type) {

    case types.GET_ALL_DOCUMENTS_SUCCESS:
      const documents = action.documents.document;
      return Object.assign([], state, documents);

    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document),
      ];

    case types.UPDATE_DOCUMENT_SUCCESS:
      state.map((document) => {
        if (action.id === document.id) {
          return Object.assign({}, document, { title: action.document.title, content: action.document.content });
        } else {
          return document;
        }
      });
      return state;

    case types.SEARCH_DOCUMENTS_SUCCESS:
      return action.documents;

    default:
      return state;
  }
};
