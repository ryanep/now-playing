import * as storageKeys from "../constants/storage-keys";
import * as actionTypes from "../constants/action-types";

const initialState = {
  accessToken: localStorage.getItem(storageKeys.SPOTIFY_ACCESS_TOKEN),
  refreshToken: localStorage.getItem(storageKeys.SPOTIFY_REFRESH_TOKEN)
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case actionTypes.ACCESS_TOKEN_REFRESHED:
      return {
        ...state,
        accessToken: action.payload.accessToken
      };
    default:
      return state;
  }
}
