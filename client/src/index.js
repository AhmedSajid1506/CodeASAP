import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productContext";
import { AlertProvider } from "./context/alertContext";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AppProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AppProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
