import { delay } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { TRACK_REQUEST } from "../constants/action-types";
import * as trackActions from "../actions/tracks";
import * as authActions from '../actions/auth';
import * as spotifyService from "../services/spotify";

function* getCurrentTrack() {
  try {
    const track = yield call(spotifyService.getCurrentTrack);
    yield put(trackActions.trackChanged(track));
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
