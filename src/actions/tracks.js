import * as actionTypes from "../constants/action-types";
import * as spotifyURI from "../util/spotify";
import * as spotifyService from "../services/spotify";

// let currentTrackID = 0;

// export function getCurrentTrack() {
//   return dispatch => {
//     dispatch(trackRequested());
//     return spotifyService
//       .getCurrentTrack()
//       .then(response => {
//         const { item, context } = response;
//         const trackID = item.id;
//
//         if (currentTrackID !== trackID) {
//           const trackContext = spotifyURI.parsePlaylistURI(context.uri);
//
//           if (trackContext.type === "playlist") {
//             return dispatch(
//               getUserAdded(
//                 trackContext.userID,
//                 trackContext.playlistID,
//                 trackID
//               )
//             ).then(() => {
//               currentTrackID = trackID;
//               dispatch(getCurrentTrackSuccess(response));
//               return Promise.resolve();
//             });
//           } else {
//             return Promise.resolve();
//           }
//         } else {
//           dispatch(trackUpdated(response));
//           return Promise.resolve();
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch(getCurrentTrackFailure());
//         return Promise.resolve();
//       });
//   };
// }

export function trackRequested() {
  return {
    type: actionTypes.TRACK_REQUEST
  };
}

export function trackUpdated(track) {
  return {
    type: actionTypes.TRACK_UPDATED,
    payload: {
      track
    }
  };
}

export function trackChanged(track) {
  return {
    type: actionTypes.TRACK_CHANGED,
    payload: {
      track
    }
  };
}

export function trackFailure(error) {
  return {
    type: actionTypes.TRACK_FAILURE,
    payload: new Error(error),
    error: true
  };
}

// export function getUserAdded(userID, playlistID, trackID) {
//   return dispatch =>
//     spotifyService
//       .getUserFromPlaylist(userID, playlistID, trackID)
//       .then(track => {
//         if (track && track.added_by) {
//           return dispatch(trackGetUser(track.added_by.id));
//         } else {
//           dispatch(trackAddedByFailure());
//           return Promise.resolve();
//         }
//       })
//       .catch(err => console.log(err));
// }
//
// export function trackGetUser(userID) {
//   return dispatch =>
//     spotifyService
//       .getUser(userID)
//       .then(user => {
//         if (user) {
//           dispatch(trackAddedBySuccess(user));
//           return Promise.resolve();
//         } else {
//           dispatch(trackAddedByFailure());
//           return Promise.resolve();
//         }
//       })
//       .catch(error => console.log(error));
// }
