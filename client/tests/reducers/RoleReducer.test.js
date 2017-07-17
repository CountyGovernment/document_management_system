import expect from 'expect';
import { createStore } from 'redux';
import RoleReducer from '../../reducers/RoleReducer';
import rootReducer from '../../reducers/RootReducer';
import initialState from '../../reducers/InitialState';
import * as roleActions from '../../actions/RoleActions';

describe('Role Reducer', () => {
  it('should return a list of all roles.', () => {
    const store = createStore(rootReducer, initialState);

    const roles = [];

    const action = roleActions.getRoleSuccess(roles);
    store.dispatch(action);

    const actual = store.getState().roles;
    const expected = roles;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

//   it('Should handle creating roles', () => {
//     const store = createStore(rootReducer, initialState);
//     const role = {
//       title: 'roletest',
//     };

//     const action = roleActions.createRoleSuccess(role);
//     store.dispatch(action);

//     const actual = store.getState().roles[0];
//     const expected = role;

//     expect(actual).toEqual(expected);
//   });
});
