// @ts-nocheck
const fs = require("fs");
const semver = require("semver");
(() => {
  let { ...package } = JSON.parse(fs.readFileSync("./package.json"));
  package.version = semver.inc(package.version, "patch");
  fs.writeFileSync("./package.json", JSON.stringify(package, null, 3));

  // const publicationPackage = { ...package, types: "index.d.ts", main: "index.mjs" };
  // fs.writeFileSync("./dist/package.json", JSON.stringify(publicationPackage, null, 3));
  // fs.writeFileSync("./dist/README.md", fs.readFileSync("../README.md"));
})();
