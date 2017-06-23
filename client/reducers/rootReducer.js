import { combineReducers } from 'redux';
import users from './userReducer';
import roles from './roleReducer';
import document from './docReducer';
import documents from './documentReducer';
import message from './messageReducer';
import searchResults from './searchReducer';
import isAuth from './authUserReducer';

const rootReducer = combineReducers({
  users,
  document,
  roles,
  documents,
  message,
  searchResults,
  isAuth,
});

export default rootReducer;

