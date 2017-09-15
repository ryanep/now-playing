import reducers from './index';
import * as authActions from '../actions/auth';
import * as trackActions from '../actions/tracks';

describe('reducers/index', () => {
  it('exports the combined reducers', () => {
    expect(reducers).toBeInstanceOf(Function);
  });

  it('returns the default state', () => {
    expect(reducers(undefined, {})).toEqual({
      auth: {
        accessToken: null,
        refreshToken: null
      },
      tracks: {
        currentTrack: null,
        previousTracks: []
      }
    });
  });
});
