import { delay } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as spotifyService from '../services/spotify';
import * as trackActions from '../actions/tracks';
import * as authActions from '../actions/auth';
import { getCurrentTrack, trackSagas, currentTrackTitle } from './tracks';
import { TRACK_REQUEST } from '../constants/action-types';

describe('sagas/tracks', () => {
  describe('getCurrentTrackTitle selector', () => {
    it('returns null if state.tracks.currentTrack is null', () => {
      const state = { tracks: { currentTrack: null } };
      expect(currentTrackTitle(state)).toEqual(null);
    });

    it('returns the title of the current track', () => {
      const state = { tracks: { currentTrack: { title: '__title__' } } };
      expect(currentTrackTitle(state)).toEqual('__title__');
    });
  });

  const track = {
    title: '__track_new_title__'
  };
  const currentTitle = '__track_title__';
  describe('getCurrentTrack', () => {
    const gen = getCurrentTrack();
    it('selects the currentTrackTitle from the state', () => {
      expect(gen.next('__track_title__').value).toEqual(
        select(currentTrackTitle)
      );
    });

    it('gets the currently playing track from the spotify service', () => {
      expect(gen.next('__track_title__').value).toEqual(
        call(spotifyService.getCurrentTrack)
      );
    });

    it('puts trackChanged action if track title is different from currentTitle', () => {
      expect(gen.next(track).value).toMatchObject(
        put(trackActions.trackChanged(track))
      );
    });

    it('puts trackUpdated action if track title is the smae as currentTitle', () => {
      const gen = getCurrentTrack();
      gen.next();
      gen.next('__track_title__');
      expect(gen.next({ title: '__track_title__' }).value).toEqual(
        put(trackActions.trackUpdated({ title: '__track_title__' }))
      );
    });

    it('calls delay, waiting for 1 second', () => {
      expect(gen.next().value).toMatchSnapshot();
    });

    it('recursively calls getCurrentTrack', () => {
      expect(gen.next().value).toEqual(call(getCurrentTrack));
    });

    describe('error handling', () => {
      describe('api response status 204', () => {
        const gen = getCurrentTrack();
        gen.next();
        it('puts trackNotPlaying action', () => {
          expect(gen.throw({ status: 204 }).value).toEqual(
            put(trackActions.trackNotPlaying())
          );
        });

        it('calls delay, waiting for 1 second', () => {
          expect(gen.next().value).toMatchSnapshot();
        });

        it('recursively calls getCurrentTrack', () => {
          expect(gen.next().value).toEqual(call(getCurrentTrack));
        });
      });

      describe('api response status 401', () => {
        const gen = getCurrentTrack();
        gen.next();
        it('puts accessTokenExpired action', () => {
          expect(gen.throw({ status: 401 }).value).toEqual(
            put(authActions.accessTokenExpired())
          );
        });
      });

      describe('api response with no status', () => {
        const gen = getCurrentTrack();
        gen.next();
        it('sets the status to null if none exists', () => {
          expect(gen.throw({}).value).toEqual(
            put(trackActions.trackFailure(null))
          );
        });
      });

      describe('any other errors', () => {
        const error = { status: 503 };
        const gen = getCurrentTrack();
        gen.next();
        it('puts trackFailure action with status as the argument', () => {
          expect(gen.throw(error).value).toEqual(
            put(trackActions.trackFailure(503))
          );
        });
      });
    });
  });

  describe('trackSagas', () => {
    it('exports an array of sagas', () => {
      expect(trackSagas).toBeInstanceOf(Array);
    });

    it('exposes the expected format', () => {
      expect(trackSagas).toEqual([takeLatest(TRACK_REQUEST, getCurrentTrack)]);
    });
  });
});
