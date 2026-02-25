#!/usr/bin/env bash
# =============================================================================
# phases/02_migrate_storage.sh
# Migrate: BlobReaderAdapter, FileReaderAdapter, StorageManager (new),
#          SearchStorage, BaseDocument, and IndexedDBService enhancements
# Strategy:
#   - BlobReaderAdapter / FileReaderAdapter → browser/ adapters (new files)
#   - StorageManager → new file in core/storage/
#   - SearchStorage, BaseDocument → new files in core/storage/
#   - CacheManager, IndexedDBService → conflict copies (manual merge needed)
# =============================================================================
set -euo pipefail
source "$(dirname "$0")/../lib/common.sh"
guard_repos

phase "02 — Storage Layer Migration"

# ── Browser adapters (net-new additions) ──────────────────────────────────────
step "BlobReaderAdapter — new browser-only adapter"
safe_copy \
  "$NOFS_SRC/adapters/BlobReaderAdapter.ts" \
  "$TARGET_SRC/core/adapters/browser/BlobReaderAdapter.ts" \
  "BlobReaderAdapter.ts  [browser blob → IndexedDB pipeline]"

step "FileReaderAdapter — new browser file-reader shim"
safe_copy \
  "$NOFS_SRC/adapters/FileReaderAdapter.ts" \
  "$TARGET_SRC/core/adapters/browser/FileReaderAdapter.ts" \
  "FileReaderAdapter.ts  [browser FileReader API wrapper]"

# ── StorageManager (entirely new module from nofilesystem) ────────────────────
step "StorageManager — new unified storage orchestrator"
additive_copy \
  "$NOFS_SRC/adapters/StorageManager.ts" \
  "$TARGET_SRC/core/storage/StorageManager.ts" \
  "StorageManager.ts  [wraps any StorageAdapter with validation + fallback]"

# ── StorageAdapter interface — conflict, needs manual merge ───────────────────
step "StorageAdapter — conflict copy (interfaces differ; manual merge required)"
safe_copy \
  "$NOFS_SRC/adapters/StorageAdapter.ts" \
  "$TARGET_SRC/core/storage/StorageAdapter.nofs.ts" \
  "StorageAdapter.nofs.ts  [v0.1.57 interface — diff against StorageAdapter.ts]"

# ── Storage module files ───────────────────────────────────────────────────────
step "BaseDocument — new base document schema"
additive_copy \
  "$NOFS_SRC/storage/BaseDocument.ts" \
  "$TARGET_SRC/core/storage/BaseDocument.ts" \
  "BaseDocument.ts"

step "SearchStorage — new storage wrapper for document results"
additive_copy \
  "$NOFS_SRC/storage/SearchStorage.ts" \
  "$TARGET_SRC/core/storage/SearchStorage.ts" \
  "SearchStorage.ts"

step "CacheManager — conflict copy (v0.1.57 version; compare vs v0.3.0)"
safe_copy \
  "$NOFS_SRC/storage/CacheManager.ts" \
  "$TARGET_SRC/core/storage/CacheManager.nofs.ts" \
  "CacheManager.nofs.ts  [v0.1.57 — diff against CacheManager.ts]"

step "CacheManager2 — secondary implementation (review for merge)"
additive_copy \
  "$NOFS_SRC/storage/CacheManager2.ts" \
  "$TARGET_SRC/core/storage/CacheManager2.ts" \
  "CacheManager2.ts  [experimental — review before keeping]"

step "IndexedDBService — conflict copy"
safe_copy \
  "$NOFS_SRC/storage/IndexedDBService.ts" \
  "$TARGET_SRC/core/storage/IndexedDBService.nofs.ts" \
  "IndexedDBService.nofs.ts  [v0.1.57 — diff against IndexedDBAdapter.ts]"

step "IndexedDocument2 — supplementary document type"
additive_copy \
  "$NOFS_SRC/storage/IndexedDocument2.ts" \
  "$TARGET_SRC/core/storage/IndexedDocument2.ts" \
  "IndexedDocument2.ts"

step "IndexManager (nofs storage) — conflict copy for manual review"
safe_copy \
  "$NOFS_SRC/storage/IndexManager.ts" \
  "$TARGET_SRC/core/storage/IndexManager.nofs.ts" \
  "IndexManager.nofs.ts  [v0.1.57 — consolidate with search/IndexManager.ts]"

# ── Barrel ────────────────────────────────────────────────────────────────────
step "Storage barrel index"
additive_copy \
  "$NOFS_SRC/storage/index.ts" \
  "$TARGET_SRC/core/storage/storage_index.nofs.ts" \
  "storage_index.nofs.ts  [barrel — review and merge exports]"

print_summary "Phase 02 — Storage"
