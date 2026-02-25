#!/usr/bin/env bash
# =============================================================================
# phases/04_migrate_utils.sh
# Migrate utility files from nofs into src/core/utils/
#
# Net-new (add directly):
#   AlgoUtils.ts, SearchUtils.ts, StorageUtils.ts, createMockDocument.ts
# Conflicts (copy as .nofs.ts for diff):
#   ScoringUtils.ts, ValidationUtils.ts
# Merge/compare:
#   PerformanceUtils.ts → compare with PerformanceMonitor.ts
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "04 — Utility Functions Migration"

step "AlgoUtils — algorithm helper functions (new)"
additive_copy \
  "$NOFS_SRC/utils/AlgoUtils.ts" \
  "$TARGET_SRC/core/utils/AlgoUtils.ts" \
  "AlgoUtils.ts"

step "SearchUtils — BFS/DFS regex traversal helpers (critical for AVL-Trie search)"
additive_copy \
  "$NOFS_SRC/utils/SearchUtils.ts" \
  "$TARGET_SRC/core/utils/SearchUtils.ts" \
  "SearchUtils.ts  [BFS/DFS regex pattern traversal — KEEP AS-IS]"

step "StorageUtils — storage-layer utility helpers (new)"
additive_copy \
  "$NOFS_SRC/utils/StorageUtils.ts" \
  "$TARGET_SRC/core/utils/StorageUtils.ts" \
  "StorageUtils.ts"

step "createMockDocument — test utility for document generation (new)"
additive_copy \
  "$NOFS_SRC/utils/createMockDocument.ts" \
  "$TARGET_SRC/core/utils/createMockDocument.ts" \
  "createMockDocument.ts  [test-only helper]"

step "PerformanceUtils — copy as .nofs.ts (compare with PerformanceMonitor.ts)"
safe_copy \
  "$NOFS_SRC/utils/PerformanceUtils.ts" \
  "$TARGET_SRC/core/utils/PerformanceUtils.nofs.ts" \
  "PerformanceUtils.nofs.ts  [diff against PerformanceMonitor.ts]"

step "ScoringUtils — conflict copy (both exist; diff required)"
safe_copy \
  "$NOFS_SRC/utils/ScoringUtils.ts" \
  "$TARGET_SRC/core/utils/ScoringUtils.nofs.ts" \
  "ScoringUtils.nofs.ts  [diff against existing ScoringUtils.ts]"

step "ValidationUtils — conflict copy (both exist; diff required)"
safe_copy \
  "$NOFS_SRC/utils/ValidationUtils.ts" \
  "$TARGET_SRC/core/utils/ValidationUtils.nofs.ts" \
  "ValidationUtils.nofs.ts  [diff against existing ValidationUtils.ts]"

step "Utils barrel index (nofs version for reference)"
additive_copy \
  "$NOFS_SRC/utils/index.ts" \
  "$TARGET_SRC/core/utils/utils_index.nofs.ts" \
  "utils_index.nofs.ts  [barrel reference]"

print_summary "Phase 04 — Utils"
