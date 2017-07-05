import expect from 'expect';
import { createStore } from 'redux';
import userReducer from '../../reducers/userReducer';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import * as actions from '../../actions/userActions';

describe('Find one user reducer', () => {
  it('should return a user.', () => {
    const store = createStore(rootReducer, initialState);

    const user = {
      0: { username: 't100' },
    };

    const action = actions.getOneUserSuccess(user);
    store.dispatch(action);

    const actual = store.getState().user;
    const expected = user;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });
});
