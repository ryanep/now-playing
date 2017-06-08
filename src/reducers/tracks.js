import * as actionTypes from "../constants/action-types";

const initialState = {
  currentTrack: {},
  previousTracks: []
};

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACK_CHANGED:
      return { ...state, currentTrack: action.track };
    default:
      return state;
  }
}
