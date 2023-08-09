import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./router";

ReactDOM.hydrateRoot(
  window.document.documentElement,
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
