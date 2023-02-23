import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productContext";
import { AlertProvider } from "./context/alertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AppProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
