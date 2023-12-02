import express, { Application, Request, Response } from "express";
import path from "path";
import { getRouteData, handleGet, handlePost } from "./handlers";

const app: Application = express();
const port = 3000;

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

app.all("*", async (req: Request, res: Response) => {
  console.log(`Request received: [${req.method}] ${req.url}`);

  const data = await getRouteData(req, res);

  if (!data) {
    res.status(404).json({ error: "not found" });
  }

  if (req.method === "GET") {
    return handleGet(req, res, data);
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return handlePost(req, res, data);
  }

  return res.status(400).json({ error: "Bad request" });
});

app.listen(port, () => {
  console.log(`App is listening on: http://localhost:${port}`);
});
