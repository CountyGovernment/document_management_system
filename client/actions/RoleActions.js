import axios from 'axios';
import * as types from './ActionTypes';

export function getRoleSuccess(roles) {
  return { type: types.GET_ALL_ROLES_SUCCESS, roles };
}
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}
export function createRoleSuccess(roles) {
  return { type: types.CREATE_ROLES_SUCCESS, roles };
}

export function getAllRoles() {
  return dispatch => axios.get('/api/roles')
  .then((response) => {
    dispatch(getRoleSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

export function createRole(role) {
  return dispatch => axios.post('api/documents', role)
  .then((response) => {
    dispatch(createRoleSuccess(response.data.role));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}
