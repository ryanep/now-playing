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
    ));
    if (!response.ok || response.status === 204) {
      return Promise.reject({status: response.status});
    }
    const { item, context = {}, progress_ms, is_playing } = await response.json();
    const user = await getUserFromPlaylist(parsePlaylistURI(context), item.id);
    return transform({ ...item, ...user, progress_ms, is_playing });
  } catch (error) {
    console.log('error is ', error);
    throw new Error(error);
  }
}

async function getUserFromPlaylist({ userId, playlistId }, trackId) {
  try {
    if (!userId || !playlistId) return;
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
    let offset = 0;
    let moreTracks = true;
    let tracks = [];
    while (moreTracks) {
      const response = await fetch(
        `${apiURL}/users/${userId}/playlists/${playlistId}/tracks?offset=${offset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok || response.status === 204) {
        return Promise.reject({status: response.status});
      }
      const { items, next, total } = await response.json();
      tracks = [...tracks, ...items];
      offset = offset + items.length;
      if (tracks.length === total) moreTracks = false;
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
