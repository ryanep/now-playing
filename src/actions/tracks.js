import * as actionTypes from "../constants/action-types";
import SpotifyService from "../services/spotify";
const spotifyService = new SpotifyService();

let currentTrackID = 0;

export function getCurrentTrack() {
  return dispatch => {
    dispatch(trackRequested());
    spotifyService.getCurrentTrack()
      .then(response => {
        if (currentTrackID !== response.data.item.id) {
          dispatch(getCurrentTrackSuccess(response));
          currentTrackID = response.data.item.id;
        }
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