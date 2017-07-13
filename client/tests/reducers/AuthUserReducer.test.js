import expect from 'expect';
import authReducer from '../../reducers/AuthUserReducer';
import initialState from '../../reducers/InitialState';
import * as userActions from '../../actions/UserActions';

describe('Authenticated Users Reducer', () => {
  it('should have a null initialState', () => {
    const auth = {
      isAuthenticated: false,
      loggedInUser: null,
      loggedInUserRole: null,
    };
    expect(initialState.isAuth).toEqual(auth);
  });

  it('should fetch loggedin user when passed USER_DATA', () => {
    const user = [{ username: 'A' }];
    const action = userActions.setCurrentUser({ isAuthenticated: true, user });
    const newState = authReducer(initialState.authenticated, action);
    expect(newState.isAuthenticated).toEqual(true);
  });

//   it('should fetch loggedin user when passed USER_DATA', () => {
//     const action = userActions.setCurrentUser({ isAuth: false });
//     const newState = authReducer(initialState.authenticated, action);
//     expect(newState.isAuth).toEqual(false);
//   });
});
