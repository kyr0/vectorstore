import { buildForNode } from "@jsheaven/easybuild";

await buildForNode({
  entryPoint: "./src/vector.ts",
  outfile: "./dist/index.js",
  debug: process.argv.indexOf("--dev") > -1,
  dts: false,
  esBuildOptions: {
    logLevel: "error",
  },
});
