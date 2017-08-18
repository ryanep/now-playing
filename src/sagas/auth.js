import { call, put, takeLatest } from "redux-saga/effects";
import * as authActions from "../actions/auth";
import * as tokenService from "../services/token";
import {
  ACCESS_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST
} from "../constants/action-types";

function* getAccessToken({ payload: { code } }) {
  try {
    const { error, access_token, refresh_token } = yield call(
      tokenService.getAccessTokenFromCode,
      code
    );
    if (error) return yield put(authActions.accessTokenFailure(error));
    window.history.pushState({}, document.title, "/");
    yield put(authActions.accessTokenSuccess({ access_token, refresh_token }));
  } catch (error) {
    yield put(authActions.accessTokenFailure(error));
  }
}

function* refreshAccessToken() {
  try {
    const {
      error,
      access_token
    } = tokenService.getAccessTokenFromRefreshToken();
    if (error) return yield put(authActions.refreshTokenFailure(error));
    yield put(authActions.refreshTokenSuccess({ access_token }));
  } catch (error) {
    yield put(authActions.refreshTokenFailure(error));
  }
}

export const authSagas = [
  takeLatest(ACCESS_TOKEN_REQUEST, getAccessToken),
  takeLatest(REFRESH_TOKEN_REQUEST, refreshAccessToken)
];
