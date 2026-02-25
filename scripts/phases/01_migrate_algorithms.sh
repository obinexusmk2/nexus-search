#!/usr/bin/env bash
# =============================================================================
# phases/01_migrate_algorithms.sh
# Migrate: TrieNode, TrieSearch (enhanced v0.1.57 versions with shouldPrune,
#          getScore, getWeight) into src/core/algorithms/
# Also pulls: trie/index.ts barrel
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "01 — Core Algorithm Migration (TrieNode · TrieSearch · Trie index)"

step "TrieNode — replace with v0.1.57 (adds shouldPrune / getScore / getWeight)"
safe_copy \
  "$NOFS_SRC/algorithms/trie/TrieNode.ts" \
  "$TARGET_SRC/core/algorithms/TrieNode.ts" \
  "TrieNode.ts  [enhanced AVL-Trie node]"

step "TrieSearch — replace with v0.1.57 (better BFS/DFS regex integration)"
safe_copy \
  "$NOFS_SRC/algorithms/trie/TrieSearch.ts" \
  "$TARGET_SRC/core/algorithms/TrieSearch.ts" \
  "TrieSearch.ts  [unified BFS+DFS search]"

step "Trie barrel index (algorithms/trie/index.ts → algorithms barrel)"
# nofs has an explicit index; merge it as a new trie-specific barrel
additive_copy \
  "$NOFS_SRC/algorithms/trie/index.ts" \
  "$TARGET_SRC/core/algorithms/trie_index.ts" \
  "trie_index.ts  (barrel — review for re-export merge)"

step "Remove duplicate misnamed test (TrieSeach.test.ts)"
DUPE_TEST="$TARGET_DIR/__tests__/unit/core/algorithms/TrieSeach.test.ts"
if [[ -f "$DUPE_TEST" ]]; then
  rm "$DUPE_TEST" 2>/dev/null \
    && ok "Removed misspelled duplicate: TrieSeach.test.ts" \
    || warn "Could not auto-remove — delete manually: rm $DUPE_TEST"
else
  info "Duplicate test not found — already clean"
fi

print_summary "Phase 01 — Algorithms"
