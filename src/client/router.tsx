import React from "react";
import { Route, Routes } from "react-router";

const routes = [
  { path: "/", Component: <div>Home</div> },
  { path: "/another-test", Component: <div>Another test</div> },
  { path: "/test", Component: <div>Test</div> },
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
