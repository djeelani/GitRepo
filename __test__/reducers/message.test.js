import messages from '../../src/reducers/message';

describe('message reducer', () => {
  const initialState = { list: [], spinner: false };

  it('handles default state', () => {
    expect(messages(undefined, {})).toEqual(initialState);
  });

  it('handles FLASH_MESSAGE__FAILURE action', () => {
    const message = 'Authentication failed please contact admin!';
    const action = {
      type: 'FLASH_MESSAGE__FAILURE',
      message,
    };
    const expected = {
      list: [],
      spinner: false,
      message: 'Authentication failed please contact admin!',
    };
    expect(messages(initialState, action)).toEqual(expected);
  });
});
