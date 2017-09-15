import reducer from './tracks';
import * as trackActions from '../actions/tracks';

describe('reducers/tracks', () => {
  const track = {
    title: '__title__'
  };
  const error = '__error__';
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentTrack: null,
      previousTracks: []
    });
  });

  it('should handle TRACK_CHANGED', () => {
    const newerTrack = {
      title: '__newer_title__'
    };

    const state = reducer(undefined, trackActions.trackChanged(track));

    expect(state).toEqual({
      currentTrack: {
        ...track
      },
      previousTracks: [null]
    });

    expect(reducer(state, trackActions.trackChanged(newerTrack))).toEqual({
      currentTrack: {
        ...newerTrack
      },
      previousTracks: [null, { ...track }]
    });
  });

  it('should handle TRACK_UPDATED', () => {
    const progress = '__progress__';
    const isPlaying = '__is_playing__';

    const state = reducer(
      undefined,
      trackActions.trackUpdated({ progress, isPlaying })
    );

    expect(state).toEqual({
      currentTrack: {
        progress,
        isPlaying
      },
      previousTracks: []
    });

    const newerProgress = '__newer_progress__';
    const newerIsPlaying = '__newer_is_playing__';

    expect(
      reducer(
        state,
        trackActions.trackUpdated({
          progress: newerProgress,
          isPlaying: newerIsPlaying
        })
      )
    ).toEqual({
      currentTrack: {
        progress: newerProgress,
        isPlaying: newerIsPlaying
      },
      previousTracks: []
    });
  });

  it('should handle TRACK_NOT_PLAYING', () => {
    const state = reducer(undefined, trackActions.trackNotPlaying());

    expect(state).toEqual({
      previousTracks: [null],
      currentTrack: null
    });
  });

  it('should handle TRACK_FAILURE', () => {
    const state = reducer(undefined, trackActions.trackFailure(error));

    expect(state).toEqual({
      previousTracks: [null],
      currentTrack: null
    });
  });
});
