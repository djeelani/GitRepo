import {
  FLASH_MESSAGE__FAILURE,
  SPINNER_TRUE,
  AUTH__SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  list: [],
  spinner: false,
};

function messsage(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE__FAILURE:
      return Object.assign({}, state, {
        message: action.message,
        spinner: false,
      });
    case SPINNER_TRUE:
      return Object.assign({}, state, {
        message: '',
        spinner: true,
      });
    case AUTH__SUCCESS:
      return Object.assign({}, state, {
        message: '',
        spinner: false,
      });
    default:
      return state;
  }
}

export default messsage;
