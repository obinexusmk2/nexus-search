#!/usr/bin/env bash
# =============================================================================
# phases/06_migrate_mappers_plugins.sh
# Migrate: DataMapper, IndexMapper (src/mappers/) and NexusDocument plugin
# Both are entirely net-new to nexus-search v0.3.0.
# Destination:
#   Mappers  → src/core/mappers/
#   Plugins  → src/core/plugins/
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "06 — Mappers & Plugins Migration"

# ── Mappers ───────────────────────────────────────────────────────────────────
mkdir -p "$TARGET_SRC/core/mappers"

step "DataMapper"
additive_copy \
  "$NOFS_SRC/mappers/DataMapper.ts" \
  "$TARGET_SRC/core/mappers/DataMapper.ts" \
  "DataMapper.ts  [document field mapping]"

step "IndexMapper"
additive_copy \
  "$NOFS_SRC/mappers/IndexMapper.ts" \
  "$TARGET_SRC/core/mappers/IndexMapper.ts" \
  "IndexMapper.ts  [trie index field mapping]"

step "Mappers barrel index"
additive_copy \
  "$NOFS_SRC/mappers/index.ts" \
  "$TARGET_SRC/core/mappers/index.ts" \
  "mappers/index.ts"

# ── Plugins ───────────────────────────────────────────────────────────────────
mkdir -p "$TARGET_SRC/core/plugins"

step "NexusDocument plugin"
additive_copy \
  "$NOFS_SRC/plugins/NexusDocument.ts" \
  "$TARGET_SRC/core/plugins/NexusDocument.ts" \
  "NexusDocument.ts  [document plugin interface]"

step "Plugins barrel index"
additive_copy \
  "$NOFS_SRC/plugins/index.ts" \
  "$TARGET_SRC/core/plugins/index.ts" \
  "plugins/index.ts"

# ── Core: DocumentLink (used by SearchEngine for graph edge weighting) ────────
step "DocumentLink — graph edge type for weighted document links"
additive_copy \
  "$NOFS_SRC/core/DocumentLink.ts" \
  "$TARGET_SRC/core/search/DocumentLink.ts" \
  "DocumentLink.ts  [PageRank-style document graph edges]"

step "QueryProcessor — conflict copy (compare with existing)"
safe_copy \
  "$NOFS_SRC/core/QueryProcessor.ts" \
  "$TARGET_SRC/core/search/QueryProcessor.nofs.ts" \
  "QueryProcessor.nofs.ts  [diff against existing QueryProcessor.ts]"

step "SearchEngine — conflict copy (compare with existing)"
safe_copy \
  "$NOFS_SRC/core/SearchEngine.ts" \
  "$TARGET_SRC/core/search/SearchEngine.nofs.ts" \
  "SearchEngine.nofs.ts  [diff against existing SearchEngine.ts]"

step "Core barrel reference"
additive_copy \
  "$NOFS_SRC/core/index.ts" \
  "$TARGET_SRC/core/core_index.nofs.ts" \
  "core_index.nofs.ts  [barrel reference — check missing exports]"

print_summary "Phase 06 — Mappers & Plugins"
