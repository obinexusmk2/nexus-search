#!/usr/bin/env bash
# =============================================================================
# phases/09_fix_imports.sh
# Rewrite import path aliases across all migrated .ts/.tsx/.js files so they
# resolve correctly inside the nexus-search v0.3.0 folder structure.
#
# nofilesystem path aliases         → nexus-search equivalents
# ─────────────────────────────────────────────────────────────
# @core/SearchEngine                → @core/search/SearchEngine
# @core/QueryProcessor              → @core/search/QueryProcessor
# @core/DocumentLink                → @core/search/DocumentLink
# @core/index                       → @core/index
# @storage/IndexManager             → @core/storage/IndexManager
# @storage/CacheManager             → @core/storage/CacheManager
# @storage/IndexedDBService         → @core/storage/IndexedDBService
# @storage/SearchStorage            → @core/storage/SearchStorage
# @storage/BaseDocument             → @core/storage/BaseDocument
# @storage/IndexedDocument          → @core/storage/IndexedDocument
# @algorithms/trie/TrieNode         → @core/algorithms/TrieNode
# @algorithms/trie/TrieSearch       → @core/algorithms/TrieSearch
# @algorithms/trie                  → @core/algorithms
# @/mappers/                        → @core/mappers/
# @/plugins/                        → @core/plugins/
# @/config/                         → @core/config/
# @utils/                           → @core/utils/
# @adapters/                        → @core/adapters/
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "09 — Import Path Rewriting"

SRC="$TARGET_SRC"

# Helper: announce + run fix_imports
rewrite() {
  local label="$1"; local old="$2"; local new="$3"
  step "$label"
  info "  s|$old|$new|"
  fix_imports "$SRC" "$old" "$new"
  ok "$label"
}

# ── Core module paths ─────────────────────────────────────────────────────────
rewrite "nofs @core/SearchEngine  → @core/search/SearchEngine" \
  "from '@core/SearchEngine'" \
  "from '@core/search/SearchEngine'"

rewrite "nofs @core/QueryProcessor  → @core/search/QueryProcessor" \
  "from '@core/QueryProcessor'" \
  "from '@core/search/QueryProcessor'"

rewrite "nofs @core/DocumentLink  → @core/search/DocumentLink" \
  "from '@core/DocumentLink'" \
  "from '@core/search/DocumentLink'"

rewrite "nofs @core/index  → @core/index  (unchanged)" \
  "from '@core/index'" \
  "from '@core/index'"

# ── Storage paths ─────────────────────────────────────────────────────────────
rewrite "@storage/IndexManager  → @core/storage/IndexManager" \
  "from '@storage/IndexManager'" \
  "from '@core/storage/IndexManager'"

rewrite "@storage/CacheManager  → @core/storage/CacheManager" \
  "from '@storage/CacheManager'" \
  "from '@core/storage/CacheManager'"

rewrite "@storage/IndexedDBService  → @core/storage/IndexedDBService" \
  "from '@storage/IndexedDBService'" \
  "from '@core/storage/IndexedDBService'"

rewrite "@storage/SearchStorage  → @core/storage/SearchStorage" \
  "from '@storage/SearchStorage'" \
  "from '@core/storage/SearchStorage'"

rewrite "@storage/BaseDocument  → @core/storage/BaseDocument" \
  "from '@storage/BaseDocument'" \
  "from '@core/storage/BaseDocument'"

rewrite "@storage/IndexedDocument  → @core/storage/IndexedDocument" \
  "from '@storage/IndexedDocument'" \
  "from '@core/storage/IndexedDocument'"

rewrite "@storage/  (wildcard catch-all)  → @core/storage/" \
  "from '@storage/" \
  "from '@core/storage/"

# ── Algorithm paths ───────────────────────────────────────────────────────────
rewrite "@algorithms/trie/TrieNode  → @core/algorithms/TrieNode" \
  "from '@algorithms/trie/TrieNode'" \
  "from '@core/algorithms/TrieNode'"

rewrite "@algorithms/trie/TrieSearch  → @core/algorithms/TrieSearch" \
  "from '@algorithms/trie/TrieSearch'" \
  "from '@core/algorithms/TrieSearch'"

rewrite "@algorithms/trie  → @core/algorithms (barrel)" \
  "from '@algorithms/trie'" \
  "from '@core/algorithms'"

rewrite "@algorithms/  (wildcard)  → @core/algorithms/" \
  "from '@algorithms/" \
  "from '@core/algorithms/"

# ── Mapper / Plugin / Config / Utils paths ────────────────────────────────────
rewrite "@/mappers/  → @core/mappers/" \
  "from '@/mappers/" \
  "from '@core/mappers/"

rewrite "@/plugins/  → @core/plugins/" \
  "from '@/plugins/" \
  "from '@core/plugins/"

rewrite "@/config/  → @core/config/" \
  "from '@/config/" \
  "from '@core/config/"

rewrite "@utils/  → @core/utils/" \
  "from '@utils/" \
  "from '@core/utils/"

rewrite "@adapters/  → @core/adapters/" \
  "from '@adapters/" \
  "from '@core/adapters/"

# ── Fix relative imports in migrated test files ───────────────────────────────
step "Fix relative imports in __tests__ (../../src → adjust to resolved aliases)"
# Tests typically import via alias; if any use relative paths, normalise them
TESTS_DIR="$TARGET_DIR/__tests__"
if [[ -d "$TESTS_DIR" ]]; then
  # Replace common misaligned relative paths that may appear in nofs tests
  find "$TESTS_DIR" -type f -name "*.ts" \
    -exec sed -i "s|from '\.\.\/\.\.\/src\/|from '@|g" {} \;
  ok "Relative test imports normalised"
fi

print_summary "Phase 09 — Import Rewrites"
