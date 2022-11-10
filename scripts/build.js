const { build } = require("esbuild");
const glob = require("tiny-glob");

const main = async () => {
  console.log("Building bot...");
  const entryPoints = await glob("./src/**/*.ts");
  await build({
    entryPoints,
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    outdir: "dist",
    platform: "node",
    target: "node16",
    format: "cjs",
  }).catch(console.error);
  console.log("Successfully built bot.");
};

main().catch(console.error);
