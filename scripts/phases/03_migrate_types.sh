#!/usr/bin/env bash
# =============================================================================
# phases/03_migrate_types.sh
# Migrate: all nofs type files that DO NOT already exist in nexus-search
# Types unique to v0.1.57:
#   cache.ts, database.ts, defaults.ts, errors.ts, global.ts,
#   guards.ts, mapper.ts, optimization.ts, performance.ts,
#   query.ts, scoring.ts, util.ts
# Types that conflict (both exist):
#   algorithms.ts, compactability.ts, core.ts, document.ts,
#   events.ts, search.ts, state.ts, storage.ts, index.ts
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "03 — Type Definitions Migration"

# ── Net-new type files from v0.1.57 ──────────────────────────────────────────
step "New types: cache · database · defaults · errors · global"
for t in cache.ts database.ts defaults.ts errors.ts global.ts; do
  additive_copy \
    "$NOFS_SRC/types/$t" \
    "$TARGET_SRC/core/types/$t" \
    "$t"
done

step "New types: guards · mapper · optimization · performance"
for t in guards.ts mapper.ts optimization.ts performance.ts; do
  additive_copy \
    "$NOFS_SRC/types/$t" \
    "$TARGET_SRC/core/types/$t" \
    "$t"
done

step "New types: query · scoring · util"
for t in query.ts scoring.ts util.ts; do
  additive_copy \
    "$NOFS_SRC/types/$t" \
    "$TARGET_SRC/core/types/$t" \
    "$t"
done

# ── Conflicting types — copy as .nofs.ts for manual diff/merge ───────────────
step "Conflicting types (copy as *.nofs.ts for diff — do NOT auto-replace)"
CONFLICT_TYPES=(algorithms.ts compactability.ts core.ts document.ts \
                events.ts search.ts state.ts storage.ts index.ts)

for t in "${CONFLICT_TYPES[@]}"; do
  src="$NOFS_SRC/types/$t"
  dst="$TARGET_SRC/core/types/${t%.ts}.nofs.ts"
  if [[ -f "$src" ]]; then
    safe_copy "$src" "$dst" "${t%.ts}.nofs.ts  [diff against existing $t]"
  fi
done

# ── config.d.ts (declaration file present in nofs/src/types/) ────────────────
step "config.d.ts ambient declaration"
additive_copy \
  "$NOFS_SRC/types/config.d.ts" \
  "$TARGET_SRC/core/types/config.d.ts" \
  "config.d.ts"

print_summary "Phase 03 — Types"
