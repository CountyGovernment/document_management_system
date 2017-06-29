import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.loggedInUserDocuments, action) => {
  switch (action.type) {
    case types.GET_USER_DOCUMENTS_SUCCESS:
      const documents = action.documents.document;
      return Object.assign([], state, documents);

    case types.DELETE_DOCUMENT_SUCCESS:
      const deletedDocId = action.documentId;
      return state.filter((doc) => {
        return doc.id !== deletedDocId;
      });
    default:
      return state;
  }
};
