#!/bin/sh
set -eu
cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
# :8081 is QA-only — a revive must never inherit a stale built-output preview.
if [ "$(uname -s)" = "Linux" ]; then
  node scripts/preview.mjs stop || true
fi
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
# Keep the dev server alive after the launching terminal/session closes.
node --input-type=module <<'NODE'
import { spawn } from "node:child_process";
import { closeSync, openSync } from "node:fs";
const log = openSync("/tmp/app-startup.log", "a");
const child = spawn("npm", ["run", "dev"], {
  detached: true,
  stdio: ["ignore", log, log],
});
child.unref();
closeSync(log);
NODE
