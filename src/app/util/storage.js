import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN
} from "../constants/storage-keys";

export default store => {
  store.subscribe(() => {
    let { auth: { accessToken, refreshToken } } = store.getState();
    if (accessToken && refreshToken) {
      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
      localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
    }
  });
};
