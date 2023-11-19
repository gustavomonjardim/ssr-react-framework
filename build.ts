import fs from "fs/promises";

import * as ESBuild from "esbuild";

// ESBuild.build writes the file but doesn't return the result
// as a string, so unfortunately we do have to use fs.readFile here...
export async function bundleWithESBuild() {
  await ESBuild.build({
    entryPoints: ["src/client/index.tsx"],
    bundle: true,
    treeShaking: true,
    platform: "browser",
    outfile: "./bundle.js",
    loader: {
      ".tsx": "tsx",
      ".ts": "tsx",
      ".jsx": "jsx",
      ".js": "jsx",
    },
  });

  const bundle = await fs.readFile("./bundle.js");

  return bundle.toString();
}
