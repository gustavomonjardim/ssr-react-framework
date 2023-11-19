import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Shop from "./pages/shop";

const routes = [
  { path: "/", Component: <Home /> },
  { path: "/shop", Component: <Shop /> },
  { path: "/contact", Component: <Contact /> },
];

export function AppRoutes() {
  return (
    <Routes>
      {routes.map((page) => (
        <Route key={page.path} path={page.path} element={page.Component} />
      ))}
    </Routes>
  );
}
