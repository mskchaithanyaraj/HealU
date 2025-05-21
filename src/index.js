import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BotpressProvider } from "./components/BotpressProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BotpressProvider>
      <App />
    </BotpressProvider>
  </React.StrictMode>
);
