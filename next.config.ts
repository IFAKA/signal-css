import { execFileSync } from "node:child_process";
import path from "node:path";
import type { NextConfig } from "next";

execFileSync(process.execPath, [path.join(__dirname, "scripts/check-signal-css.mjs")], { stdio: "inherit" });
execFileSync(process.execPath, [path.join(__dirname, "scripts/check-package-boundaries.mjs")], { stdio: "inherit" });

const nextConfig: NextConfig = {
  transpilePackages: ["@signal-css/react", "signal-css"],
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
