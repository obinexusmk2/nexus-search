# Nexus Search CLI/Core Exposure User Stories

## Objective
Validate that all core `src/core` functionality is accessible from the CLI client entry (`src/cli/index.ts`) for `nsc` / `nscli` distribution usage.

## User Stories

### 1) Access all core APIs from CLI entrypoint
**As a** developer integrating `nsc`/`nscli` in Node scripts  
**I want** to import core classes, methods, and functions directly from the CLI package entry  
**So that** I can use one import surface for both terminal execution and programmatic usage.

**Acceptance Criteria**
- `src/cli/index.ts` re-exports `src/core/index.ts`.
- Core exports include search engine, algorithms, storage, config, adapters, telemetry, types, mappers, and utilities.
- No additional deep-import paths are required for standard functionality.

### 2) Keep CLI command functionality discoverable
**As a** CLI extension author  
**I want** command-related exports grouped under `src/cli/commands.ts`  
**So that** I can discover and wire command modules from one location.

**Acceptance Criteria**
- `src/cli/commands.ts` exports `SearchCLI` and `SearchCLIDefault`.
- `src/cli/commands.ts` exports command runner and command module namespaces.
- `src/cli/index.ts` exports everything from `src/cli/commands.ts`.

### 3) Preserve binary behavior for terminal users
**As an** end user running `nsc` / `nscli` in terminal  
**I want** the distribution build to keep CLI entry behavior intact  
**So that** command usage remains stable while core APIs are exposed.

**Acceptance Criteria**
- Build succeeds for CLI entry bundle.
- Existing `SearchCLI` executable flow remains available.

## Validation Checklist
- [ ] `npm run build:cli` passes.
- [ ] `src/cli/index.ts` contains `export * from '../core/index';`.
- [ ] `src/cli/commands.ts` exposes CLI command-facing modules.
