import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import React from "react";

type Module = {
  component: any;
  loader: any;
  action: any;
};

const htmlString = (data: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
<div id="root">${data}</div>
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
