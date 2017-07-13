import expect from 'expect';
import { createStore } from 'redux';
import usersReducer from '../../reducers/UsersReducer';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as actions from '../../actions/UserActions';

describe('User reducer', () => {
  it('should return a list of all users.', () => {
    const store = createStore(rootReducer, initialState);

    const users = [
      { username: 't100' },
      { username: 't111' },
    ];

    const action = actions.getUserSuccess(users);
    store.dispatch(action);

    const actual = store.getState().users;
    const expected = users;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('should create a new user.', () => {
    const store = createStore(rootReducer, initialState);

    const users = [
      { username: 'mike' },
      { username: 'will' },
    ];

    const newUser = { username: 'Spiderman' };

    const action = actions.createUserSuccess(newUser);
    store.dispatch(action);

    const actual = store.getState().users;
    const expected = [newUser];

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('should update a user.', () => {
    const store = createStore(rootReducer, initialState);

    const user = {}
;

    const action = actions.updateUserSuccess(user);
    store.dispatch(action);

    const actual = store.getState().user;
    const expected = user;

    expect(actual).toEqual(expected);
    // expect(typeof actual).toBe('object');
  });

  it('should return a list of all searched users', () => {
    const store = createStore(rootReducer, initialState);
    const users = [
      { username: 'batman' },
      { username: 'riddler' },
    ];

    const action = actions.searchUsersSuccess(users);
    store.dispatch(action);

    const actual = store.getState().users;
    const expected = users;

    expect(actual).toEqual(expected);
  });
});
