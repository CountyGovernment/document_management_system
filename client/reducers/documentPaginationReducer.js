import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = [initialState.paginatedDocuments], action) => {
  switch (action.type) {

    case types.GET_PAGINATE_DOCUMENTS_SUCCESS:
      const paginatedDocuments = action.paginatedDocuments.document;
      return Object.assign([], state, paginatedDocuments);

    default:
      return state;
  }
};
