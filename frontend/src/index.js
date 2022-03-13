import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

// PAGE JS PRINCIAPL DU FRONTEND QUI REDIRIGE VERS LA PAGE APP + RECUPERATION DE LA SEUL DIV DE LA PAGE INDEX.HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
