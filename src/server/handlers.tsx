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

getRoutes();

const htmlString = (data: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
<div id="root">${data}</div>
<script src="/bundle.js" ></script>
</body>
</html>`;

export const getRouteData = async (
  req: Request,
  res: Response
): Promise<Module> => {
  let importURL = path.join(__dirname, "../client/pages" + req.url);

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

export const handleGet = async (req: Request, res: Response, data: Module) => {
  let props = {};

  if (typeof data?.loader === "function") {
    props = await data.loader(req, res);
  }

  const routes = await getRoutes();

  // const html = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.url}>
  //     <Routes>
  //       {routes.map(({ path, module: Component }) => (
  //         <Route key={path} path={path} element={<Component {...props} />} />
  //       ))}
  //     </Routes>
  //   </StaticRouter>
  // );

  const html = ReactDOMServer.renderToString(
    React.createElement(data?.component, props)
  );
  res.setHeader("Content-Type", "text/html");
  res.send(htmlString(html));
};

export const handlePost = async (req: Request, res: Response, data: Module) => {
  let response = null;

  if (typeof data?.action === "function") {
    response = await data.action(req, res);
  }

  res.send(response);
};
