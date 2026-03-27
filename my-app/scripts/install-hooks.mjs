import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(appDir, "..");
const configPath = path.join(repoRoot, "lefthook.yml");

const result = spawnSync("pnpm", ["exec", "lefthook", "install"], {
  cwd: appDir,
  stdio: "inherit",
  env: {
    ...process.env,
    LEFTHOOK_CONFIG: configPath,
  },
});

process.exit(result.status ?? 1);
