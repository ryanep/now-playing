import * as actionTypes from "../constants/action-types";
import * as spotifyURI from "../util/spotify";
import SpotifyService from "../services/spotify";
const spotifyService = new SpotifyService();

let currentTrackID = 0;

export function getCurrentTrack() {
  return dispatch => {
    dispatch(trackRequested());
    spotifyService
      .getCurrentTrack()
      .then(response => {
        const { item, context } = response;
        const trackID = item.id;

        if (currentTrackID !== trackID) {
          const trackContext = spotifyURI.parsePlaylistURI(context.uri);

          if (trackContext.type === "playlist") {
            dispatch(getUserAdded(trackContext.userID, trackContext.playlistID, trackID));
          }
          dispatch(getCurrentTrackSuccess(response));
          currentTrackID = trackID;
        } else {
          dispatch(trackUpdated(response));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(getCurrentTrackFailure());
      });
  };
}

export function trackRequested() {
  return {
    type: actionTypes.TRACK_REQUEST
  };
}

export function trackUpdated(track) {
  return {
    type: actionTypes.TRACK_UPDATED,
    track
  };
}

export function getCurrentTrackSuccess(track) {
  return {
    type: actionTypes.TRACK_CHANGED,
    track
  };
}

export function getCurrentTrackFailure() {
  return {
    type: actionTypes.TRACK_REQUEST_FAILURE
  };
}

export function getUserAdded(userID, playlistID, trackID) {
  return dispatch => {
    spotifyService
      .getUserFromPlaylist(userID, playlistID, trackID)
      .then(track => {
        if (track && track.added_by) {
          dispatch(trackGetUser(track.added_by.id));
        }
      })
      .catch(err => console.log(err));
  };
}

export function trackGetUser(userID) {
  return dispatch => {
    spotifyService
      .getUser(userID)
      .then(user => {
        if (user) {
          dispatch(trackAddedBySuccess(user));
        } else {
          dispatch(trackAddedByFailure());
        }
      })
      .catch(error => console.log(error));
  };
}

export function trackAddedBySuccess(user) {
  return {
    type: actionTypes.TRACK_USER_SUCCESS,
    user
  };
}

export function trackAddedByFailure() {
  return {
    type: actionTypes.TRACK_USER_FAILURE
  };
}
