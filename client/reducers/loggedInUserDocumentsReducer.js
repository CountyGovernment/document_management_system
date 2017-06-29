import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.loggedInUserDocuments, action) => {
  switch (action.type) {
    case types.GET_USER_DOCUMENTS_SUCCESS:
    //   return [
    //     ...state, action.documents,
    //     console.log('action docs', action.documents),
    //   ];
    // case types.GET_ALL_DOCUMENTS_SUCCESS:
      const documents = action.documents.document;
      return Object.assign([], state, documents);

    default:
      return state;
  }
};
