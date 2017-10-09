import * as types from './actionTypes';
import axios from 'axios';
import {
  API_SEARCH,
  API_SAVE,
  API_DLT,
  API_DLT_SAVE,
  API_GET_USERS,
} from '../config/apiConfig';
import status from '../utils/status';

export function searchUser(taxId) {
  return function(dispatch) {
    const token = sessionStorage.jwt;
    axios({
      method: 'GET',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/${API_SEARCH}?buyerTaxId=${taxId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (typeof response.data.error === 'undefined') {
          let { user } = response.data;
          dispatch(searchUserSuccess(user));
        } else {
          const error = 'No User Found';
          dispatch(searchUserFailure(error));
        }
      })
      .catch(function(error) {
        if (
          error !== undefined &&
          error.response !== undefined &&
          error.response.status === 400
        ) {
          const message = 'No User Found';
          dispatch(searchUserFailure(message));
        } else {
          const message = 'Service is unavailable please try after some time';
          dispatch(searchUserFailure(message));
        }
      });
  };
}

export function saveTransaction(transactionState, buyer) {
  return function(dispatch) {
    const token = sessionStorage.jwt;
    transactionState.paymentGuaranteeRequested = true;
    transactionState.invoiceFinancingRequested = true;
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${API_SAVE}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        appData: transactionState,
        appId: transactionState.id,
      },
    })
      .then(function(response) {
        if (typeof response.data.error === 'undefined') {
          dispatch(
            saveToDLT(transactionState, response.data.tradeApplicationId, buyer)
          );
        } else {
          const error = 'Application could not be saved';
          dispatch(saveTransactionFailure(error));
        }
      })
      .catch(function() {
        const message = 'Application could not be saved';
        dispatch(saveTransactionFailure(message));
      });
  };
}

export function saveToDLT(transactionState, tradeApplicationId, buyer) {
  return function(dispatch) {
    let deliveryDate = new Date(transactionState.deliveryDate);
    const seller = JSON.parse(sessionStorage.getItem('user'));
    const docHashes = [];
    let totalAmount;
    if (transactionState.totalAmount === undefined) {
      totalAmount = 0;
    } else {
      totalAmount = transactionState.totalAmount;
    }
    if (transactionState.documents !== undefined) {
      transactionState.documents.forEach(function(document) {
        docHashes.push(document.hash);
      });
    }
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_SERVICE_URL}/${API_DLT_SAVE}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
      data: {
        tradeTransaction: {
          applicationId: tradeApplicationId,
          deliveryDate: deliveryDate.toISOString(),
          amount: totalAmount,
          purchaseOrderNumber: transactionState.purchaseOrderNumber,
          sellerId: seller.id,
          buyerId: buyer.id,
        },
        documentHashes: docHashes,
      },
    })
      .then(function(response) {
        if (response.data.txStatus !== undefined) {
          dispatch(updateDB(tradeApplicationId, response.data.txStatus));
        } else {
          const error = 'Application could not be submitted';
          dispatch(saveTransactionFailure(error));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
          const message = `Application could not be submitted - ${error.response.data.error}`;
          dispatch(saveTransactionFailure(message));
        } else {
          const message = 'Application could not be submitted';
          dispatch(saveTransactionFailure(message));
        }
      });
  };
}

export function updateDB(id, statusCode) {
  const token = sessionStorage.jwt;
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/${API_SAVE}/${id}/status/${statusCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (typeof response.data.error === 'undefined') {
          dispatch(
            saveTransactionSuccess('Application Submitted Successfully')
          );
        } else {
          const error = 'Application could not be updated';
          dispatch(saveTransactionFailure(error));
        }
      })
      .catch(function() {
        const message = 'Application could not be updated';
        dispatch(saveTransactionFailure(message));
      });
  };
}

export function saveTransactionAsDraft(transactionState) {
  return function(dispatch) {
    const token = sessionStorage.jwt;
    transactionState.paymentGuaranteeRequested = true;
    transactionState.invoiceFinancingRequested = true;
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${API_SAVE}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        appData: transactionState,
        appId: transactionState.id,
      },
    })
      .then(function(response) {
        if (response.data.error === undefined) {
          dispatch(saveTransactionSuccess('Application Saved As Draft.'));
        } else {
          const error = 'Error while saving application.';
          dispatch(saveTransactionFailure(error));
        }
      })
      .catch(function() {
        const message = 'Error while saving application.';
        dispatch(saveTransactionFailure(message));
      });
  };
}

export function searchUserSuccess(user) {
  return { type: types.SEARCH_USER__SUCCESS, user };
}

export function searchUserFailure(error) {
  return { type: types.SEARCH_USER__FAILURE, error };
}

export function editSearchUserSuccess() {
  return { type: types.EDIT_SEARCH_USER__SUCCESS };
}

