import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.documents, action) => {
  switch (action.type) {
    // case types.GET_ALL_DOCUMENTS_SUCCESS:
    //   return action.documents;
    case types.GET_ALL_DOCUMENTS_SUCCESS:
      const documents = action.documents.document;
      // console.log('reducer .....>>>>>', documents);
      return Object.assign([], state, documents);

    case types.CREATE_DOCUMENT_SUCCESS:
      // console.log('create doc ///////////', action.document);
      return [
        ...state,
        // console.log(state, 'state/////////////'),
        Object.assign({}, action.document),
      ];
    case types.GET_ONE_DOCUMENT_SUCCESS:
      // console.log("state get one doc", state);
      return Object.assign({}, state, { document: action.document });
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document),
      ];

    default:
      return state;
  }
};
