import { fork } from "redux-saga/effects";
import authSaga from "./auth";
import trackSaga from "./tracks";

export default function*() {
  yield [
    fork(authSaga), // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
    fork(trackSaga)
  ];
}
