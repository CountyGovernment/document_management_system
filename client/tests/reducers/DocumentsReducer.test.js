import expect from 'expect';
import { createStore } from 'redux';
import DocumentReducer from '../../reducers/DocumentsReducer';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as documentActions from '../../actions/DocumentActions';
import * as userActions from '../../actions/UserActions';

describe('Document Reducer', () => {
  it('should return a list of all documents.', () => {
    const store = createStore(rootReducer, initialState);

    const documents = [];

    const action = documentActions.getDocumentSuccess(documents);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = documents;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('Should handle creating documents', () => {
    const store = createStore(rootReducer, initialState);
    const document = {
      title: 'x titlt',
      content: 'x content',
      access: 'public',
    };

    const action = documentActions.createDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents[0];
    const expected = document;

    expect(actual).toEqual(expected);
  });

  it('Should handle updating documents', () => {
    const store = createStore(rootReducer, initialState);
    const documents = [
      { id: '1', title: 'kool kat' },
      { id: '2', title: 'slimey' },
    ];

    const document = { id: '1', title: 'kool' };

    const action = documentActions.updateDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should return a list of all searched documents.', () => {
    const store = createStore(rootReducer, initialState);

    const documents = [
      { title: ' title 1' },
      { title: 'title 2' },
    ];

    const action = documentActions.searchDocumentsSuccess(documents);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = documents;

    expect(actual).toEqual(expected);
  });
});
