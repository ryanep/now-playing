import * as actionTypes from "../constants/action-types";

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

export function trackNotPlaying() {
  return {
    type: actionTypes.TRACK_NOT_PLAYING
  }
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
