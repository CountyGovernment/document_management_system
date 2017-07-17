import expect from 'expect';
import { createStore } from 'redux';
import authReducer from '../../reducers/AuthUserReducer';
import initialState from '../../reducers/InitialState';
import rootReducer from '../../reducers/RootReducer';
import * as userActions from '../../actions/UserActions';

describe('Auth Users Reducer', () => {
  // it('should have a null initialState', () => {
  //   const auth = {
  //     isAuth: false,
  //     loggedInUser: null,
  //     loggedInUserRole: null,
  //   };
  //   expect(initialState.isAuth).toEqual(auth);
  // });

  it('should fetch loggedin user when passed USER_DATA', () => {
    const user = [{ username: 'A' }];
    const action = userActions.setCurrentUser({ isAuthenticated: true, user });
    const newState = authReducer(initialState.authenticated, action);
    expect(newState.isAuthenticated).toEqual(true);
  });

  // it('should logout user', () => {
  //   const action = userActions.logout({ isAuth: false });
  //   const newState = authReducer(initialState.auth, action);
  //   expect(newState.isAuth).toEqual(false);
  // });

  // it('logout a user', () => {
  //   const store = createStore(rootReducer, initialState);

  //   const isAuth = {
  //     isAuthenticated: false,
  //     loggedInUser: null,
  //     loggedInUserRole: null,
  //   };

  //   const action = userActions.logout(isAuth);
  //   store.dispatch(action);

  //   const actual = store.getState().isAuth;
  //   const expected = isAuth;

  //   expect(actual).toEqual(expected);
  //   expect(typeof actual).toBe('object');
  // });
});
