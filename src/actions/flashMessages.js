import * as types from './actionTypes';

export function createErrorMessage(message) {
  return { type: types.FLASH_MESSAGE__FAILURE, message };
}
