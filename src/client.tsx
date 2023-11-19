import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/home";

ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Home />);
