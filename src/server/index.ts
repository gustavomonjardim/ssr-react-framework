import React from "react";
import express, { Application, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import { executeRoute } from "./get-component";

const app: Application = express();
const port = 3000;

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

const getPageData = async (req: Request, res: Response) => {
  let importURL = path.join(__dirname, "../client/pages" + req.url);

  let isFile = fs.existsSync(importURL + ".tsx");

  if (!isFile) {
    importURL += "/index.tsx";
  } else {
    importURL += ".tsx";
  }

  const data = await executeRoute(importURL.replace("//", "/"));

  return data;
};

app.get("/bundle.js", async (_req: Request, res: Response) => {
  const options = {
    root: path.join(__dirname, "../../dist/public"),
  };

  res.type(".js");
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile("bundle.js", options);
});

app.get("/favicon.ico", async (_req: Request, res: Response) => {
  res.status(404).send("Not found");
});

app.get("*", async (req: Request, res: Response) => {
  console.log("Request received: ", req.url);

  const data = await getPageData(req, res);

  if (!data) {
    res.status(404).json({ error: "not found" });
  }

  let props = {};

  if (typeof data?.loader === "function") {
    props = await data.loader(req, res);
  }

  const html = ReactDOMServer.renderToString(
    React.createElement(data?.component, props)
  );
  res.setHeader("Content-Type", "text/html");
  res.send(htmlString(html));
});

app.post("*", async (req: Request, res: Response) => {
  console.log("Request received: ", req.url);

  const data = await getPageData(req, res);

  if (!data) {
    res.status(404).json({ error: "not found" });
  }

  let response = null;

  if (typeof data?.action === "function") {
    response = await data.action(req, res);
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
