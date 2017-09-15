import reducer from './auth';
import * as storageKeys from '../constants/storage-keys';
import * as authActions from '../actions/auth';

describe('reducers/auth', () => {
  const access_token = '__access_token__';
  const refresh_token = '__refresh_token__';
  const error = '__error__';
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      accessToken: null,
      refreshToken: null
    });

    const calls = localStorage.getItem.mock.calls;
    expect(calls[0][0]).toEqual(storageKeys.SPOTIFY_ACCESS_TOKEN);
    expect(calls[1][0]).toEqual(storageKeys.SPOTIFY_REFRESH_TOKEN);
  });

  it('should handle ACCESS_TOKEN_SUCCESS', () => {
    expect(
      reducer(
        {},
        authActions.accessTokenSuccess({ access_token, refresh_token })
      )
    ).toEqual({
      accessToken: '__access_token__',
      refreshToken: '__refresh_token__'
    });
  });

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    expect(
      reducer({}, authActions.refreshTokenSuccess({ access_token }))
    ).toEqual({ accessToken: '__access_token__' });
  });

  it('should handle ACCESS_TOKEN_FAILURE', () => {
    expect(reducer({}, authActions.accessTokenFailure(error))).toEqual({
      accessToken: null,
      refreshToken: null
    });
  });

  it('should handle REFRESH_TOKEN_FAILURE', () => {
    expect(reducer({}, authActions.refreshTokenFailure(error))).toEqual({
      accessToken: null,
      refreshToken: null
    });
  });
});
