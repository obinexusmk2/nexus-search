// src/cli/index.ts
// Entry point for the nscli / nsc binary (dist/cli/index.js).
// Shebang (#!/usr/bin/env node) is injected by rollup's banner config.

// ─── CLI library export ──────────────────────────────────────────────────────
export { SearchCLI } from './search-cli';
export { default as SearchCLIDefault } from './search-cli';

// ─── Command exports ─────────────────────────────────────────────────────────
export * from './commands';

// ─── Core surface passthrough ───────────────────────────────────────────────
// This ensures nscli / nsc can consume every core API from a single entrypoint.
export * from '../core/index';
