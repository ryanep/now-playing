import * as actionTypes from "../constants/action-types";
import TokenService from "../services/token";
const tokenService = new TokenService();

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

export function accessTokenFailure() {
  return {
    type: actionTypes.ACCESS_TOKEN_FAILURE
  };
}

export function getAccessTokenFromRefresh() {
  return dispatch => {
    dispatch(accessTokenRequested());

    tokenService.getAccessTokenFromRefreshToken().then(({ data, error }) => {
      if (error) {
        return dispatch(accessTokenFailure());
      }

      let { access_token } = data;
      dispatch(accessTokenRefreshed({ access_token }));
    });
  };
}

export function getAccessTokenFromCode(code) {
  return dispatch => {
    dispatch(accessTokenRequested());

    tokenService
      .getAccessTokenFromCode(code)
      .then(({ data, error }) => {
        if (error) {
          return dispatch(accessTokenFailure());
        }

        let { refresh_token, access_token } = data;
        dispatch(accessTokenSuccess({ access_token, refresh_token }));
      })
      .catch(e => console.log(e));
  };
}
