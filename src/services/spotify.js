import { SPOTIFY_ACCESS_TOKEN } from "../constants/storage-keys";
const apiURL = "https://api.spotify.com/v1";

export async function getCurrentTrack() {
  const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
  const response = await fetch(`${apiURL}/me/player/currently-playing`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.json();
}

export async function getPlaylistTracks(userID, playlistID, offset = 0) {
  const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
  const response = await fetch(
    `${apiURL}/users/${userID}/playlists/${playlistID}/tracks?offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return response.json();
}

export async function getAllPlaylistTracks(userID, playlistID) {
  let tracks = [];
  let totalTracks = 1;

  while (tracks.length < totalTracks) {
    const newTracks = await this.getPlaylistTracks(
      userID,
      playlistID,
      tracks.length
    );
    tracks = [...tracks, ...newTracks.items];
    totalTracks = newTracks.total;
  }

  return tracks;
}

export async function getUserFromPlaylist(userID, playlistID, trackID) {
  const tracks = await this.getAllPlaylistTracks(userID, playlistID);
  return tracks.find(trackData => {
    return trackData.track.id === trackID;
  });
}

export async function getUser(userID) {
  const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
  const response = await fetch(`${apiURL}/users/${userID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.json();
}
