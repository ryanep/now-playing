import { delay } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { TRACK_REQUEST } from "../constants/action-types";
import * as trackActions from "../actions/tracks";
import * as spotifyService from "../services/spotify";

function* getCurrentTrack() {
  try {
    const track = yield call(spotifyService.getCurrentTrack);
    yield put(trackActions.trackChanged(track));
    yield delay(1000);
    yield call(getCurrentTrack);
  } catch (error) {
    console.log(error);
    yield put(trackActions.trackFailure(error));
  }
}

export const trackSagas = [takeLatest(TRACK_REQUEST, getCurrentTrack)];
