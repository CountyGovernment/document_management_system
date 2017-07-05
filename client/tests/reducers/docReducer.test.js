import expect from 'expect';
import { createStore } from 'redux';
import docReducer from '../../reducers/docReducer';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import * as actions from '../../actions/documentActions';

describe('Find one document reducer', () => {
  it('should return a document.', () => {
    const store = createStore(rootReducer, initialState);

    const document = {
      0: { title: 't105' },
    };

    const action = actions.getOneDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().document;
    const expected = document;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });
});
