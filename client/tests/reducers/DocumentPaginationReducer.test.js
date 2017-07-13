import expect from 'expect';
import { createStore } from 'redux';
import DocumentPaginationReducer from '../../reducers/DocumentPaginationReducer';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as documentActions from '../../actions/DocumentActions';

describe('PaginatedDocument Reducer', () => {
  it('should return a list of all paginatedDocuments', () => {
    const store = createStore(rootReducer, initialState);

    const paginatedDocuments = [];

    const action = documentActions.getPaginateDocumentSuccess(paginatedDocuments);
    store.dispatch(action);

    const actual = store.getState().paginatedDocuments;
    const expected = paginatedDocuments;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });
});