export function saveTransactionSuccess(successMessage) {
  return { type: types.SAVE_TRANSACTION__SUCCESS, successMessage };
}

export function saveTransactionFailure(failureMessage) {
  return { type: types.SAVE_TRANSACTION__FAILURE, failureMessage };
}

export function showFailureTransactionFalse() {
  return { type: types.SHOW_FAILURE_TRANSACTION__FALSE };
}

export function fetchTradeTransactionsByUser(userId) {
  return function(dispatch) {
    const token = sessionStorage.jwt;
    axios({
      method: 'GET',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/api/users/${userId}/applications`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          if (response.data.result === undefined) {
            response.data.result = [];
          }
          dispatch(fetchTransactionSuccess(response.data));
        } else {
          dispatch(fetchTransactionFailure(response.data.error));
        }
      })
      .catch(function() {
        const message = 'Applications could not be found';
        dispatch(fetchTransactionFailure(message));
      });
  };
}

export function approveRejectAction(
  dltAction,
  postDltAction,
  transactions,
  transactionApplicationId,
  actionType
) {
  return function(dispatch) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${dltAction}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
      data: user.id,
    })
      .then(function(response) {
        if (response.status === 201) {
          dispatch(
            approveRejectPostDltAction(
              postDltAction,
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
        const message = `Failed to update status for the application ${transactionApplicationId} - ` +
          error.response.data.error;
        dispatch(fetchTransactionFailure(message));
      } else {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message));
      }
      });
  };
}

export function trackingAction(
  dltAction,
  postDltAction,
  transactions,
  transactionApplicationId,
  trackingInputActionValue,
  actionType
) {
  return function(dispatch) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${dltAction}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
      data: {
        trackingId: trackingInputActionValue,
        updatedBy: user.id,
      },
    })
      .then(function(response) {
        if (response.status === 201) {
          dispatch(
            trackingPostDltAction(
              postDltAction,
              transactions,
              transactionApplicationId,
              trackingInputActionValue,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
        const message = `Failed to update status for the application ${transactionApplicationId} - ` +
          error.response.data.error;
        dispatch(fetchTransactionFailure(message)); 
      } else {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message)); 
      }
      });
  };
}

export function shipmentAction(
  dltAction,
  postDltAction,
  transactions,
  transactionApplicationId,
  actionType
) {
  return function(dispatch) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${dltAction}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
      data: user.id,
    })
      .then(function(response) {
        if (response.status === 201) {
          dispatch(
            shipmentPostDltAction(
              postDltAction,
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
        const message = `Failed to update status for the application ${transactionApplicationId} - ` +
          error.response.data.error;
        dispatch(fetchTransactionFailure(message)); 
      } else {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message)); 
      }
      });
  };
}

export function paymentAction(
  dltAction,
  postDltAction,
  transactions,
  transactionApplicationId,
  actionType
) {
  return function(dispatch) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${dltAction}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
      data: user.id,
    })
      .then(function(response) {
        if (response.status === 201) {
          dispatch(
            paymentPostDltAction(
              postDltAction,
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
        const message = `Failed to update status for the application ${transactionApplicationId} - ` +
          error.response.data.error;
        dispatch(fetchTransactionFailure(message)); 
      } else {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message)); 
      }
      });
  };
}

export function approveRejectPostDltAction(
  postDltAction,
  transactions,
  transactionApplicationId,
  actionType
) {
  const token = sessionStorage.jwt;
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_SERVICE_URL}/${postDltAction}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          dispatch(
            fetchTransactionStatusAndContextById(
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function() {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message));
      });
  };
}

export function trackingPostDltAction(
  postDltAction,
  transactions,
  transactionApplicationId,
  trackingInputActionValue,
  actionType
) {
  const token = sessionStorage.jwt;
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_SERVICE_URL}/${postDltAction}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: {
        trackingId: trackingInputActionValue,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          dispatch(
            fetchTransactionStatusAndContextById(
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function() {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message));
      });
  };
}

export function shipmentPostDltAction(
  postDltAction,
  transactions,
  transactionApplicationId,
  actionType
) {
  const token = sessionStorage.jwt;
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_SERVICE_URL}/${postDltAction}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          dispatch(
            fetchTransactionStatusAndContextById(
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function() {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message));
      });
  };
}

export function paymentPostDltAction(
  postDltAction,
  transactions,
  transactionApplicationId,
  actionType
) {
  const token = sessionStorage.jwt;
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_SERVICE_URL}/${postDltAction}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          dispatch(
            fetchTransactionStatusAndContextById(
              transactions,
              transactionApplicationId,
              actionType
            )
          );
        } else {
          const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function() {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message));
      });
  };
}

export function fetchTransactionStatusAndContextById(
  transactions,
  transactionApplicationId,
  actionType
) {
  return function(dispatch) {
    const token = sessionStorage.jwt;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user.id;
    axios({
      method: 'GET',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/api/users/${userId}/applications/${transactionApplicationId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].id === transactionApplicationId) {
              transactions[i] = response.data.result[0];
              transactions[i].expanded = true;
              break;
            }
          }
          const message =
            'Performed ' +
            actionType.toLowerCase() +
            ' on application : ' +
            transactionApplicationId;
          dispatch(updateTransactionSuccess(message));
        } else {
          const message =
            'Oops! Something went wrong' +
            ' for application : ' +
            transactionApplicationId;
          dispatch(fetchTransactionFailure(message));
        }
      })
      .catch(function() {
        const message = `Oops! Something went wrong for application: ${transactionApplicationId}`;
        dispatch(fetchTransactionFailure(message));
      });
  };
}

export function updateTransactionSuccess(successMessage) {
  return { type: types.UPDATE_TRANSACTION__SUCCESS, successMessage };
}

export function fetchTransactionSuccess(transactions) {
  return { type: types.FETCH_TRANSACTION__SUCCESS, transactions };
}

export function fetchTransactionFailure(failureMessage) {
  return { type: types.FETCH_TRANSACTION__FAILURE, failureMessage };
}

export function fetchTransactionHistoryDLT(appId) {
  return function(dispatch) {
    const id = appId;
    axios({
      method: 'GET',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/${API_DLT}/${id}/history?role=${process.env
          .REACT_APP_ROLE}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
    })
      .then(function(response) {
        if (response.status === 200 && response.data !== undefined) {
          dispatch(getUsers(response.data.history));
        } else {
          const error = 'Error while fetching application history.';
          dispatch(saveTransactionFailure(error));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
          const message = `Error while fetching application history. - ${error.response.data.error}`;
          dispatch(saveTransactionFailure(message));
        } else {
          const message = 'Error while fetching application history.';
          dispatch(saveTransactionFailure(message));
        }
      });
  };
}

export function getUsers(transactionHistory) {
  const token = sessionStorage.jwt;
  return function(dispatch) {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVICE_URL}/${API_GET_USERS}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          var users = response.data.users;
          var userId;
          for (var i = 0; i < transactionHistory.history.length; i++) {
            var hist = transactionHistory.history[i];
            for (var x in hist) {
              if (x === 'updatedBy') {
                userId = hist[x];
              }
            }
            for (var j = 0; j < users.length; j++) {
              var user = users[j];
              for (var y in user) {
                if (y === 'id' && user[y] === userId) {
                  hist['role'] = user['role'];
                  hist['companyName'] = user['companyName'];
                  hist['status'] = status[hist['status']];
                }
              }
            }
          }
          dispatch(fetchTransactionHistorySuccess(transactionHistory));
        } else {
          const error = 'Error while fetching application history.';
          dispatch(saveTransactionFailure(error));
        }
      })
      .catch(function() {
        const message = 'Error while fetching application history.';
        dispatch(saveTransactionFailure(message));
      });
  };
}

export function fetchTransactionHistorySuccess(transactionHistory) {
  return { type: types.FETCH_TRANSACTION_HISTORY__SUCCESS, transactionHistory };
}

export function setTradeTransactionForDraftApplication(
  application,
  itemName,
  unitPrice,
  itemType,
  quantity,
  total,
  itemsSize,
  totalUnits,
  totalAmount,
  showNewItemForm
) {
  return {
    type: types.SET_TRADE_TRANSACTION_FOR_DRAFT_APP,
    application,
    itemName,
    unitPrice,
    itemType,
    quantity,
    total,
    itemsSize,
    totalUnits,
    totalAmount,
    showNewItemForm,
  };
}

export function setTradeTransactionForNewApplication() {
  return { type: types.SET_TRADE_TRANSACTION_FOR_NEW_APP };
}

export function draftDialogFalse() {
  return { type: types.DRAFT_DIALOG_FALSE };
}

export function dialogFalse() {
  return { type: types.DIALOG_FALSE };
}

export function setCounterPartyDetailsActive() {
  return { type: types.SET_COUNTER_PARTY_DETAILS_ACTIVE };
}

export function setItemDetailsActive() {
  return { type: types.SET_ITEM_DETAILS_ACTIVE };
}

export function setOrderDetailsActive() {
  return { type: types.SET_ORDER_DETAILS_ACTIVE };
}

export function setTradeConditionsActive() {
  return { type: types.SET_TRADE_CONDITIONS_ACTIVE };
}

export function sortTransactionSuccess(sortValue) {
  return { type: types.SORT_TRANSACTION__SUCCESS, sortValue };
}

export function clearUploadedDocuments() {
  return { type: types.FILE_UPLOAD_DOCUMENTS__CLEAR };
}

export function updateUnitPrice(unitPrice) {
  return { type: types.UPDATE_UNITPRICE, unitPrice };
}

export function updateQuantity(quantity) {
  return { type: types.UPDATE_QUANTITY, quantity };
}
