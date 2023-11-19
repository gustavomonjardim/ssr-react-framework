import * as ESBuild from "esbuild";
import { clientConfig, serverConfig } from "./config";

const run = async () => {
  const clientCtx = await ESBuild.context(clientConfig);
  const serverCtx = await ESBuild.context(serverConfig);
  await Promise.all([clientCtx.watch(), serverCtx.watch()]);
};

run();
