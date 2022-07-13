import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Canvas from "./components/Canvas";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Canvas />
    </Provider>
  </React.StrictMode>
);
