import * as types from '../actions/actionTypes';

const initialState = {
  document: [],
  applicationId: 0,
  fileUploadObject: {},
  spinnerUpload: false,
};

function uploadDocument(state = initialState, action) {
  let newState;
  switch (action.type) {
    case types.FILE_UPLOAD__SUCCESS:
      newState = Object.assign({}, state);
      newState.document.push(action.upload);
      newState.fileUploadObject = action.upload;
      newState.spinnerUpload = false;
      return newState;

    case types.FILE_REMOVE__SUCCESS:
      newState = Object.assign({}, state);
      var index;
      for (var i = 0; i < newState.document.length; i++) {
        if (newState.document[i].name === action.fileName) {
          index = i;
          break;
        }
      }
      newState.document.splice(index, 1);
      newState.fileUploadObject = {};
      newState.spinnerUpload = false;
      return newState;

    case types.FILE_UPLOAD_DASHBOARD__APPID:
      newState = Object.assign({}, state);
      newState.applicationId = action.upload.applicationId;
      newState.fileUploadObject = action.upload;
      newState.spinnerUpload = false;
      return newState;

    case types.SPINNER_UPLOAD_TRUE:
      return Object.assign({}, state, {
        spinnerUpload: true,
      });

    case types.FILE_UPLOAD_DASHBOARD__DRAFT:
      return Object.assign({}, state, {
        document: action.documents,
      });

    case types.SET_UPLOAD_DOCUMENT_FOR_NEW_APP:
      return Object.assign({}, state, {
        document: [],
        applicationId: 0,
      });

    case types.FILE_UPLOAD_DOCUMENTS__CLEAR:
      return Object.assign({}, state, {
        document: [],
        spinnerUpload: false,
      });
    case types.FLASH_MESSAGE__FAILURE:
      return Object.assign({}, state, {
        spinnerUpload: false,
      });
    default:
      return state;
  }
}

export default uploadDocument;
