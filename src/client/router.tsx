import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import Product from "./pages/shop/product";

const routes = [
  { path: "/", Component: <Home name="Teste" /> },
  { path: "/contact", Component: <Contact /> },
  { path: "/shop", Component: <Shop /> },
  { path: "/shop/product", Component: <Product /> },
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
