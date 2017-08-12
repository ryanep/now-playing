import * as actionTypes from "../constants/action-types";
import * as tokenService from "../services/token";

export function accessTokenRequested() {
  return {
    type: actionTypes.ACCESS_TOKEN_REQUEST
  };
}

export function accessTokenRefreshed({ access_token }) {
  return {
    type: actionTypes.ACCESS_TOKEN_REFRESHED,
    payload: {
      accessToken: access_token
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

export function getAccessTokenFromRefresh() {
  return dispatch => {
    dispatch(accessTokenRequested());

    return tokenService.getAccessTokenFromRefreshToken().then(response => {
      const { error, access_token } = response;
      if (error) return dispatch(accessTokenFailure(error));

      return dispatch(accessTokenRefreshed({ access_token }));
    });
  };
}

export function getAccessTokenFromCode(code) {
  return dispatch => {
    dispatch(accessTokenRequested());

    return tokenService.getAccessTokenFromCode(code).then(response => {
      const {
        error,
        error_description,
        refresh_token,
        access_token
      } = response;
      if (error) return dispatch(accessTokenFailure(error));

      window.location.replace("/");
      return dispatch(accessTokenSuccess({ access_token, refresh_token }));
    });
  };
}
