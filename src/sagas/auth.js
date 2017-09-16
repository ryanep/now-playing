import { call, put, takeLatest } from 'redux-saga/effects';
import * as authActions from '../actions/auth';
import * as tokenService from '../services/token';
import {
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_EXPIRED
} from '../constants/action-types';

export function* getAccessToken({ payload: { code } }) {
  try {
    const { error, access_token, refresh_token } = yield call(
      tokenService.getAccessTokenFromCode,
      code
    );
    yield call(window.history.pushState, {}, document.title, '/');
    yield put(authActions.accessTokenSuccess({ access_token, refresh_token }));
  } catch (error) {
    yield put(authActions.accessTokenFailure(error));
  }
}

export function* refreshAccessToken() {
  try {
    const { error, access_token } = yield call(
      tokenService.getAccessTokenFromRefreshToken
    );
    if (error) {
      yield put(authActions.refreshTokenFailure(error));
    }
    yield put(authActions.refreshTokenSuccess({ access_token }));
  } catch (error) {
    yield put(authActions.refreshTokenFailure(error));
  }
}

export const authSagas = [
  takeLatest(ACCESS_TOKEN_REQUEST, getAccessToken),
  takeLatest(ACCESS_TOKEN_EXPIRED, refreshAccessToken)
];
