import * as actionTypes from "../constants/action-types";

const initialState = {
  currentTrack: {},
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
    case actionTypes.TRACK_FAILURE: {
      // Do API error handling here
      return { ...state };
    }
    default:
      return state;
  }
}
