import * as types from './../actions/ActionTypes';
import initialState from './InitialState';

export default (state = [initialState.paginatedDocuments], action) => {
  switch (action.type) {

    case types.GET_PAGINATE_DOCUMENTS_SUCCESS:
      const paginatedDocuments = action.paginatedDocuments.document;
      return paginatedDocuments;

    case types.SEARCH_DOCUMENTS_SUCCESS:
      return action.paginatedDocuments;

    default:
      return state;
  }
};
