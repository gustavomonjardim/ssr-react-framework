import React from "react";
import express, { Application, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./src/router";
import { bundleWithESBuild } from "./build";

const app: Application = express();
const port = 3000;

app.get("*", async (req: Request, res: Response) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <AppRoutes />
      <script src="/bundle.js" />
    </StaticRouter>
  );
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/bundle.js", async (_req: Request, res: Response) => {
  const bundle = await bundleWithESBuild();
  res.type(".js");
  res.setHeader("Content-Type", "application/javascript");
  res.send(bundle);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
