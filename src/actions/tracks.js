import * as actionTypes from "../constants/action-types";
import SpotifyService from "../services/spotify";
const spotifyService = new SpotifyService();

export function getCurrentTrack() {
  return dispatch => {
    dispatch(trackRequested());
    spotifyService.getCurrentTrack()
      .then(response => {
        dispatch(getCurrentTrackSuccess(response));
      })
      .catch(err => {
        throw Error("Error fetching current track");
      });
  }
}

export function trackRequested() {
  return {
    type: actionTypes.TRACK_REQUEST
  }
}

export function getCurrentTrackSuccess(track) {
  return {
	  type: actionTypes.TRACK_CHANGED,
    track: track.data
  }
}