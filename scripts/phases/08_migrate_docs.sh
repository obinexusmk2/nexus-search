#!/usr/bin/env bash
# =============================================================================
# phases/08_migrate_docs.sh
# Migrate: docs/, examples/, images/, dist/ type declarations
# Strategy:
#   - docs/  → docs/ (additive, no overwrite of already-present .md)
#   - examples/ → examples/ (additive)
#   - images/   → images/ (additive, heart-icon.svg etc.)
#   - dist/types/ → .migration_backup only (generated; do not commit)
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "08 — Documentation & Assets Migration"

# ── Docs ──────────────────────────────────────────────────────────────────────
step "Docs: API.md, CACHING.md, NexusSearch.md, NexusSearch.old.md, USAGE.md"
mkdir -p "$TARGET_DIR/docs"
for doc in API.md CACHING.md NexusSearch.md NexusSearch.old.md USAGE.md; do
  additive_copy \
    "$NOFS_DIR/docs/$doc" \
    "$TARGET_DIR/docs/$doc" \
    "docs/$doc"
done

# ── TODO files (carry forward open items) ─────────────────────────────────────
step "TODO.md migration notes"
additive_copy \
  "$NOFS_DIR/TODO.md" \
  "$TARGET_DIR/TODO.nofs.md" \
  "TODO.nofs.md  [open items from v0.1.57 — review and merge into main TODO]"

if [[ -f "$NOFS_DIR/TODO(NOW).md" ]]; then
  additive_copy \
    "$NOFS_DIR/TODO(NOW).md" \
    "$TARGET_DIR/TODO_NOW.nofs.md" \
    "TODO_NOW.nofs.md  [immediate action items from v0.1.57]"
fi

# ── Examples ──────────────────────────────────────────────────────────────────
step "Examples: FileServer.js, FileServer.md, query.js, search.js"
mkdir -p "$TARGET_DIR/examples"
for ex in FileServer.js FileServer.md query.js search.js; do
  additive_copy \
    "$NOFS_DIR/examples/$ex" \
    "$TARGET_DIR/examples/$ex" \
    "examples/$ex"
done

# ── Images / SVG assets ───────────────────────────────────────────────────────
step "Images: heart-icon.svg"
mkdir -p "$TARGET_DIR/images"
additive_copy \
  "$NOFS_DIR/images/heart-icon.svg" \
  "$TARGET_DIR/images/heart-icon.svg" \
  "images/heart-icon.svg"

# ── README (nofs version saved for reference) ─────────────────────────────────
step "README — save nofs version for reference (do not replace main README)"
additive_copy \
  "$NOFS_DIR/README.md" \
  "$TARGET_DIR/README.nofs.md" \
  "README.nofs.md  [v0.1.57 README — merge relevant sections into main README]"

# ── LICENSE ───────────────────────────────────────────────────────────────────
step "LICENSE — conflict note (v0.3.0=MIT, v0.1.57=ISC; keeping MIT)"
if [[ -f "$NOFS_DIR/LICENSE" ]]; then
  safe_copy \
    "$NOFS_DIR/LICENSE" \
    "$TARGET_DIR/LICENSE.nofs" \
    "LICENSE.nofs  [v0.1.57 ISC license — keeping MIT from v0.3.0]"
fi

# ── dist/types (generated declarations — reference only) ─────────────────────
step "dist/types — archiving nofs declaration types for reference"
DIST_TYPES_BAK="$BASE_DIR/.migration_backup_dist_types"
if [[ -d "$NOFS_DIR/dist/types" ]]; then
  mkdir -p "$DIST_TYPES_BAK"
  cp -r "$NOFS_DIR/dist/types" "$DIST_TYPES_BAK/"
  info "Dist types archived to: $DIST_TYPES_BAK  (do not commit — regenerate with build)"
fi

print_summary "Phase 08 — Docs & Assets"
