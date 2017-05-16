import * as types from '../constants/action-types';

const initialState = {
    currentTrack: {},
    previousTracks: []
};

export default function tracks(state = initialState, action) {
    switch (action.type) {
        case types.TRACK_CHANGE:
            return { ...state, currentTrack: action.track };
        default:
            return state;
    }
}