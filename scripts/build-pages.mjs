import { spawnSync } from "node:child_process";
const result = spawnSync(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_PORTFOLIO_RELEASE: "public",
      NEXT_PUBLIC_SITE_URL: "https://kd16-27.github.io",
    },
  },
);
process.exit(result.status ?? 1);
