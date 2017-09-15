import * as actionTypes from "../constants/action-types";

const initialState = {
  currentTrack: null,
  previousTracks: []
};

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACK_CHANGED: {
      const { track } = action.payload;
      return {
        ...state,
        previousTracks: [...state.previousTracks, state.currentTrack],
        currentTrack: { ...track }
      };
    }
    case actionTypes.TRACK_UPDATED: {
      const { track: { progress } } = action.payload;
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          progress
        }
      };
    }
    case actionTypes.TRACK_NOT_PLAYING:
    case actionTypes.TRACK_FAILURE:
      return {
        ...state,
        previousTracks: [...state.previousTracks, state.currentTrack],
        currentTrack: null
      };
    default:
      return state;
  }
}
