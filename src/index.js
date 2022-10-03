import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import StorageEnhancer from "./StorageEnhancer";

import App from "./App";
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

function preloadCheck() {
  if (window.localStorage.getItem("goals") === null) {
    return undefined;
  } else {
    return JSON.parse(window.localStorage.getItem("goals"));
  }
}

root.render(
  <Provider store={createStore(reducers, preloadCheck(), StorageEnhancer)}>
    <App />
  </Provider>
);
