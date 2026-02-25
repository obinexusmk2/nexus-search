// src/cli/index.ts
// Entry point for the nscli / nsc binary (dist/cli/index.js).
// Shebang (#!/usr/bin/env node) is injected by rollup's banner config.

// ─── Library export ───────────────────────────────────────────────────────────
export { SearchCLI } from './search-cli';
export { default as SearchCLIDefault } from './search-cli';

// ─── Command stubs (tree-aligned with nexus-search-tree.txt) ─────────────────
export * from './commands';