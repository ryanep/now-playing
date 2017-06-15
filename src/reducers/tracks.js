import * as actionTypes from "../constants/action-types";

const initialState = {
  currentTrack: {},
  previousTracks: []
};

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACK_CHANGED:
      if (state.currentTrack) {
        state.previousTracks.push(state.currentTrack);
      }
      const { track } = action;
      const { name, album, duration_ms } = action.track.item;
      return { ...state, currentTrack: {
        isPlaying: track.is_playing,
        progress: track.progress_ms,
        duration: duration_ms,
        title: name,
        artist: album.artists[0].name,
        artwork: album.images
      }};
    case actionTypes.TRACK_UPDATED:
      const updatedTrack = state.currentTrack;
      updatedTrack.isPlaying = action.track.is_playing;
      updatedTrack.progress = action.track.progress_ms;
      return { ...state, currentTrack: updatedTrack};
    case actionTypes.TRACK_REQUEST_FAILURE:
      // Do API error handling here
      return { ...state };
    default:
      return state;
  }
}
