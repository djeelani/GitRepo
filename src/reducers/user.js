import { CURRENT_USER__SUCCESS } from '../actions/actionTypes';

const initialState = {
  currentUser: {},
};

function user(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER__SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.user,
      });
    default:
      return state;
  }
}

export default user;
