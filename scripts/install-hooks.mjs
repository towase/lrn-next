import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const configPath = path.join(projectRoot, "lefthook.yml");

const result = spawnSync("pnpm", ["exec", "lefthook", "install"], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    LEFTHOOK_CONFIG: configPath,
  },
});

process.exit(result.status ?? 1);
