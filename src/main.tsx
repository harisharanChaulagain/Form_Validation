import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import StoreProvider from "./StoreProvider";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
