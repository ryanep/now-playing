import { SPOTIFY_ACCESS_TOKEN } from "../constants/storage-keys";

export default class SpotifyService {
  apiURL = "https://api.spotify.com/v1/me/player/currently-playing";

  getCurrentTrack() {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    return fetch(`${this.apiURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  }
}
