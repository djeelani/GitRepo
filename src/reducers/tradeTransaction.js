import {
  SEARCH_USER__SUCCESS,
  SEARCH_USER__FAILURE,
  EDIT_SEARCH_USER__SUCCESS,
  SAVE_TRANSACTION__SUCCESS,
  SAVE_TRANSACTION__FAILURE,
  SHOW_FAILURE_TRANSACTION__FALSE,
  FETCH_TRANSACTION__FAILURE,
  FETCH_TRANSACTION__SUCCESS,
  UPDATE_TRANSACTION__SUCCESS,
  FETCH_TRANSACTION_HISTORY__SUCCESS,
  DIALOG_FALSE,
  SORT_TRANSACTION__SUCCESS,
  SORTACTION_TRANSACTION__SUCCESS,
  SET_COUNTER_PARTY_DETAILS_ACTIVE,
  SET_ITEM_DETAILS_ACTIVE,
  SET_ORDER_DETAILS_ACTIVE,
  SET_TRADE_CONDITIONS_ACTIVE,
  SPINNER_TRUE,
  FILE_UPLOAD_DASHBOARD_SPINNER,
  SET_TRADE_TRANSACTION_FOR_DRAFT_APP,
  DRAFT_DIALOG_FALSE,
  SET_TRADE_TRANSACTION_FOR_NEW_APP,
  UPDATE_UNITPRICE,
  UPDATE_QUANTITY,
} from '../actions/actionTypes';

const initialState = {
  buyer: {},
  counterPartyDetailsActive: true,
  orderDetailsActive: false,
  error: '',
  itemDetailsActive: false,
  tradeConditionsActive: false,
  spinner: false,
  showSuccessTransaction: false,
  showFailureTransaction: false,
  successMessage: '',
  failureMessage: '',
  transactions: [],
  visible: false,
  transactionsHistory: {},
  unitPrice: [],
  quantity: [],
  updatedUnitPrice: 0,
  updatedQuantity: 0,
};

