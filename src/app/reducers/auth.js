import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN
} from "../constants/storage-keys";

import {
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAILURE
} from "../constants/action-types";

import { TEST_AUTH } from "../constants/action-types";

const initialState = {
  accessToken: localStorage.getItem(SPOTIFY_ACCESS_TOKEN),
  refreshToken: localStorage.getItem(SPOTIFY_REFRESH_TOKEN)
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    default:
      return state;
  }
}
