import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "../reducers";

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(thunk, logger));
  return store;
}
