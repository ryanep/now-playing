import { getAccessToken, refreshAccessToken, authSagas } from './auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as tokenService from '../services/token';
import * as authActions from '../actions/auth';
import {
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_EXPIRED
} from '../constants/action-types';

describe('auth saga', () => {
  describe('getAccessToken', () => {
    const code = '123456789';
    const access_token = '__access_token__';
    const refresh_token = '__refresh_token__';
    const gen = getAccessToken({ payload: { code } });

    it('should call the token service to get access token from supplied code', () => {
      expect(gen.next(code).value).toEqual(
        call(tokenService.getAccessTokenFromCode, code)
      );
    });

    it('should call pushState with root path', () => {
      expect(gen.next({ access_token, refresh_token }).value).toEqual(
        call(window.history.pushState, {}, document.title, '/')
      );
    });

    it('should put accessTokenSuccess with the access_token and refresh_token if successful', () => {
      expect(gen.next({ access_token, refresh_token }).value).toEqual(
        put(authActions.accessTokenSuccess({ access_token, refresh_token }))
      );
    });

    it('should call accessTokenFailure with the error payload if an error is returned', () => {
      const error = '__error__';
      expect(gen.throw(error).value).toEqual(
        put(authActions.accessTokenFailure(error))
      );
    });
  });

  describe('refreshAcessToken', () => {
    const error = '__error__';
    const access_token = '__access_token__';
    const gen = refreshAccessToken();
    it('should call the token to get access token from supplied refresh token', () => {
      expect(gen.next({ access_token }).value).toEqual(
        call(tokenService.getAccessTokenFromRefreshToken)
      );
    });

    it('should put refreshTokenFailure action if an error is return from the service', () => {
      const errorGen = refreshAccessToken();
      errorGen.next();
      expect(errorGen.next({ error }).value).toEqual(
        put(authActions.refreshTokenFailure(error))
      );
    });

    it('should put refreshTokenSuccess action if an access token was successfully retrieved', () => {
      expect(gen.next({ access_token }).value).toEqual(
        put(authActions.refreshTokenSuccess({ access_token }))
      );
    });

    it('should put refreshTokenFailure action if an error is thrown', () => {
      expect(gen.throw(error).value).toEqual(
        put(authActions.refreshTokenFailure(error))
      );
    });
  });

  describe('authSagas', () => {
    it('exports an array of sagas', () => {
      expect(authSagas).toBeInstanceOf(Array);
    });

    it('exposes the expected format', () => {
      expect(authSagas).toEqual([
        takeLatest(ACCESS_TOKEN_REQUEST, getAccessToken),
        takeLatest(ACCESS_TOKEN_EXPIRED, refreshAccessToken)
      ]);
    });
  });
});
