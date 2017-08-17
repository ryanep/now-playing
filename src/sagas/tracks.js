import { call, put, takeLatest } from "redux-saga/effects";
import { TRACK_REQUEST } from "../constants/action-types";
import * as trackActions from "../actions/tracks";
import * as spotifyService from "../services/spotify";

function* getCurrentTrack() {
  try {
    const track = yield call(spotifyService.getCurrentTrack);
    yield put(trackActions.trackChanged(track));
  } catch (error) {
    yield put(trackActions.trackFailure(error));
  }
}

export default function*() {
  yield takeLatest(TRACK_REQUEST, getCurrentTrack);
}
