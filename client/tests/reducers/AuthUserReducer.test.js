import expect from 'expect';
import { createStore } from 'redux';
import authReducer from '../../reducers/AuthUserReducer';
import initialState from '../../reducers/InitialState';
import rootReducer from '../../reducers/RootReducer';
import * as userActions from '../../actions/UserActions';

describe('Auth Users Reducer', () => {
  it('should have a null initialState', () => {
    const auth = {
      isAuthenticated: false,
      loggedInUser: null,
      loggedInUserRole: null,
    };
    expect(initialState.isAuth).toEqual(auth);
  });

  it('should fetch loggedin user', () => {
    const user = [{ username: 'A' }];
    const action = userActions.setCurrentUser({ isAuthenticated: true, user });
    const newState = authReducer(initialState.authenticated, action);
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should logout user', () => {
    const action = userActions.logoutUser({ isAuthenticated: false });
    const newState = authReducer(initialState.authenticated, action);
    expect(newState.isAuthenticated).toEqual(false);
  });
});