function user(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER__SUCCESS:
      return {
        ...state,
        buyer: action.user,
        orderDetailsActive: true,
        counterPartyDetailsActive: false,
        error: '',
        spinner: false,
      };
    case SEARCH_USER__FAILURE:
      return {
        ...state,
        counterPartyDetailsActive: true,
        orderDetailsActive: false,
        buyer: {},
        error: action.error,
        spinner: false,
      };
    case EDIT_SEARCH_USER__SUCCESS:
      return {
        ...state,
        counterPartyDetailsActive: true,
        orderDetailsActive: false,
        spinner: false,
      };
    case SAVE_TRANSACTION__SUCCESS:
      return {
        ...state,
        showSuccessTransaction: true,
        showFailureTransaction: false,
        successMessage: action.successMessage,
        failureMessage: '',
        spinner: false,
      };
    case SAVE_TRANSACTION__FAILURE:
      return {
        ...state,
        showSuccessTransaction: false,
        showFailureTransaction: true,
        successMessage: '',
        failureMessage: action.failureMessage,
        spinner: false,
      };
    case SHOW_FAILURE_TRANSACTION__FALSE:
      return {
        ...state,
        showSuccessTransaction: false,
        showFailureTransaction: false,
        successMessage: '',
        failureMessage: '',
        spinner: false,
      };
    case FETCH_TRANSACTION__FAILURE:
      return {
        ...state,
        failureMessage: action.failureMessage,
        spinner: false,
      };
    case FETCH_TRANSACTION__SUCCESS: {
      let transactionsArray = action.transactions.result;
      for (var i = 0; i < transactionsArray.length; i++) {
        transactionsArray[i].expanded = false;
        transactionsArray[i].spinnerUpload = false;
        transactionsArray[i].errorMessage = '';
      }
      transactionsArray.sort(function(a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      return {
        ...state,
        transactions: transactionsArray,
        spinner: false,
      };
    }
    case UPDATE_TRANSACTION__SUCCESS:
      return {
        ...state,
        successMessage: action.successMessage,
        spinner: false,
      };
    case SPINNER_TRUE:
      return {
        ...state,
        error: '',
        spinner: true,
      };
    case SORT_TRANSACTION__SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.sortByField,
        spinner: false,
      });
    case SORTACTION_TRANSACTION__SUCCESS:
      return Object.assign({}, state, {
        transactions: action.transactions,
        successMessage: action.sortByField,
        spinner: false,
      });
    case FILE_UPLOAD_DASHBOARD_SPINNER:
      return Object.assign({}, state, {
        successMessage: action.fileName,
      });
    case FETCH_TRANSACTION_HISTORY__SUCCESS:
      return Object.assign({}, state, {
        transactionsHistory: action.transactionHistory,
        visible: true,
      });
    case SET_TRADE_TRANSACTION_FOR_DRAFT_APP:
      return Object.assign({}, state, {
        itemDetailsActive: false,
        counterPartyDetailsActive: false,
        orderDetailsActive: false,
        tradeConditionsActive: true,
        counterPartyEinOrVatin: action.application.buyer.legalId,
        purchaseOrderNumber: action.application.poNumber,
        billOfLadingNumber: action.application.billOfLadingNum,
        creationDate: action.application.poCreationDate,
        deliveryDate: action.application.poDeliveryDate,
        price: action.application.price,
        currency: action.application.currency,
        incoterms: action.application.incoterms,
        deliveryAddress: action.application.deliveryAddress,
        paymentGuaranteeRequested: action.application.paymentGuarantee,
        invoiceFinancingRequested: action.application.invoiceFinancing,
        itemName: action.itemName,
        unitPrice: action.unitPrice,
        type: action.itemType,
        quantity: action.quantity,
        total: action.total,
        count: action.itemsSize,
        buyer: action.application.buyer,
        totalPrice: action.totalUnits,
        totalAmount: action.totalAmount,
        id: action.application.id,
        showNewItemForm: action.showNewItemForm,
      });
    case SET_TRADE_TRANSACTION_FOR_NEW_APP:
      return Object.assign({}, state, {
        itemDetailsActive: false,
        counterPartyDetailsActive: true,
        orderDetailsActive: false,
        tradeConditionsActive: false,
        counterPartyEinOrVatin: '',
        purchaseOrderNumber: '',
        billOfLadingNumber: '',
        creationDate: '',
        deliveryDate: '',
        price: 0,
        currency: '',
        incoterms: '',
        deliveryAddress: '',
        paymentGuaranteeRequested: false,
        invoiceFinancingRequested: false,
        itemName: [],
        unitPrice: [],
        type: [],
        quantity: [],
        total: [],
        count: 1,
        buyer: {},
        totalPrice: 0,
        totalAmount: 0,
        id: undefined,
        showNewItemForm: [],
      });
    case DIALOG_FALSE:
      return Object.assign({}, state, {
        visible: false,
      });
    case DRAFT_DIALOG_FALSE:
      return Object.assign({}, state, {
        showSuccessTransaction: false,
        showFailureTransaction: false,
        failureMessage: '',
      });
    case SET_COUNTER_PARTY_DETAILS_ACTIVE:
      return {
        ...state,
        counterPartyDetailsActive: true,
        orderDetailsActive: false,
        itemDetailsActive: true,
        tradeConditionsActive: true,
        spinner: false,
        error: '',
      };
    case SET_ITEM_DETAILS_ACTIVE:
      return {
        ...state,
        counterPartyDetailsActive: false,
        orderDetailsActive: false,
        itemDetailsActive: true,
        tradeConditionsActive: true,
        spinner: false,
      };
    case SET_ORDER_DETAILS_ACTIVE:
      return {
        ...state,
        counterPartyDetailsActive: false,
        orderDetailsActive: true,
        itemDetailsActive: false,
        tradeConditionsActive: true,
        spinner: false,
      };
    case SET_TRADE_CONDITIONS_ACTIVE:
      return {
        ...state,
        counterPartyDetailsActive: false,
        orderDetailsActive: false,
        itemDetailsActive: false,
        tradeConditionsActive: true,
        showFailureTransaction: false,
        showSuccessTransaction: false,
        spinner: false,
      };
    case UPDATE_UNITPRICE:
      return Object.assign({}, state, {
        updatedUnitPrice: action.unitPrice,
      });
    case UPDATE_QUANTITY:
      return Object.assign({}, state, {
        updatedQuantity: action.quantity,
      });
    default: {
      return state;
    }
  }
}

export default user;
