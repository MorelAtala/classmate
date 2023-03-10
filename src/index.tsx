import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth } from "./config/Firebase";

let hasRendered = false;

const render = () => {
  if (!hasRendered) {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
    hasRendered = true;
  }
};

Auth.onAuthStateChanged(async (fbUser) => {
  if (fbUser) {
    render();
  } else {
    Auth.signInAnonymously().then(() => render());
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
