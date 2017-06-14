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

    tokenService.getAccessTokenFromRefreshToken().then(response => {
      const { error } = response;
      if (error) throw error;

      let { access_token } = response;
      dispatch(accessTokenRefreshed({ access_token }));
    });
  };
}

export function getAccessTokenFromCode(code) {
  return dispatch => {
    dispatch(accessTokenRequested());

    tokenService
      .getAccessTokenFromCode(code)
      .then(response => {
        const { error, error_description } = response;
        if (error) throw new Error(error_description);

        const { refresh_token, access_token } = response;
        dispatch(accessTokenSuccess({ access_token, refresh_token }));
      })
      .catch(e => console.error(e));
  };
}
