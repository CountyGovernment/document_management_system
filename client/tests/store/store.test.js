import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as documentAction from '../../actions/DocumentActions';

describe('Integration test for store, action and reducer', () => {
  it('should handle creating documents', () => {
    const store = createStore(rootReducer, initialState);
    const document = {
      title: 'store test',
    };
    const action = documentAction.createDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents[0];
    const expected = {
      title: 'store test',
    };

    expect(actual).toEqual(expected);
  });
});
