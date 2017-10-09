import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import message from './message';
import tradeTransaction from './tradeTransaction';
import uploadDocument from './uploadDocument';
import users from './user';

const root = combineReducers({
  router: routerReducer,
  message,
  tradeTransaction,
  uploadDocument,
  users
});

export default root;
