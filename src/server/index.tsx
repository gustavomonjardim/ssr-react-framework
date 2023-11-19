import React from "react";
import express, { Application, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "../client/router";
import path from "path";

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
<script src="/bundle.js"></script>
</body>
</html>`;

app.get("/bundle.js", async (_req: Request, res: Response) => {
  const options = {
    root: path.join(__dirname, "/public"),
  };

  res.type(".js");
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile("bundle.js", options);
});

app.get("*", async (req: Request, res: Response) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <AppRoutes />
    </StaticRouter>
  );
  res.setHeader("Content-Type", "text/html");
  res.send(htmlString(html));
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
