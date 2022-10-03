import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import StorageEnhancer from "./StorageEnhancer";

import App from "./App";
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));
const preloadedState = JSON.parse(window.localStorage.getItem("goals"));

console.log(preloadedState);

root.render(
  <Provider store={createStore(reducers, preloadedState, StorageEnhancer)}>
    <App />
  </Provider>
);
