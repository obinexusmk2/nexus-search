#!/usr/bin/env bash
# =============================================================================
# scripts/migrate_nofs.sh
# ─────────────────────────────────────────────────────────────────────────────
# MASTER ORCHESTRATOR — NexusSearch nofilesystem → nexus-search migration
# OBINexus Computing | @obinexuscomputing/nexus-search
#
# USAGE:
#   ./scripts/migrate_nofs.sh               # full migration
#   ./scripts/migrate_nofs.sh --dry-run     # preview without writing
#   ./scripts/migrate_nofs.sh --phase 01    # run only one phase
#   ./scripts/migrate_nofs.sh --phase 01,03,07  # run specific phases
#   ./scripts/migrate_nofs.sh --skip 10     # run all except phase 10
#   ./scripts/migrate_nofs.sh --from 05     # run phases 05 → 10
#
# PHASES:
#   01  Core Algorithms   (TrieNode, TrieSearch)
#   02  Storage Layer     (BlobReaderAdapter, StorageManager, BaseDocument …)
#   03  Type Definitions  (cache, database, errors, guards, scoring …)
#   04  Utilities         (AlgoUtils, SearchUtils, StorageUtils …)
#   05  Config Module     (NexusSearchConfig, ConfigValidator, defaults …)
#   06  Mappers & Plugins (DataMapper, IndexMapper, NexusDocument …)
#   07  Test Suite        (20+ unit + integration tests + fixtures)
#   08  Docs & Assets     (docs/, examples/, images/, README refs)
#   09  Import Rewrites   (fix all @storage/, @algorithms/, @utils/ aliases)
#   10  Verify Build      (tsc --noEmit, eslint, rollup build, jest)
#
# ENVIRONMENT:
#   DRYRUN=1  same as --dry-run
# =============================================================================
set -euo pipefail

# ── Resolve script root ───────────────────────────────────────────────────────
SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPTS_DIR/lib/common.sh"

# ── Defaults ──────────────────────────────────────────────────────────────────
ALL_PHASES=(01 02 03 04 05 06 07 08 09 10)
RUN_PHASES=("${ALL_PHASES[@]}")
FROM_PHASE=""
SKIP_PHASE=""

PHASE_NAMES=(
  [01]="Core Algorithms"
  [02]="Storage Layer"
  [03]="Type Definitions"
  [04]="Utilities"
  [05]="Config Module"
  [06]="Mappers & Plugins"
  [07]="Test Suite"
  [08]="Docs & Assets"
  [09]="Import Rewrites"
  [10]="Verify Build"
)

# ── Argument parsing ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run|-n)
      export DRYRUN=1
      info "DRY-RUN mode — no files will be written"
      ;;
    --phase|-p)
      IFS=',' read -ra RUN_PHASES <<< "$2"
      shift
      ;;
    --skip|-s)
      SKIP_PHASE="$2"
      shift
      ;;
    --from|-f)
      FROM_PHASE="$2"
      shift
      ;;
    --help|-h)
      sed -n '3,30p' "${BASH_SOURCE[0]}"
      exit 0
      ;;
    *)
      err "Unknown argument: $1  (try --help)"
      exit 1
      ;;
  esac
  shift
done

# Apply --from filter
if [[ -n "$FROM_PHASE" ]]; then
  RUN_PHASES=()
  for p in "${ALL_PHASES[@]}"; do
    [[ "10#$p" -ge "10#$FROM_PHASE" ]] && RUN_PHASES+=("$p")
  done
fi

# Apply --skip filter
if [[ -n "$SKIP_PHASE" ]]; then
  FILTERED=()
  for p in "${RUN_PHASES[@]}"; do
    [[ "$p" != "$SKIP_PHASE" ]] && FILTERED+=("$p")
  done
  RUN_PHASES=("${FILTERED[@]}")
fi

# ── Pre-flight ────────────────────────────────────────────────────────────────
guard_repos

echo -e "\n${BOLD}${CYAN}"
echo "  ╔══════════════════════════════════════════════════════════╗"
echo "  ║    NexusSearch — nofilesystem → nexus-search migration   ║"
echo "  ║    OBINexus Computing | Nnamdi Michael Okpala            ║"
echo "  ╚══════════════════════════════════════════════════════════╝"
echo -e "${RESET}"
echo -e "  ${BOLD}Source${RESET}  : $NOFS_DIR"
echo -e "  ${BOLD}Target${RESET}  : $TARGET_DIR"
echo -e "  ${BOLD}Phases${RESET}  : ${RUN_PHASES[*]}"
echo -e "  ${BOLD}Dry-run${RESET} : ${DRYRUN}"
echo ""

