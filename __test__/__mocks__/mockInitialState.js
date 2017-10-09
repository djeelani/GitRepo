import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import './mockSessionStorage.js';

export const mockInitialState = {
  message: '',
  tradeTransaction: {
    transactions: [],
    transactionsHistory: { history: [], poNumber: '' },
  },
  users: {
    currentUser: {},
  },
  uploadDocument: { document: [] },
};

const middlewares = [thunk];

export const mockStore = configureStore(middlewares);
