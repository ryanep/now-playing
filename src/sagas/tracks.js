import { delay } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { ACCESS_TOKEN_SUCCESS } from "../constants/action-types";
import * as trackActions from "../actions/tracks";
import * as spotifyService from "../services/spotify";

function* getCurrentTrack() {
  try {
    const track = yield call(spotifyService.getCurrentTrack);
    yield put(trackActions.trackChanged(track));
    yield delay(1000);
    yield call(getCurrentTrack);
  } catch (error) {
    yield put(trackActions.trackFailure(error));
  }
}

export const trackSagas = [takeLatest(ACCESS_TOKEN_SUCCESS, getCurrentTrack)];
