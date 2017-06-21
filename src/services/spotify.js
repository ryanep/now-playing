import { SPOTIFY_ACCESS_TOKEN } from "../constants/storage-keys";

export default class SpotifyService {
  apiURL = "https://api.spotify.com/v1";

  getCurrentTrack() {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    return fetch(`${this.apiURL}/me/player/currently-playing`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .catch(error => Promise.reject(error));
  }

  async getPlaylistTracks(userID, playlistID, offset = 0) {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    const data = await fetch(`${this.apiURL}/users/${userID}/playlists/${playlistID}/tracks?offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    });
    return data.json();
  }

  async getAllPlaylistTracks(userID, playlistID) {
    let tracks = [];
    let totalTracks = 1;

    while (tracks.length < totalTracks) {
      let newTracks = await this.getPlaylistTracks(userID, playlistID, tracks.length);
      tracks = [...tracks, ...newTracks.items];
      totalTracks = newTracks.total;
    }

    return tracks;
  }

  async getUserFromPlaylist(userID, playlistID, trackID) {
    const tracks = await this.getAllPlaylistTracks(userID, playlistID);
    return tracks.find(trackData => {
      return trackData.track.id === trackID;
    });
  }

  getUser(userID) {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    return fetch(`${this.apiURL}/users/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .catch(error => Promise.reject(error));
  }
}
