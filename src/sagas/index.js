import { all } from "redux-saga/effects";
import { trackSagas } from "./tracks";
import { authSagas } from "./auth";

export default function* rootSaga() {
  yield all([...trackSagas, ...authSagas]);
}
