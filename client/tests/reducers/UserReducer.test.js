import expect from 'expect';
import { createStore } from 'redux';
import userReducer from '../../reducers/UserReducer';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as actions from '../../actions/UserActions';

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
