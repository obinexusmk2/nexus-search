// src/cli/commands.ts
// Unified command-facing exports for nscli / nsc.

export { SearchCLI } from './search-cli';
export { default as SearchCLIDefault } from './search-cli';

// Expose command runner surface (currently lightweight for distribution stability).
export * from './CommandRunner';

// Expose command module paths so downstream consumers can wire custom command trees.
export * as CommandModules from './commands/Command';
export * as IndexCommandModule from './commands/IndexCommand';
export * as SearchCommandModule from './commands/SearchCommand';
export * as ImportCommandModule from './commands/ImportCommand';
export * as ExportCommandModule from './commands/ExportCommand';
