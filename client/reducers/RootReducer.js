import { combineReducers } from 'redux';
import users from './UsersReducer';
import user from './UserReducer';
import roles from './RoleReducer';
import document from './DocumentReducer';
import documents from './DocumentsReducer';
import message from './MessageReducer';
import isAuth from './AuthUserReducer';
import loggedInUserDocuments from './LoggedInUserDocumentsReducer';
import paginatedDocuments from './DocumentPaginationReducer';

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

