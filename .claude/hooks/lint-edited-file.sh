#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
file_path="$(
  printf '%s' "$input" | node -e 'let data = ""; process.stdin.on("data", (chunk) => { data += chunk; }); process.stdin.on("end", () => { try { const input = JSON.parse(data); process.stdout.write(input.tool_input?.file_path ?? input.tool_input?.path ?? ""); } catch {} });'
)"

case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx|*.mts|*.cts|*.mjs|*.cjs) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR"
[ -f "$file_path" ] || exit 0
biome_bin="$CLAUDE_PROJECT_DIR/node_modules/.bin/biome"

if [ ! -x "$biome_bin" ]; then
  exit 0
fi

"$biome_bin" format --write "$file_path" >/dev/null 2>&1 || true
"$biome_bin" lint --write "$file_path" >/dev/null 2>&1 || true

diag=""
if ! diag="$("$biome_bin" lint "$file_path" 2>&1 | head -20)"; then
  if [ -n "$diag" ]; then
    DIAG="$diag" node -e 'process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: process.env.DIAG ?? "" } }))'
  fi
fi
