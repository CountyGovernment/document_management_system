import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import * as userAction from '../../actions/userActions';


describe('User action', () => {
  describe('create user', () => {
    it('should create a user SET_LOGGEDIN_USER action', () => {
      const user = { username: 'run', firstName: 'the', secondName: 'world', email: 'isending@gmail.com', password: 'password' };
      const expectedAction = {
        type: types.SET_LOGGEDIN_USER,
        user,
      };
      const action = userAction.setCurrentUser(user);

      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('sync actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('get all users', () => {
    const expectedAction = [{ type: types.GET_USER_SUCCESS, body: { users: [{ id: 1, username: 'run', firstName: 'the' }] } }];
    const store = mockStore({ users: [] }, expectedAction);
    store.dispatch(userAction.getAllUsers()).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.GET_USER_SUCCESS);
      done();
    });
  });

  it('get one user', () => {
    const user = 2;
    const expectedAction = [{ type: types.GET_ONE_USER_SUCCESS, body: { users: [{ id: 7, username: 'ice' }] } }];
    const store = mockStore({ users: [] }, expectedAction);
    store.dispatch(userAction.getOneUser(user)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.GET_ONE_USER_SUCCESS);
      done();
    });
  });

  it('handles search for a user', () => {
    const searchValue = 1;
    const expectedAction = [{ type: types.SEARCH_USERs_SUCCESS, body: { users: [{ id: 7, username: 'ice' }] } }];
    const store = mockStore({ users: [] }, expectedAction);
    store.dispatch(userAction.search(searchValue)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.SEARCH_USERS_SUCCESS);
      done();
    });
  });

  it('handles deleting a user', () => {
    const deletedUser = 1;
    const expectedAction = [{ type: types.DELETE_USER_SUCCESS, body: { users: [] } }];
    const store = mockStore({ users: [] }, expectedAction);
    store.dispatch(userAction.deleteUser(deletedUser)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.DELETE_USER_SUCCESS);
      done();
    });
  });
});
