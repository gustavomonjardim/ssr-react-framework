import * as ESBuild from "esbuild";

export const clientConfig: ESBuild.BuildOptions = {
  entryPoints: ["src/client/index.tsx"],
  bundle: true,
  treeShaking: true,
  platform: "browser",
  outfile: "./dist/public/bundle.js",
  loader: {
    ".tsx": "tsx",
    ".ts": "tsx",
    ".jsx": "jsx",
    ".js": "jsx",
  },
};

export const serverConfig: ESBuild.BuildOptions = {
  entryPoints: ["src/server/index.tsx"],
  bundle: true,
  treeShaking: true,
  platform: "node",
  outfile: "./dist/server.js",
  loader: {
    ".tsx": "tsx",
    ".ts": "tsx",
    ".jsx": "jsx",
    ".js": "jsx",
  },
};
