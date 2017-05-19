import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../app/store/configure-store";
import App from "../app/containers/app";
import persistTokenToStore from "../app/util/storage";

const store = configureStore();
persistTokenToStore(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
