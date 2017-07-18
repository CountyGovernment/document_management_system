import expect from 'expect';
import { createStore } from 'redux';
import loggedInUserDocumentsReducer from '../../reducers/LoggedInUserDocumentsReducer';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as documentActions from '../../actions/DocumentActions';
import * as userActions from '../../actions/UserActions';

describe('LoggedInUserDocuments Reducer', () => {
  it('should return a list of all documents by the user', () => {
    const store = createStore(rootReducer, initialState);

    const loggedInUserDocuments = [];

    const action = documentActions.getUserDocumentSuccess(loggedInUserDocuments);
    store.dispatch(action);

    const actual = store.getState().loggedInUserDocuments;
    const expected = loggedInUserDocuments;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('delete a document', () => {
    const store = createStore(rootReducer, initialState);

    const loggedInUserDocuments = [];

    const action = documentActions.deleteDocumentSuccess(loggedInUserDocuments);
    store.dispatch(action);

    const actual = store.getState().loggedInUserDocuments;
    const expected = loggedInUserDocuments;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });
});
