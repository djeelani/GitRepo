import * as types from './actionTypes';
import axios from 'axios';
import base64_arraybuffer from 'base64-arraybuffer';
import { createErrorMessage } from './flashMessages';
import { API_UPLOAD, API_DLT, API_SAVE } from '../config/apiConfig';

//==========================Document Upload=====================================
export function upload(file, fileApplicationId, tradeTransactions) {
  let appData;
  let fileName = file.name.replace(/ /g, '_');
  if (file.uploadResult instanceof ArrayBuffer) {
    appData =
      'data:other/other;base64,' + base64_arraybuffer.encode(file.uploadResult);
  } else if (
    !(file.uploadResult instanceof ArrayBuffer) &&
    !checkForbase64Encoding(file.uploadResult)
  ) {
    appData = 'data:other/other;base64,' + window.btoa(file.uploadResult);
  } else {
    appData = file.uploadResult;
  }
  return function(dispatch) {
    axios({
      method: 'POST',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/${API_UPLOAD}?name=${fileName}`,
      headers: {
        Authorization: sessionStorage.getItem('jwt'),
      },
      data: appData,
    })
      .then(function(response) {
        if (response.status === 200) {
          let upload = {
            name: response.data.name,
            url: response.data.url,
            hash: response.data.hash,
            applicationId: fileApplicationId,
          };
          if (fileApplicationId !== 0 && fileApplicationId !== undefined) {
            dispatch(saveDocumentHashToDLT(upload, tradeTransactions));
          } else {
            dispatch(fileUploadSuccess(upload));
          }
        } else {
          const message = 'Failed while uploading a document.';
          dispatch(createErrorMessage(message));
          if (tradeTransactions !== undefined) {
            for (var i = 0; i < tradeTransactions.length; i++) {
              if (fileApplicationId === tradeTransactions[i].id) {
                tradeTransactions[i].spinnerUpload = false;
                tradeTransactions[i].errorMessage = message;
                break;
              }
            }
            dispatch(dashboardFileUploadSpinnerTrueOrFalse('error' + fileName));
          }
        }
      })
      .catch(function() {
        const message = 'Failed while uploading a document.';
        dispatch(createErrorMessage(message));
        if (tradeTransactions !== undefined) {
          for (var i = 0; i < tradeTransactions.length; i++) {
            if (fileApplicationId === tradeTransactions[i].id) {
              tradeTransactions[i].spinnerUpload = false;
              tradeTransactions[i].errorMessage = message;
              break;
            }
          }
          dispatch(dashboardFileUploadSpinnerTrueOrFalse('error' + fileName));
        }
      });
  };
}

export function checkForbase64Encoding(value) {
  var base64Matcher = value.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);
  return base64Matcher !== null && base64Matcher.length === 3;
}

export function saveDocument(upload, tradeTransactions) {
  return function(dispatch) {
    axios({
      method: 'POST',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/${API_SAVE}/${upload.applicationId}/documents`,
      headers: {
        Authorization: sessionStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      data: {
        name: upload.name,
        url: upload.url,
        hash: upload.hash,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          upload.id = response.data.documentId;
          dispatch(dashboardFileUploadApplicationId(upload));
          if (tradeTransactions !== undefined) {
            for (var i = 0; i < tradeTransactions.length; i++) {
              if (upload.applicationId === tradeTransactions[i].id) {
                tradeTransactions[i].spinnerUpload = false;
                break;
              }
            }
            dispatch(dashboardFileUploadSpinnerTrueOrFalse(upload.url));
          }
        } else {
          const message = 'Failed while saving a document.';
          dispatch(createErrorMessage(message));
          if (tradeTransactions !== undefined) {
            for (var j = 0; j < tradeTransactions.length; j++) {
              if (upload.applicationId === tradeTransactions[j].id) {
                tradeTransactions[j].spinnerUpload = false;
                tradeTransactions[i].errorMessage = message;
                break;
              }
            }
            dispatch(
              dashboardFileUploadSpinnerTrueOrFalse('error' + upload.url)
            );
          }
        }
      })
      .catch(function() {
        const message = 'Failed while saving a document.';
        dispatch(createErrorMessage(message));
        if (tradeTransactions !== undefined) {
          for (var i = 0; i < tradeTransactions.length; i++) {
            if (upload.applicationId === tradeTransactions[i].id) {
              tradeTransactions[i].spinnerUpload = false;
              tradeTransactions[i].errorMessage = message;
              break;
            }
          }
          dispatch(dashboardFileUploadSpinnerTrueOrFalse('error' + upload.url));
        }
      });
  };
}

export function saveDocumentHashToDLT(upload, tradeTransactions) {
  return function(dispatch) {
    axios({
      method: 'POST',
      url: `${process.env
        .REACT_APP_SERVICE_URL}/${API_DLT}/${upload
        .applicationId}/dochash?role=${process.env.REACT_APP_ROLE}`,
      headers: {
        Authorization: sessionStorage.jwt,
      },
      data: `${upload.hash}`,
    })
      .then(function(response) {
        if (response.status !== 201) {
          const message = 'Failed while uploading the document.';
          dispatch(createErrorMessage(message));
          if (tradeTransactions !== undefined) {
            for (var j = 0; j < tradeTransactions.length; j++) {
              if (upload.applicationId === tradeTransactions[j].id) {
                tradeTransactions[j].spinnerUpload = false;
                tradeTransactions[j].errorMessage = message;
                break;
              }
            }
            dispatch(
              dashboardFileUploadSpinnerTrueOrFalse('error' + upload.url)
            );
          }
        } else {
          dispatch(saveDocument(upload, tradeTransactions));
        }
      })
      .catch(function(error) {
        if(error.response && 
            error.response.data &&
            error.response.data.error &&
            error.response.status === 500) {
          const message = `Failed while uploading the document - ${error.response.data.error}`;
          dispatch(createErrorMessage(message));
          if (tradeTransactions !== undefined) {
            for (var k = 0; k < tradeTransactions.length; k++) {
              if (upload.applicationId === tradeTransactions[k].id) {
                tradeTransactions[k].spinnerUpload = false;
                tradeTransactions[k].errorMessage = message;
                break;
              }
            }
            dispatch(dashboardFileUploadSpinnerTrueOrFalse('error' + upload.url));
          }
        } else {
          const message = 'Failed while uploading the document.';
          dispatch(createErrorMessage(message));
          if (tradeTransactions !== undefined) {
            for (var j = 0; j < tradeTransactions.length; j++) {
              if (upload.applicationId === tradeTransactions[j].id) {
                tradeTransactions[j].spinnerUpload = false;
                tradeTransactions[j].errorMessage = message;
                break;
              }
            }
            dispatch(dashboardFileUploadSpinnerTrueOrFalse('error' + upload.url));
          } 
        }
      });
  };
}

export function removeUpload(fileName) {
  return function(dispatch) {
    dispatch(fileRemoveSuccess(fileName));
  };
}

export function fileUploadSuccess(upload) {
  return { type: types.FILE_UPLOAD__SUCCESS, upload };
}

export function fileRemoveSuccess(fileName) {
  return { type: types.FILE_REMOVE__SUCCESS, fileName };
}

export function dashboardFileUploadApplicationId(upload) {
  return { type: types.FILE_UPLOAD_DASHBOARD__APPID, upload };
}

export function dashboardFileUploadOnDraft(documents) {
  return { type: types.FILE_UPLOAD_DASHBOARD__DRAFT, documents };
}

export function setUploadDocumentForNewApplication() {
  return { type: types.SET_UPLOAD_DOCUMENT_FOR_NEW_APP };
}

export function dashboardFileUploadSpinnerTrueOrFalse(fileName) {
  return { type: types.FILE_UPLOAD_DASHBOARD_SPINNER, fileName };
}
