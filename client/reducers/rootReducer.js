import { combineReducers } from 'redux';
import users from './usersReducer';
import user from './userReducer';
import roles from './roleReducer';
import document from './docReducer';
import documents from './documentsReducer';
import message from './messageReducer';
import isAuth from './authUserReducer';
import loggedInUserDocuments from './loggedInUserDocumentsReducer';
import paginatedDocuments from './documentPaginationReducer';

const rootReducer = combineReducers({
  users,
  user,
  document,
  roles,
  documents,
  message,
  isAuth,
  loggedInUserDocuments,
  paginatedDocuments,
});

export default rootReducer;

