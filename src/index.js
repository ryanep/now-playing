import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import App from "./containers/App";
import persistTokenToStore from "./util/storage";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();
persistTokenToStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
