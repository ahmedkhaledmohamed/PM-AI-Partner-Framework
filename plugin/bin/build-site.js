#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");
const source = fs.readFileSync(path.join(root, "site/index.html"));
const target = path.join(root, "docs/index.html");
if (process.argv.length > 3 || (process.argv[2] && process.argv[2] !== "--check")) {
  console.error("Use build-site.js [--check]");
  process.exitCode = 2;
} else if (process.argv[2] === "--check") {
  if (!fs.existsSync(target) || !fs.readFileSync(target).equals(source)) {
    console.error("docs/index.html differs from the maintained site/index.html; regenerate it.");
    process.exitCode = 1;
  } else console.log("Published index copy matches the maintained site source.");
} else {
  fs.writeFileSync(target, source);
  console.log("Updated docs/index.html from site/index.html.");
}
