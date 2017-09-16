import { delay } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { TRACK_REQUEST } from '../constants/action-types';
import * as trackActions from '../actions/tracks';
import * as authActions from '../actions/auth';
import * as spotifyService from '../services/spotify';

export const currentTrackTitle = state =>
  state.tracks.currentTrack && state.tracks.currentTrack.title;

export function* getCurrentTrack() {
  try {
    const currentTitle = yield select(currentTrackTitle);
    const track = yield call(spotifyService.getCurrentTrack);
    if (currentTitle === track.title) {
      yield put(trackActions.trackUpdated(track));
    } else {
      yield put(trackActions.trackChanged(track));
    }
    yield delay(1000);
    yield call(getCurrentTrack);
  } catch (error) {
    const { status = null } = error;
    if (status === 204) {
      yield put(trackActions.trackNotPlaying());
      yield delay(1000);
      yield call(getCurrentTrack);
    } else if (status === 401) {
      yield put(authActions.accessTokenExpired());
    } else {
      yield put(trackActions.trackFailure(status));
    }
  }
}

export const trackSagas = [takeLatest(TRACK_REQUEST, getCurrentTrack)];
