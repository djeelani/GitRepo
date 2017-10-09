import { createErrorMessage } from '../../src/actions/flashMessages';
import * as types from '../../src/actions/actionTypes';

describe('Flash Message Actions', () => {
  it('should create an action for an error flash message', () => {
    const message = 'Authentication failed please contact admin!';
    const expected = {
      type: types.FLASH_MESSAGE__FAILURE,
      message,
    };
    expect(createErrorMessage(message)).toEqual(expected);
  });
});
