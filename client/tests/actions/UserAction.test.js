import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/ActionTypes';
import * as userAction from '../../actions/UserActions';


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

  it('get all users', (done) => {
    nock('http://localhost:80/api')
    .get('/users')
    .reply(200, { data: { users: [{ id: 1, username: 'run', firstName: 'the' }] } });
    const store = mockStore({ users: [] });
    store.dispatch(userAction.getAllUsers()).then(() => {
      const action = store.getActions();
      // console.log('action.....', action[0].users.data.users[0]);
      // console.log('actiontype.....', action[0].type);
      expect(action[0].type).toEqual(types.GET_ALL_USERS_SUCCESS);
      expect(action[0].users.data.users[0]).toEqual({ id: 1, username: 'run', firstName: 'the' });
      done();
    });
  });

  it('get one user', (done) => {
    const user = { id: 7, username: 'ice' };
    const expectedAction = [{ type: types.GET_ONE_USER_SUCCESS, body: { users: [{ id: 7, username: 'ice' }] } }];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(userAction.getOneUser(user)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.GET_ONE_USER_SUCCESS);
      done();
    });
  });

  it('handles search for a user', (done) => {
    const searchValue = 1;
    const expectedAction = [{ type: types.SEARCH_USERS_SUCCESS, data: { users: [{ id: 7, username: 'ice' }] } }];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(userAction.search(searchValue)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.SEARCH_USERS_SUCCESS);
      done();
    });
  });

  it('handles deleting a user', (done) => {
    const deletedUser = 1;
    const expectedAction = [{ type: types.DELETE_USER_SUCCESS, data: { users: [] } }];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(userAction.deleteUser(deletedUser)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.DELETE_USER_SUCCESS);
      done();
    });
  });

  it('handles updating a user', (done) => {
    const updatedUser = { id: 1 };
    const expectedAction = [{ type: types.UPDATE_USER_SUCCESS, data: { users: [{ id: 1 }] } }];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(userAction.updateUser(updatedUser)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.UPDATE_USER_SUCCESS);
      done();
    });
  });

  it('should login a user successfully', (done) => {
    const user = { email: 'isendi@gmail.com', password: 'password' };
    const expectedAction = [
      { type: types.LOGGEDIN_USER, user },
      { type: types.SUCCESS_MESSAGE, message: 'user login successful' },
    ];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(userAction.login(user)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should logout a user successfully', (done) => {
    const user = { email: 'isendi@gmail.com', password: 'password' };
    const expectedAction = [
      { type: types.LOGOUT_USER, user },
    ];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(userAction.logout(user)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
