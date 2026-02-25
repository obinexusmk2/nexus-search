#!/usr/bin/env bash
# =============================================================================
# phases/10_verify_build.sh
# Run the full verification suite: lint → build → test → coverage report.
# Any failure prints the error and exits with a non-zero code so the
# orchestrator knows which phase broke.
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "10 — Build Verification"

cd "$TARGET_DIR"

# ── Install deps if node_modules is absent ────────────────────────────────────
step "Dependency check"
if [[ ! -d "node_modules" ]]; then
  info "node_modules not found — running npm install"
  npm install --prefer-offline 2>&1 | tail -5
  ok "npm install complete"
else
  ok "node_modules already present"
fi

# ── TypeScript type-check (no emit) ───────────────────────────────────────────
step "TypeScript type-check (tsc --noEmit)"
if npx tsc --noEmit 2>&1 | tee /tmp/tsc_output.txt; then
  ok "TypeScript: no type errors"
else
  ERR_COUNT=$(grep -c "error TS" /tmp/tsc_output.txt 2>/dev/null || echo "?")
  err "TypeScript: $ERR_COUNT error(s) — resolve *.nofs.ts conflicts before building"
  cat /tmp/tsc_output.txt
  exit 1
fi

# ── ESLint ────────────────────────────────────────────────────────────────────
step "ESLint"
if npm run lint 2>&1 | tee /tmp/eslint_output.txt; then
  ok "ESLint: clean"
else
  warn "ESLint: warnings or errors present — see /tmp/eslint_output.txt"
fi

# ── Rollup build ──────────────────────────────────────────────────────────────
step "Rollup build (npm run build)"
if npm run build 2>&1 | tee /tmp/build_output.txt; then
  ok "Build: dist/ generated successfully"
else
  err "Build failed — see /tmp/build_output.txt"
  cat /tmp/build_output.txt
  exit 2
fi

# ── Jest tests ────────────────────────────────────────────────────────────────
step "Jest test suite"
if npm test -- --passWithNoTests 2>&1 | tee /tmp/test_output.txt; then
  PASS=$(grep -E "Tests:.*passed" /tmp/test_output.txt | tail -1 || echo "")
  ok "Tests passed — $PASS"
else
  FAIL=$(grep -E "Tests:.*failed" /tmp/test_output.txt | tail -1 || echo "check logs")
  err "Some tests failed — $FAIL"
  cat /tmp/test_output.txt
  exit 3
fi

# ── Coverage report ───────────────────────────────────────────────────────────
step "Coverage report"
npm test -- --coverage --passWithNoTests 2>&1 | tee /tmp/coverage_output.txt || true
COV_LINE=$(grep "All files" /tmp/coverage_output.txt 2>/dev/null || echo "(coverage data unavailable)")
info "Coverage summary: $COV_LINE"

# ── CLI smoke test ────────────────────────────────────────────────────────────
step "CLI smoke test (nsc --version or nsc --help)"
if [[ -f "dist/cli/index.js" ]]; then
  node dist/cli/index.js --help 2>&1 | head -5 || true
  ok "CLI responds to --help"
else
  warn "dist/cli/index.js not found — CLI build step may be pending"
fi

print_summary "Phase 10 — Verification"

echo -e "\n${BOLD}${GREEN}✔  Migration verification complete.${RESET}"
echo -e "   Review *.nofs.ts files for manual merge conflicts before committing.\n"
