import * as actionTypes from "../constants/action-types";

export function accessTokenRequested(code) {
  return {
    type: actionTypes.ACCESS_TOKEN_REQUEST,
    payload: {
      code
    }
  };
}

export function accessTokenSuccess({ access_token, refresh_token }) {
  return {
    type: actionTypes.ACCESS_TOKEN_SUCCESS,
    payload: {
      accessToken: access_token,
      refreshToken: refresh_token
    }
  };
}

export function accessTokenFailure(error) {
  return {
    type: actionTypes.ACCESS_TOKEN_FAILURE,
    payload: new Error(error),
    error: true
  };
}

export function accessTokenExpired() {
  return {
    type: actionTypes.ACCESS_TOKEN_EXPIRED
  }
}

export function refreshTokenRequested() {
  return {
    type: actionTypes.REFRESH_TOKEN_REQUEST
  };
}

export function refreshTokenSuccess({ access_token }) {
  return {
    type: actionTypes.REFRESH_TOKEN_SUCCESS,
    payload: {
      accessToken: access_token
    }
  };
}

export function refreshTokenFailure(error) {
  return {
    type: actionTypes.REFRESH_TOKEN_FAILURE,
    payload: new Error(error),
    error: true
  };
}
