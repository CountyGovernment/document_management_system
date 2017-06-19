import { combineReducers } from 'redux';
import users from './userReducer';
import roles from './roleReducer';
import documents from './documentReducer';
import message from './messageReducer';
import searchResults from './searchReducer';
import isAuth from './authUserReducer';

const rootReducer = combineReducers({
  users,
  roles,
  documents,
  message,
  searchResults,
  isAuth,
});

export default rootReducer;

