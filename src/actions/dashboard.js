import * as types from './actionTypes';
import { SELLER, BUYER, SELLERBANKER, BUYERBANKER } from '../config/envConfig';
import {
  SORT_FIELD_ACTION_REQUIRED,
  SORT_FIELD_COUNTER_PARTY,
  SORT_FIELD_DATE_MODIFIED,
} from '../utils/constants';

export function counterParty(txn) {
  const role = process.env.REACT_APP_ROLE;

  if (role === SELLER || role === SELLERBANKER) {
    return txn.buyer.companyName;
  } else if (role === BUYER || role === BUYERBANKER) {
    return txn.seller.companyName;
  }
}

export function sortTransaction(sortByField, transactions) {
  return function(dispatch) {
    if (sortByField === SORT_FIELD_ACTION_REQUIRED) {
      let actionRequiredTxnArry = [];
      let noActionRequiredTxnArry = [];
      for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].context.actionRequired) {
          actionRequiredTxnArry.push(transactions[i]);
        } else {
          noActionRequiredTxnArry.push(transactions[i]);
        }
      }
      actionRequiredTxnArry.sort(function(a, b) {
        var statusA = a.status.displayText;
        var statusB = b.status.displayText;
        if (statusA < statusB) {
          return -1;
        } else if (statusA > statusB) {
          return 1;
        } else {
          return 0;
        }
      });
      noActionRequiredTxnArry.sort(function(a, b) {
        var statusA = a.status.displayText;
        var statusB = b.status.displayText;
        if (statusA < statusB) {
          return -1;
        } else if (statusA > statusB) {
          return 1;
        } else {
          return 0;
        }
      });
      transactions = [];
      actionRequiredTxnArry.push.apply(
        actionRequiredTxnArry,
        noActionRequiredTxnArry
      );
      transactions = actionRequiredTxnArry;
    } else if (sortByField === SORT_FIELD_COUNTER_PARTY) {
      transactions.sort(function(a, b) {
        var counterA = counterParty(a);
        var counterB = counterParty(b);
        if (counterA < counterB) {
          return -1;
        } else if (counterA > counterB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortByField === SORT_FIELD_DATE_MODIFIED) {
      transactions.sort(function(a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    }
    dispatch(sortTransactionSuccess(transactions, sortByField));
  };
}

export function expandTransaction(id, transactions) {
  return function(dispatch) {
    var toggle;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].id === id) {
        if (transactions[i].expanded) {
          transactions[i].expanded = false;
          toggle = false;
        } else {
          transactions[i].expanded = true;
          toggle = true;
        }
      } else {
        transactions[i].expanded = false;
      }
    }
    dispatch(sortTransactionSuccess(transactions, id + '' + toggle));
  };
}

export function sortTransactionSuccess(transactions, sortByField) {
  if (sortByField === SORT_FIELD_ACTION_REQUIRED) {
    return {
      type: types.SORTACTION_TRANSACTION__SUCCESS,
      transactions,
      sortByField,
    };
  } else {
    return { type: types.SORT_TRANSACTION__SUCCESS, sortByField };
  }
}
