import { combineReducers } from 'redux';
import users from './userReducer';
import roles from './rolesReducer';
import documents from './documentReducer';

const rootReducer = combineReducers({
  users,
  roles,
  documents,
});

export default rootReducer