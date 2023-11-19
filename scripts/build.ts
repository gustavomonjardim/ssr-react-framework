#!/usr/bin/env node

import fs from "fs/promises";

import * as ESBuild from "esbuild";
import { clientConfig, serverConfig } from "./config";

// ESBuild.build writes the file but doesn't return the result
// as a string, so unfortunately we do have to use fs.readFile here...
export function clientBuild() {
  return ESBuild.build(clientConfig);
}

export function serverBuild() {
  return ESBuild.build(serverConfig);
}

serverBuild()
  .then(() => clientBuild())
  .then(() => {
    console.log("Build finalizado com sucesso!");
  })
  .catch(() => process.exit(1));
