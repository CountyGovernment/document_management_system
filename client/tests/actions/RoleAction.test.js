import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/ActionTypes';
import * as roleAction from '../../actions/RoleActions';

describe('Role action', () => {
  describe('create a role', () => {
    it('should create a role CREATE_ROLE_SUCCESS action', () => {
      const roles = { roletitle: 'staff' };
      const expectedAction = {
        type: types.CREATE_ROLES_SUCCESS,
        roles,
      };
      const action = roleAction.createRoleSuccess(roles);

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

  it('get all role', (done) => {
    const expectedAction = [{ type: types.GET_ALL_ROLES_SUCCESS, body: { roles: [{ id: 6, roletitle: 'elixir' }] } }];
    const store = mockStore({ roless: [] }, expectedAction, done());
    store.dispatch(roleAction.getAllRoles()).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.GET_ALL_ROLES_SUCCESS);
      done();
    });
  });

  it('create a role', (done) => {
    const expectedAction = [{ type: types.CREATE_ROLES_SUCCESS, body: { roletitle: 'staff' } }];
    const store = mockStore({ roles: [] }, expectedAction, done());
    store.dispatch(roleAction.createRole()).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.CREATE_ROLE_SUCCESS);
      done();
    });
  });
});
