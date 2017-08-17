import { SPOTIFY_ACCESS_TOKEN } from "../../constants/storage-keys";
import { parsePlaylistURI } from "../../util/spotify";
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
    const { item, context } = response;
    const { uri } = context;
    const trackContext = parsePlaylistURI(uri);
    const { type, userId, playlistId } = trackContext;
    if (type === "playlist") {
      const { added_by: { id } } = await getTrackFromPlaylist(
        userId,
        playlistId
      );
      const user = id ? await getUserFromId(id) : null;
    }
  } catch (e) {
    throw new Error("Not working");
  }
}

async function getTrackFromPlaylist(userId, playlistId, trackId) {
  try {
    const playlistTracks = await getAllPlaylistTracks(userId, playlistId);
    return playlistTracks.find(track => track.id === trackId);
  } catch (error) {
    throw new Error("Not working");
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
    throw new Error("Not working");
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
    throw new Error("Not working");
  }
}

// 1. Get current track
// 2. Get playlist id
// 3. Get user who added current track on playlist
// 4. if exists, return, if not null
// 5. return track with user added augmented

// export async function getPlaylistTracks(userID, playlistID, offset = 0) {
//   try {
//     const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
//     const response = await fetch(
//       `${apiURL}/users/${userID}/playlists/${playlistID}/tracks`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     );
//     console.log(response.json());
//   } catch (e) {
//     let moreTracks = true;
//
//     while (moreTracks) {
//       moreTracks = false;
//     }
//   }
// }

// export async function getAllPlaylistTracks(userID, playlistID) {
//   let tracks = [];
//   let totalTracks = 1;
//
//   while (tracks.length < totalTracks) {
//     const newTracks = await this.getPlaylistTracks(
//       userID,
//       playlistID,
//       tracks.length
//     );
//     const { items = [] } = newTracks;
//     tracks = [...tracks, ...items];
//     totalTracks = newTracks.total;
//   }
//
//   return tracks;
// }

// export async function getAllPlaylistTracks(userID, playlistID) {
//   let tracks = [];
// }

// export async function getUserFromPlaylist(userID, playlistID, trackID) {
//   const tracks = await this.getAllPlaylistTracks(userID, playlistID);
//   return tracks.find(trackData => {
//     return trackData.track.id === trackID;
//   });
// }

// export async function getUser(userID) {
//   const accessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
//   const response = await fetch(`${apiURL}/users/${userID}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   });
//   return response.json();
// }
