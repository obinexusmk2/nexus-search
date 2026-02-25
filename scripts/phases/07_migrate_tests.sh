#!/usr/bin/env bash
# =============================================================================
# phases/07_migrate_tests.sh
# Migrate the full v0.1.57 test suite into nexus-search/__tests__/
# v0.1.57 has 20+ test files across unit + integration layers.
# Strategy:
#   - Adopt v0.1.57 double-underscore naming: __unit__ / __intergrations__
#   - Keep any existing nexus-search tests (move them into __unit__/legacy/)
#   - Copy all nofs test files directly
#   - Copy fixtures, scripts/verify-build.js
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

NOFS_TESTS="$NOFS_DIR/__tests__"
TARGET_TESTS="$TARGET_DIR/__tests__"

phase "07 — Test Suite Migration (20+ files)"

# ── Archive old sparse tests before overwriting ───────────────────────────────
step "Archive existing sparse tests to __tests__/legacy/"
LEGACY_DIR="$TARGET_TESTS/legacy"
mkdir -p "$LEGACY_DIR"

OLD_UNIT="$TARGET_TESTS/unit"
OLD_INT="$TARGET_TESTS/integrations"

if [[ -d "$OLD_UNIT" ]]; then
  cp -r "$OLD_UNIT" "$LEGACY_DIR/unit_v030" 2>/dev/null || true
  ok "Archived __tests__/unit/ → legacy/unit_v030"
fi
if [[ -d "$OLD_INT" ]]; then
  cp -r "$OLD_INT" "$LEGACY_DIR/integrations_v030" 2>/dev/null || true
  ok "Archived __tests__/integrations/ → legacy/integrations_v030"
fi

# ── Unit tests ────────────────────────────────────────────────────────────────
step "Unit: TestFactory.ts"
safe_copy \
  "$NOFS_TESTS/__unit__/TestFactory.ts" \
  "$TARGET_TESTS/__unit__/TestFactory.ts" \
  "TestFactory.ts"

step "Unit: index.test.ts"
safe_copy \
  "$NOFS_TESTS/__unit__/index.test.ts" \
  "$TARGET_TESTS/__unit__/index.test.ts" \
  "index.test.ts"

# algorithms
step "Unit/algorithms: TrieNode, TrieSearch (both files)"
for f in TrieNode.test.ts TrieSearch.test.ts TrieSearch.comprehesive.test.ts; do
  safe_copy \
    "$NOFS_TESTS/__unit__/algorithms/$f" \
    "$TARGET_TESTS/__unit__/algorithms/$f" \
    "algorithms/$f"
done

# adapters / algorithms / trie
step "Unit/adapters: NexusDocumentAdapter, IndexMapper, TrieNode, TrieSearch"
safe_copy_dir \
  "$NOFS_TESTS/__unit__/adapters" \
  "$TARGET_TESTS/__unit__/adapters"

# core
step "Unit/core: IndexManager, IndexedDB, QueryProcessor, SearchEngine, SearchFlow"
safe_copy_dir \
  "$NOFS_TESTS/__unit__/core" \
  "$TARGET_TESTS/__unit__/core"

# mappers
step "Unit/mappers: DataMapper, IndexMapper"
safe_copy_dir \
  "$NOFS_TESTS/__unit__/mappers" \
  "$TARGET_TESTS/__unit__/mappers"

# plugins
step "Unit/plugins: NexusSearchPlugin"
safe_copy_dir \
  "$NOFS_TESTS/__unit__/plugins" \
  "$TARGET_TESTS/__unit__/plugins"

# storage
step "Unit/storage: BaseDocument, CacheManager, IndexManager, IndexedDB, IndexedDocument, SearchStorage"
safe_copy_dir \
  "$NOFS_TESTS/__unit__/storage" \
  "$TARGET_TESTS/__unit__/storage"

# utils
step "Unit/utils: AlgoUtils, Helper, ScoringUtils, SearchUtils, ValidationUtils"
safe_copy_dir \
  "$NOFS_TESTS/__unit__/utils" \
  "$TARGET_TESTS/__unit__/utils"

# ── Integration tests ─────────────────────────────────────────────────────────
step "Integration: PerformanceIntergration, SearchSystemIntergration, StorageSystemIntergration"
safe_copy_dir \
  "$NOFS_TESTS/__intergrations__" \
  "$TARGET_TESTS/__intergrations__"

# ── Fixtures (vanilla / react / vue demos + server) ───────────────────────────
step "Fixtures: vanilla, react, vue, commonjs, server.js"
safe_copy_dir \
  "$NOFS_DIR/fixtures" \
  "$TARGET_DIR/fixtures"

# ── build-verification script ─────────────────────────────────────────────────
step "scripts/verify-build.js (post-build integrity check)"
additive_copy \
  "$NOFS_DIR/scripts/verify-build.js" \
  "$TARGET_DIR/scripts/verify-build.js" \
  "verify-build.js"

print_summary "Phase 07 — Tests"
