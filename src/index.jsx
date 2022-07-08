import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./components/app/App";

const contain = document.getElementById("root");
const root = createRoot(contain);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
