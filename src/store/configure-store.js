import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "../reducers";
import authSaga from "../sagas/auth";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    reducers,
    applyMiddleware(thunk, logger, sagaMiddleware)
  );
  sagaMiddleware.run(authSaga);
  return store;
}
