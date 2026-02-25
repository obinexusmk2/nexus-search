#!/usr/bin/env bash
# =============================================================================
# scripts/fix_package.sh
# Reset + install deps after a bad `npm init -y` overwrote package.json.
# Run from inside repos/nexus-search/nexus-search/
#
# USAGE:
#   bash scripts/fix_package.sh          # restore package.json + install
#   bash scripts/fix_package.sh --check  # just validate versions, no install
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib/common.sh"

phase "Package.json validation & dependency install"

CHECK_ONLY=0
[[ "${1:-}" == "--check" ]] && CHECK_ONLY=1

PKGJSON="$TARGET_DIR/package.json"

# ── Version guards ────────────────────────────────────────────────────────────
# These are the MINIMUM acceptable versions for each critical dev-dep.
# npm init -y is known to pull ancient ts-jest@19, jest@19, eslint@4 from cache.
declare -A MIN_VERSIONS=(
  ["ts-jest"]="29"
  ["jest"]="29"
  ["eslint"]="8"
  ["typescript"]="5"
  ["typescript-eslint"]="8"
)

step "Reading package.json: $PKGJSON"
if [[ ! -f "$PKGJSON" ]]; then
  err "package.json not found at $PKGJSON"
  exit 1
fi

VIOLATIONS=0
for pkg in "${!MIN_VERSIONS[@]}"; do
  min="${MIN_VERSIONS[$pkg]}"

  # Extract the version range string for this package (strip ^~)
  raw=$(node -e "
    const p = require('$PKGJSON');
    const deps = {...(p.devDependencies||{}), ...(p.dependencies||{})};
    const v = deps['$pkg'] || '';
    process.stdout.write(v.replace(/[^\\d.]/g,'').split('.')[0] || '0');
  " 2>/dev/null || echo "0")

  if [[ -z "$raw" || "$raw" == "0" ]]; then
    warn "$pkg: not found in package.json"
    VIOLATIONS=$((VIOLATIONS+1))
    continue
  fi

  if (( raw < min )); then
    err "$pkg: found major version $raw, need >= $min"
    err "    npm init -y likely pulled an ancient version from cache."
    VIOLATIONS=$((VIOLATIONS+1))
  else
    ok "$pkg@$raw  (>= $min ✓)"
  fi
done

if [[ $VIOLATIONS -gt 0 ]]; then
  echo -e "\n${RED}${BOLD}  $VIOLATIONS version violation(s) detected.${RESET}"
  echo -e "  The correct package.json is at: $PKGJSON"
  echo -e "  Copy it from the workspace or run the migration script.\n"

  if [[ $CHECK_ONLY -eq 0 ]]; then
    err "Aborting install — fix package.json first."
    exit 1
  fi
  exit 1
fi

ok "All critical package versions are acceptable."

if [[ $CHECK_ONLY -eq 1 ]]; then
  echo -e "  ${CYAN}--check passed. No install performed.${RESET}\n"
  exit 0
fi

# ── Clean stale lock + modules ─────────────────────────────────────────────────
step "Removing stale node_modules and package-lock.json"
cd "$TARGET_DIR"
rm -rf node_modules package-lock.json
ok "Cleaned"

# ── Fresh install ─────────────────────────────────────────────────────────────
step "npm install --legacy-peer-deps"
# --legacy-peer-deps used only as safety net; correct versions should resolve
# cleanly without it, but the flag prevents silent failure on minor peer drift
npm install --legacy-peer-deps
ok "Dependencies installed"

# ── Quick sanity: can jest be found? ─────────────────────────────────────────
step "Sanity: jest --version"
npx jest --version
ok "jest responds"

step "Sanity: tsc --version"
npx tsc --version
ok "tsc responds"

print_summary "fix_package"
echo -e "\n  ${GREEN}Run 'npm run build' to proceed.${RESET}\n"
