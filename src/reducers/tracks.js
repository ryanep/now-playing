import * as actionTypes from "../constants/action-types";

const initialState = {
  currentTrack: {},
  previousTracks: []
};

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACK_CHANGED: {
      const { track } = action.payload;
      const { name, album, duration_ms } = action.track.item;
      return {
        ...state,
        previousTracks: [...state.previousTracks, state.currentTrack],
        currentTrack: {
          isPlaying: track.is_playing,
          progress: track.progress_ms,
          duration: duration_ms,
          title: name,
          artist: album.artists[0].name,
          artwork: album.images
        }
      };
    }
    case actionTypes.TRACK_UPDATED: {
      const { track } = action.payload;
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          isPlaying: track.is_playing,
          progress: track.progress_ms
        }
      };
    }
    case actionTypes.TRACK_FAILURE: {
      // Do API error handling here
      return { ...state };
      // case actionTypes.TRACK_USER_SUCCESS: {
      //   const { user } = action.payload;
      //   const displayName = user.display_name || user.id;
      //   const photo = user.images.length > 0 ? user.images[0].url : null;
      //
      //   return {
      //     ...state,
      //     currentTrack: {
      //       ...state.currentTrack,
      //       added: {
      //         name: displayName,
      //         photo: photo
      //       }
      //     }
      //   };
    }

    default:
      return state;
  }
}
