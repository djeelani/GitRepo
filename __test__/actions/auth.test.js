import { authFailure, authSuccess } from '../../src/actions/auth';

describe('login user actions', () => {
  it('handles the loginFailure action creator', () => {
    const action = { type: 'AUTH__FAILURE' };
    expect(authFailure()).toEqual(action);
  });

  it('handles the loginSuccess action creator', () => {
    const action = { type: 'AUTH__SUCCESS' };
    expect(authSuccess()).toEqual(action);
  });
});