START_TIME=$(date +%s)

# ── Phase runner ──────────────────────────────────────────────────────────────
run_phase() {
  local num="$1"
  local name="${PHASE_NAMES[$num]:-Phase $num}"
  local script="$SCRIPTS_DIR/phases/${num}_"

  # Find the phase file (glob for the suffix)
  local found
  found=$(ls "$SCRIPTS_DIR/phases/${num}_"*.sh 2>/dev/null | head -1)

  if [[ -z "$found" ]]; then
    err "Phase script not found: $SCRIPTS_DIR/phases/${num}_*.sh"
    return 1
  fi

  echo -e "\n${BOLD}${BLUE}▶▶  Running phase $num: $name${RESET}"
  bash "$found"
}

# ── Execute selected phases ───────────────────────────────────────────────────
PHASE_ERRORS=0
for p in "${RUN_PHASES[@]}"; do
  if ! run_phase "$p"; then
    err "Phase $p failed — continuing with remaining phases"
    PHASE_ERRORS=$((PHASE_ERRORS+1))
  fi
done

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

# ── Final summary ─────────────────────────────────────────────────────────────
echo -e "\n${BOLD}${GREEN}╔══════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║  MIGRATION COMPLETE                                      ║${RESET}"
echo -e "${BOLD}${GREEN}╠══════════════════════════════════════════════════════════╣${RESET}"
echo -e "${BOLD}${GREEN}║  ✓ Migrated  : $MIGRATED files${RESET}"
echo -e "${BOLD}${YELLOW}║  ⚠ Skipped   : $SKIPPED  (manual merge needed)${RESET}"
echo -e "${BOLD}${MAGENTA}║  ⚡ Conflicts : $CONFLICTS  (backups at .migration_backup_*)${RESET}"
echo -e "${BOLD}${RED}║  ✗ Errors    : $ERRORS  (check logs above)${RESET}"
echo -e "${BOLD}${CYAN}║  ⏱ Duration  : ${ELAPSED}s${RESET}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════════════════════╝${RESET}"

if [[ $PHASE_ERRORS -gt 0 ]]; then
  echo -e "\n${RED}  $PHASE_ERRORS phase(s) encountered errors.${RESET}"
  echo -e "  Re-run failed phases individually:  --phase <num>\n"
  exit 1
fi

# ── Post-migration checklist ──────────────────────────────────────────────────
echo -e "\n${BOLD}  POST-MIGRATION CHECKLIST${RESET}"
echo -e "  ─────────────────────────────────────────────────────"
echo -e "  ${YELLOW}1.${RESET} Diff all *.nofs.ts files against their counterparts:"
echo -e "     ${CYAN}find src/ -name '*.nofs.ts' | while read f; do"
echo -e "       diff \"\${f%.nofs.ts}.ts\" \"\$f\" || true; done${RESET}"
echo ""
echo -e "  ${YELLOW}2.${RESET} Merge storage/StorageAdapter.nofs.ts interface into"
echo -e "     StorageAdapter.ts (unified optional methods pattern)"
echo ""
echo -e "  ${YELLOW}3.${RESET} Consolidate src/core/storage/IndexManager.nofs.ts into"
echo -e "     src/core/search/IndexManager.ts"
echo ""
echo -e "  ${YELLOW}4.${RESET} Update rollup.config.js path aliases to include:"
echo -e "     @core/mappers, @core/plugins, @core/config"
echo ""
echo -e "  ${YELLOW}5.${RESET} Update tsconfig.json paths to match new aliases"
echo ""
echo -e "  ${YELLOW}6.${RESET} Update src/index.ts and src/core/index.ts to re-export"
echo -e "     new modules (mappers, plugins, config, DocumentLink)"
echo ""
echo -e "  ${YELLOW}7.${RESET} Bump version in package.json from 0.3.0 → 0.4.0"
echo ""
echo -e "  ${YELLOW}8.${RESET} Re-run phase 10 after manual merges:"
echo -e "     ${CYAN}./scripts/migrate_nofs.sh --phase 10${RESET}"
echo ""
echo -e "  ${YELLOW}9.${RESET} Archive nexus-search_nofilesystem/:"
echo -e "     ${CYAN}mv nexus-search_nofilesystem/ .archive/nexus-search_nofilesystem_v0157${RESET}"
echo ""
echo -e "  ${YELLOW}10.${RESET} Commit with full history note for OBINexus continuity."
echo -e "      ${CYAN}git add . && git commit -m 'feat: converge nofilesystem into nexus-search v0.4.0'${RESET}"
echo ""
