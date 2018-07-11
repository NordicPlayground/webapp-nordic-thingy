import React from "react";
import {render} from "react-dom";
import "./index.css";
import App from "./App";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import registerServiceWorker from "./registerServiceWorker";
import AppReducer from "./reducers/reducers";

const store = createStore(AppReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
