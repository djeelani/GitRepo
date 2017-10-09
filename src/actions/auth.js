import * as types from './actionTypes';
import axios from 'axios';
import { createErrorMessage } from './flashMessages';
import { API_AUTHENTICATE, API_GET_CURRENT_USER } from '../config/apiConfig';
//=========================Helpers==============================================

function setSessionItem(item, value) {
  sessionStorage.setItem(item, value);
}

//=========================Login================================================
export function loginUser(creds) {
  return function(dispatch) {
    return axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVICE_URL}/${API_AUTHENTICATE}`,
      headers: {
        'x-bank-code': creds.bankCode,
        'x-user-type': creds.role,
        'Content-Type': 'application/json',
      },
      data: {
        userName: creds.userName,
        password: creds.password,
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          const { jwt } = response.data;
          setSessionItem('jwt', jwt);
        } else {
          dispatch(authFailure());
          const message = 'Username or Password is incorrect. Please try again.';
          dispatch(createErrorMessage(message));
        }
      })
      .catch(function(error) {
        if(error.response === undefined) {
          dispatch(authFailure());
          const message = 'Service is unavailable. Please try after some time.';
          dispatch(createErrorMessage(message));
        } else {
          dispatch(authFailure());
          const message = 'Username or Password is incorrect. Please try again.';
          dispatch(createErrorMessage(message));
        }
      });
  };
}

export function getCurrentUser() {
  return function(dispatch) {
    return axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVICE_URL}/${API_GET_CURRENT_USER}`,
      headers: {
        Authorization: sessionStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          const { user } = response.data;
          setSessionItem('user', JSON.stringify(user));
        } else {
          dispatch(currentUserFailure());
          const message = 'Error while fetching user details.';
          dispatch(createErrorMessage(message));
        }
      })
      .catch(function() {
        dispatch(currentUserFailure());
        const message = 'Error while fetching user details.';
        dispatch(createErrorMessage(message));
      });
  };
}

export function authRequest() {
  return { type: types.AUTH__REQUEST };
}

export function authSuccess() {
  return { type: types.AUTH__SUCCESS };
}

export function authFailure() {
  return { type: types.AUTH__FAILURE };
}

export function currentUserSuccess(user) {
  return { type: types.CURRENT_USER__SUCCESS, user };
}

export function currentUserFailure() {
  return { type: types.CURRENT_USER__FAILURE };
}

export function spinnerTrue() {
  return { type: types.SPINNER_TRUE };
}

export function spinnerUploadTrue() {
  return { type: types.SPINNER_UPLOAD_TRUE };
}
