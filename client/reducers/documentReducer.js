import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.documents, action) => {
  switch (action.type) {
    case types.GET_ALL_DOCUMENTS_SUCCESS:
      const documents = action.documents.document;
      // const documents = action.documents;
      // console.log(Object.assign([], state, action.documents), 'document in state');
      return Object.assign([], state, documents);

    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document),
      ];


    case types.GET_ONE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, { document: action.document });


    case types.UPDATE_DOCUMENT_SUCCESS:
      console.log('update document reducer', action.document);
      console.log('documents from reducer', [
        ...state, { document: action.document },
      ]);
      return [
        ...state, { document: action.document },
      ];


    case types.SEARCH_DOCUMENTS_SUCCESS:
      console.log('action.documents', action.documents);
      return action.documents;

    default:
      return state;
  }
};
