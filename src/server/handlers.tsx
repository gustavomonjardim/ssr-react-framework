import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import React, { Suspense, lazy } from "react";
import { glob } from "glob";
import { StaticRouter } from "react-router-dom/server";
import { Route, Routes } from "react-router";

type Module = {
  component: any;
  loader: any;
  action: any;
};

const normalizePath = (path: string) => {
  const temp = path.split("pages")[1]?.replace(".tsx", "");

  if (temp === "/index") return "/";

  if (temp?.includes("/index")) return temp.replace("/index", "/");

  return temp;
};

const getRoutes = async () => {
  const paths = await glob("/pages/**/*.tsx", {
    ignore: "node_modules/**",
    root: "./src/client/",
  });

  const arr = [];

  for await (const path of paths) {
    const module = await import(path.replace(".tsx", ""));

    arr.push({ path: normalizePath(path), module: module.default });
  }

  console.log(arr);

  return arr;
};

export const getRouteData = async (
  req: Request,
  res: Response
): Promise<Module> => {
  let importURL = path.join(process.cwd(), "src/client/pages" + req.url);

  let isFile = fs.existsSync(importURL + ".tsx");

  if (!isFile) {
    importURL += "/index.tsx";
  } else {
    importURL += ".tsx";
  }

  const module = await import(importURL);

  return {
    component: module.default,
    loader: module.loader,
    action: module.action,
  };
};

export const getRoot = async (): Promise<string> => {
  let importURL = path.join(process.cwd(), "src/client/root.tsx");

  const module = await import(importURL);

  return ReactDOMServer.renderToString(React.createElement(module.default));
};

export const handleGet = async (req: Request, res: Response, data: Module) => {
  let props = {};

  if (typeof data?.loader === "function") {
    props = await data.loader(req, res);
  }

  // const routes = await getRoutes();
  //
  // const html = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.url}>
  //     <Routes>
  //       {routes.map(({ path, module: Component }) => (
  //         <Route key={path} path={path} element={<Component {...props} />} />
  //       ))}
  //     </Routes>
  //   </StaticRouter>
  // );

  const pageHtml = ReactDOMServer.renderToString(
    React.createElement(data?.component, props)
  );

  const rootHtml = await getRoot();

  const finalHtml = rootHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${pageHtml}</div>`
  );

  res.setHeader("Content-Type", "text/html");
  res.send(finalHtml);
};

export const handlePost = async (req: Request, res: Response, data: Module) => {
  let response = null;

  if (typeof data?.action === "function") {
    response = await data.action(req, res);
  }

  res.send(response);
};
