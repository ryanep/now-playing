import { SPOTIFY_ACCESS_TOKEN } from "../../constants/storage-keys";
import { parsePlaylistURI } from "../../util/spotify";
import transform from "./transform";
const apiURL = "https://api.spotify.com/v1";

export async function getCurrentTrack() {
  try {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    const response = await (await fetch(
      `${apiURL}/me/player/currently-playing`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )).json();
    const { item, context: { uri }, progress_ms, is_playing } = response;
    const user = await getUserFromPlaylist(parsePlaylistURI(uri), item.id);
    return transform({ ...item, ...user, progress_ms, is_playing });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getUserFromPlaylist({ userId, playlistId }, trackId) {
  try {
    const response = await getTrackFromPlaylist(userId, playlistId, trackId);
    const { added_by } = response;
    if (added_by && added_by.id) {
      return await getUserFromId(added_by.id);
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getTrackFromPlaylist(userId, playlistId, trackId) {
  try {
    const playlistTracks = await getAllPlaylistTracks(userId, playlistId);
    return playlistTracks.find(({ track }) => track.id === trackId);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getAllPlaylistTracks(userId, playlistId) {
  try {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    let moreTracks = true;
    let tracks = [];
    while (moreTracks) {
      const response = await (await fetch(
        `${apiURL}/users/${userId}/playlists/${playlistId}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )).json();
      const { items, next } = response;
      tracks = [...tracks, ...items];
      moreTracks = next;
    }
    return tracks;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getUserFromId(id) {
  try {
    const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    return await (await fetch(`${apiURL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })).json();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
