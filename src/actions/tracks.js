import * as actionTypes from "../constants/action-types";
import SpotifyService from "../services/spotify";
const spotifyService = new SpotifyService();

let currentTrackID = 0;

export function getCurrentTrack() {
  return dispatch => {
    dispatch(trackRequested());
    spotifyService
      .getCurrentTrack()
      .then(response => {
        let { item } = response;

        if (currentTrackID !== item.id) {
          dispatch(getCurrentTrackSuccess(response));
          currentTrackID = item.id;
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
