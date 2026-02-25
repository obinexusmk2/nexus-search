#!/usr/bin/env bash
# =============================================================================
# lib/common.sh — Shared constants, logging, path variables, helper functions
# NexusSearch | OBINexus Computing — nofilesystem → nexus-search migration
# =============================================================================

# ── Colour palette ────────────────────────────────────────────────────────────
RED='\033[0;31m';    YELLOW='\033[1;33m'; GREEN='\033[0;32m'
CYAN='\033[0;36m';   BOLD='\033[1m';      RESET='\033[0m'
BLUE='\033[0;34m';   MAGENTA='\033[0;35m'

# ── Base path resolution (resolve from any CWD) ───────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPTS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SCRIPTS_ROOT/.." && pwd)"
BASE_DIR="$(cd "$REPO_ROOT/.." && pwd)"          # .../nexus-search/

NOFS_DIR="$BASE_DIR/nexus-search_nofilesystem"   # source
TARGET_DIR="$BASE_DIR/nexus-search"              # destination (this repo)
BACKUP_DIR="$BASE_DIR/.migration_backup_$(date +%Y%m%d_%H%M%S)"

NOFS_SRC="$NOFS_DIR/src"
TARGET_SRC="$TARGET_DIR/src"

# ── Global counters (exported so phases can update them) ─────────────────────
export MIGRATED=0
export SKIPPED=0
export CONFLICTS=0
export ERRORS=0

# ── Dry-run flag (set DRYRUN=1 to preview without writing) ───────────────────
DRYRUN="${DRYRUN:-0}"

# ── Logging helpers ───────────────────────────────────────────────────────────
ts()      { date '+%H:%M:%S'; }
info()    { echo -e "  ${CYAN}[$(ts)] INFO${RESET}  $*"; }
ok()      { echo -e "  ${GREEN}[$(ts)]   OK${RESET}  $*"; MIGRATED=$((MIGRATED+1)); }
warn()    { echo -e "  ${YELLOW}[$(ts)] WARN${RESET}  $*"; SKIPPED=$((SKIPPED+1)); }
err()     { echo -e "  ${RED}[$(ts)]  ERR${RESET}  $*" >&2; ERRORS=$((ERRORS+1)); }
conflict(){ echo -e "  ${MAGENTA}[$(ts)] CONF${RESET}  $*"; CONFLICTS=$((CONFLICTS+1)); }
phase()   { echo -e "\n${BOLD}${BLUE}══════════════════════════════════════════════════${RESET}"; \
            echo -e "${BOLD}${BLUE}  PHASE: $*${RESET}"; \
            echo -e "${BOLD}${BLUE}══════════════════════════════════════════════════${RESET}"; }
step()    { echo -e "\n${BOLD}  ▶ $*${RESET}"; }

# ── Guard: ensure both repos exist before any phase runs ─────────────────────
guard_repos() {
  if [[ ! -d "$NOFS_DIR" ]]; then
    err "Source not found: $NOFS_DIR"
    exit 1
  fi
  if [[ ! -d "$TARGET_DIR" ]]; then
    err "Target not found: $TARGET_DIR"
    exit 1
  fi
}

# ── Backup a file before overwriting ─────────────────────────────────────────
backup_file() {
  local src="$1"
  local rel="${src#$TARGET_DIR/}"
  local bak="$BACKUP_DIR/$rel"
  if [[ -f "$src" ]]; then
    mkdir -p "$(dirname "$bak")"
    cp "$src" "$bak"
  fi
}

# ── Copy src → dst, backing up any existing dst ──────────────────────────────
# Usage: safe_copy <source_file> <dest_file> [label]
safe_copy() {
  local src="$1"
  local dst="$2"
  local label="${3:-$(basename "$src")}"

  if [[ ! -f "$src" ]]; then
    warn "Source missing: $src"
    return
  fi

  mkdir -p "$(dirname "$dst")"

  if [[ -f "$dst" ]]; then
    conflict "$label  (backing up existing → .migration_backup)"
    backup_file "$dst"
  fi

  if [[ "$DRYRUN" == "1" ]]; then
    info "[DRY-RUN] cp $src → $dst"
  else
    cp "$src" "$dst"
    ok "$label"
  fi
}

# ── Merge-copy: only copies if dest does NOT exist ───────────────────────────
additive_copy() {
  local src="$1"
  local dst="$2"
  local label="${3:-$(basename "$src")}"

  if [[ ! -f "$src" ]]; then
    warn "Source missing: $src"
    return
  fi

  if [[ -f "$dst" ]]; then
    warn "$label  (already exists — skipping, manual merge required)"
    return
  fi

  mkdir -p "$(dirname "$dst")"

  if [[ "$DRYRUN" == "1" ]]; then
    info "[DRY-RUN] additive cp $src → $dst"
  else
    cp "$src" "$dst"
    ok "$label  (new file)"
  fi
}

# ── Copy entire directory tree ────────────────────────────────────────────────
# Usage: safe_copy_dir <src_dir> <dst_dir>
safe_copy_dir() {
  local src="$1"
  local dst="$2"

  if [[ ! -d "$src" ]]; then
    warn "Source dir missing: $src"
    return
  fi

  find "$src" -type f | while IFS= read -r file; do
    local rel="${file#$src/}"
    safe_copy "$file" "$dst/$rel" "$rel"
  done
}

# ── In-place sed replacement across all .ts files in a directory ─────────────
# Usage: fix_imports <dir> <old_pattern> <new_string>
fix_imports() {
  local dir="$1"
  local old="$2"
  local new="$3"

  if [[ "$DRYRUN" == "1" ]]; then
    info "[DRY-RUN] sed: s|$old|$new| in $dir/**/*.ts"
    return
  fi

  find "$dir" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) \
    -exec sed -i "s|$old|$new|g" {} \;
}

# ── Summary banner ────────────────────────────────────────────────────────────
print_summary() {
  local phase="${1:-Migration}"
  echo -e "\n${BOLD}${GREEN}┌──────────────────────────────────────────┐${RESET}"
  echo -e "${BOLD}${GREEN}│  $phase Summary${RESET}"
  echo -e "${BOLD}${GREEN}├──────────────────────────────────────────┤${RESET}"
  echo -e "${BOLD}${GREEN}│  ✓ Migrated  : $MIGRATED${RESET}"
  echo -e "${BOLD}${YELLOW}│  ⚠ Skipped   : $SKIPPED  (manual merge needed)${RESET}"
  echo -e "${BOLD}${MAGENTA}│  ⚡ Conflicts : $CONFLICTS  (backups created)${RESET}"
  echo -e "${BOLD}${RED}│  ✗ Errors    : $ERRORS${RESET}"
  echo -e "${BOLD}${GREEN}└──────────────────────────────────────────┘${RESET}"
  if [[ -d "$BACKUP_DIR" ]]; then
    echo -e "  ${CYAN}Backups saved to: $BACKUP_DIR${RESET}"
  fi
}
