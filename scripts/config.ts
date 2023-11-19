import * as ESBuild from "esbuild";

export const clientConfig: ESBuild.BuildOptions = {
  entryPoints: ["src/client/index.tsx"],
  bundle: true,
  treeShaking: true,
  platform: "browser",
  outfile: "./dist/public/bundle.js",
};

export const serverConfig: ESBuild.BuildOptions = {
  entryPoints: ["src/server/index.ts"],
  bundle: true,
  treeShaking: true,
  platform: "node",
  outfile: "./dist/server.js",
};
