import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/authentication';

export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}
export function searchUsersSuccess(users) {
  return { type: types.SEARCH_USERS_SUCCESS, users };
}
export function getUserSuccess(users) {
  return { type: types.GET_ALL_USERS_SUCCESS, users };
}
export function getOneUserSuccess(user) {
  return { type: types.GET_ONE_USER_SUCCESS, user };
}
export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}
export function setCurrentUser(user) {
  return { type: types.SET_LOGGEDIN_USER, user };
}
export function logoutUser(user) {
  return { type: types.LOGOUT_USER, user };
}
export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function search(username) {
  return dispatch => axios.get(`/api/search/users/?q=${username}`)
  .then((response) => {
    dispatch(searchUsersSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

export function getAllUsers(users) {
  return dispatch => axios.get('/api/users', users)
  .then((response) => {
    dispatch(getUserSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error));
  });
}

export function getOneUser(id) {
  return dispatch => axios.get(`/api/users/${id}`)
  .then((response) => {
    console.log('response', response);
    dispatch(getOneUserSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

export function createUser(user) {
  return dispatch => axios.post('api/users', user)
    .then((response) => {
      dispatch(passSuccessMessage(response.data.message));
      dispatch(setCurrentUser(response.data.user));
    })
    .catch((error) => {
      console.log('Error: ', error);
      dispatch(passFailureMessage(error.response.data.message));
    });
}

export function login(user) {
  console.log('action user', user);
  return dispatch => axios.post('api/users/login', user)
    .then((response) => {
      const token = response.data.token;
      const stringyToken = `${token}`;
      localStorage.setItem('shelftoken', stringyToken);
      const storedToken = localStorage.shelftoken;
      dispatch(passSuccessMessage(response.data.message));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      console.log('response', response.data);
      dispatch(setCurrentUser(response.data));
    })
    .catch((error) => {
      console.log('Error', error);
      dispatch(passFailureMessage(error.response.data.message));
      console.log('Error Message', error.response.data.message);
      // console.log('Error', response.data.message);
    });
}

export function logout() {
  console.log('logout');
  return (dispatch) => {
    localStorage.removeItem('shelftoken');
    // setAuthorizationToken(false);
    dispatch(logoutUser({}));
  };
}

export function updateUser(id, user) {
  return dispatch => axios.put(`/api/users/${id}`, user)
  .then((response) => {
    dispatch(updateUserSuccess(response.data.user));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * delete user from database using DELETE api route /api/user/:id
 *
 * @export
 * @param {any} id - The ID of the user to be deleted
 * @returns {object} users
 */
export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(getAllUsers());
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}
