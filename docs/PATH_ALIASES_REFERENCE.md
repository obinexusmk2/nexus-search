# OBINexus NexusSearch - Path Aliases Quick Reference

## Import Resolution Guide

Use these aliases throughout your codebase for consistent module resolution.

### Root & Core Aliases

```typescript
// Root imports (NEW - CRITICAL)
import { Logger } from '/types/Logger'
import { Config } from '/config'

// Default barrel imports
import { SearchEngine } from '@'
import { SearchEngine } from '@/' // Also valid

// Core module imports
import { Searcher } from '@core/search/Searcher'
import { IndexStorage } from '@core/storage/IndexStorage'
```

### Subsystem-Specific Imports

#### Algorithms
```typescript
import { BM25Algorithm } from '@algorithms/BM25'
import { TfIdfRanker } from '@algorithms/TfIdf'
```

#### Search Engine
```typescript
import { SearchEngine } from '@search/SearchEngine'
import { QueryParser } from '@search/QueryParser'
import { ResultProcessor } from '@search/ResultProcessor'
```

#### Storage Layer
```typescript
import { IndexStorage } from '@storage/IndexStorage'
import { DocumentStore } from '@storage/DocumentStore'
import { CacheManager } from '@storage/CacheManager'
```

#### Utilities
```typescript
import { Logger } from '@utils/Logger'
import { TextAnalyzer } from '@utils/TextAnalyzer'
import { ValidationHelper } from '@utils/Validation'
```

#### Document Processing
```typescript
import { DocumentProcessor } from '@documents/DocumentProcessor'
import { PDFExtractor } from '@documents/extractors/PDFExtractor'
import { TextExtractor } from '@documents/extractors/TextExtractor'
```

#### Type Definitions
```typescript
import type { SearchOptions } from '@types/SearchOptions'
import type { SearchResult } from '@types/SearchResult'
import type { Document } from '@types/Document'
```

#### Telemetry & Compliance
```typescript
import { ComplianceLogger } from '@telemetry/ComplianceLogger'
import { GhostingDetector } from '@telemetry/GhostingDetector'
import { PerformanceMonitor } from '@telemetry/PerformanceMonitor'
```

### Platform Adapters

#### Browser Adapter
```typescript
import { BrowserFileHandler } from '@browser/FileHandler'
import { IndexedDBStorage } from '@browser/IndexedDBStorage'
import { BrowserSearchEngine } from '@browser/SearchEngine'
```

#### Node.js Adapter
```typescript
import { NodeFileSystem } from '@node/FileSystem'
import { LevelDBStorage } from '@node/LevelDBStorage'
import { NodeSearchEngine } from '@node/SearchEngine'
```

#### Generic Adapters
```typescript
import { FileAdapter } from '@adapters/FileAdapter'
import { StorageAdapter } from '@adapters/StorageAdapter'
```

### Web Integration

```typescript
import { SearchWidget } from '@web/components/SearchWidget'
import { useSearch } from '@web/hooks/useSearch'
import { ResultsProvider } from '@web/context/ResultsProvider'
```

### CLI Commands

```typescript
import { IndexCommand } from '@cli/commands/IndexCommand'
import { SearchCommand } from '@cli/commands/SearchCommand'
import { ExportCommand } from '@cli/commands/ExportCommand'
import { CLIFormatter } from '@cli/formatters/CLIFormatter'
```

---

## Alias Resolution Map

| Alias | Resolves To | Use Case |
|-------|------------|----------|
| `/` | `src/` | Root-level imports (NEW) |
| `@` | `src/` | Default/barrel exports |
| `@core` | `src/core/` | Core engine access |
| `@algorithms` | `src/core/algorithms/` | Algorithm implementations |
| `@search` | `src/core/search/` | Search engine core |
| `@storage` | `src/core/storage/` | Data storage layer |
| `@utils` | `src/core/utils/` | Utility functions |
| `@documents` | `src/core/documents/` | Document processing |
| `@types` | `src/types/` | Type definitions |
| `@telemetry` | `src/core/telemetry/` | Monitoring & compliance |
| `@adapters` | `src/adapters/` | Platform adapters base |
| `@browser` | `src/adapters/browser/` | Browser-specific code |
| `@node` | `src/adapters/node/` | Node.js-specific code |
| `@web` | `src/web/` | Web components & hooks |
| `@cli` | `src/cli/` | CLI commands & tools |

---

## Valid Import Styles

All these import styles are now supported:

```typescript
// Style 1: Default alias
import { SearchEngine } from '@'

// Style 2: Scoped alias with path
import { Searcher } from '@search/Searcher'

// Style 3: Root absolute path
import { Logger } from '/types/Logger'

// Style 4: Full relative path (still supported)
import { Something } from '../core/utils/Something'

// Style 5: With trailing slash variant
import { Config } from '@core/'
import { Algorithm } from '@algorithms/'
```

---

## Key Points

✅ **Consistency**: Use aliases instead of relative paths for cross-module imports
✅ **Refactoring-Safe**: Moving files doesn't break imports if you use aliases
✅ **IDE Support**: TypeScript IDEs (VS Code, WebStorm) support alias auto-completion
✅ **Build Optimization**: Rollup can optimize aliased imports for tree-shaking
✅ **Type Safety**: Full type checking across alias boundaries

❌ **Avoid**: Long chains of `../../../` relative paths
❌ **Avoid**: Mixing alias and relative path styles in the same module
❌ **Avoid**: Circular imports between alias domains

---

## Integration with OBINexus Build Pipeline

These aliases work seamlessly with the build orchestration:

- **nlink**: Resolves aliases before linking
- **polybuild**: Applies aliases during multi-format compilation
- **riftlang.exe**: Intermediate alias resolution
- **rift.exe**: Runtime binding with proper module references
- **Type Definitions**: Full source map support for IDE navigation

---

## Troubleshooting

### Issue: Alias not resolving in build

**Solution**: Verify both `tsconfig.json` and `rollup.config.js` have the alias defined.

### Issue: IDE not showing autocomplete for aliases

**Solution**:
1. Ensure VS Code/IDE reads from `tsconfig.json`
2. Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
3. Check `baseUrl` and `paths` are correctly set

### Issue: Runtime error "Cannot find module"

**Solution**:
1. Verify the aliased path exists
2. Check file extension (`.ts` vs `.js`)
3. Ensure no circular dependencies
4. Run `npm run build` to verify build succeeds

---

**Last Updated:** 2026-02-25
**OBINexus Status:** Build Pipeline Recovered
**Configuration Version:** 2.1 (Root Alias Enhancement)
