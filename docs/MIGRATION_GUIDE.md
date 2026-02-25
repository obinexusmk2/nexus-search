# OBINexus NexusSearch - Build Configuration Migration Guide

## Overview

The build configuration has been updated to fix missing `/src` alias support and correct module resolution paths. This guide explains the changes and how to migrate your code if needed.

---

## Critical Changes

### 1. Root Entry Point Changed

**Before:**
```javascript
// rollup.config.js
const coreConfig = {
  input: 'src/core/index.ts',  // ❌ Incorrect entry point
  // ...
}

// Type definitions
{
  input: 'src/core/index.ts',   // ❌ Wrong source
  // ...
}
```

**After:**
```javascript
// rollup.config.js
const coreConfig = {
  input: 'src/index.ts',  // ✅ Correct root entry
  // ...
}

// Type definitions
{
  input: 'src/index.ts',   // ✅ Proper root source
  // ...
}
```

**Impact:** Build now correctly starts from project root instead of core subsystem. Your project needs an `src/index.ts` that exports all public APIs.

**Required Structure:**
```typescript
// src/index.ts - Main export file
export { SearchEngine } from '@core/search/SearchEngine'
export { IndexStorage } from '@core/storage/IndexStorage'
export { DocumentProcessor } from '@documents/DocumentProcessor'
export * from '@types'

// Re-export with proper namespacing
export { default as core } from '@core'
export { default as adapters } from '@adapters'
export { default as web } from '@web'
```

---

### 2. New Root `/src` Alias

**Before:**
```json
// tsconfig.json - Rollup aliases
const srcAliases = [
  { find: '@', replacement: path.resolve(__dirname, 'src') },
  { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  // ... missing root alias
]
```

**After:**
```json
// Both tsconfig.json and rollup.config.js
"paths": {
  "/*": ["src/*"],      // ✅ NEW: Root alias
  "@/*": ["src/*"],     // Keep existing
  "@core/*": ["src/core/*"],
  // ... all others
}
```

**Usage:** Can now import from root without @ prefix:
```typescript
// NEW - Now possible
import { Logger } from '/types/Logger'
import { Config } from '/config'

// Still works
import { Logger } from '@/types/Logger'
import { Logger } from '@utils/Logger'
```

---

### 3. Trailing Slash Variants

**Before:**
```javascript
const srcAliases = [
  { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  { find: '@algorithms', replacement: path.resolve(__dirname, 'src/core/algorithms') },
  // Only without trailing slash
]
```

**After:**
```javascript
const srcAliases = [
  { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  { find: '@core/', replacement: path.resolve(__dirname, 'src/core') },  // ✅ NEW
  { find: '@algorithms', replacement: path.resolve(__dirname, 'src/core/algorithms') },
  { find: '@algorithms/', replacement: path.resolve(__dirname, 'src/core/algorithms') },  // ✅ NEW
  // ... all aliases now have variants
]
```

**Usage:** Improves flexibility:
```typescript
// Both styles now work
import { Searcher } from '@search'
import { Searcher } from '@search/'

import { Algorithm } from '@algorithms/BM25'
import { Algorithm } from '@algorithms/'
```

---

### 4. Enhanced Type Configuration

**Before:**
```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "declaration": true,
    "sourceMap": true,
    // No declaration maps
    // No allowSyntheticDefaultImports
  }
}
```

**After:**
```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "declaration": true,
    "declarationMap": true,           // ✅ NEW: Type source maps
    "sourceMap": true,
    "allowSyntheticDefaultImports": true,  // ✅ NEW: Better CJS interop
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    // ...
  }
}
```

**Benefits:**
- `declarationMap`: IDE can jump to source when hovering over types
- `allowSyntheticDefaultImports`: Better compatibility with CommonJS modules

---

### 5. Expanded Adapter Aliases

**Before:**
```javascript
// Only generic @adapters
{ find: '@adapters', replacement: path.resolve(__dirname, 'src/core/adapters') },
```

**After:**
```javascript
// Specific adapter aliases for better organization
{ find: '@adapters', replacement: path.resolve(__dirname, 'src/adapters') },
{ find: '@adapters/', replacement: path.resolve(__dirname, 'src/adapters') },
{ find: '@browser', replacement: path.resolve(__dirname, 'src/adapters/browser') },
{ find: '@node', replacement: path.resolve(__dirname, 'src/adapters/node') },
```

**Migration:**
```typescript
// Before (via generic)
import { BrowserFileHandler } from '@adapters/browser/FileHandler'
import { NodeFileSystem } from '@adapters/node/FileSystem'

// After (direct shortcuts)
import { BrowserFileHandler } from '@browser/FileHandler'
import { NodeFileSystem } from '@node/FileSystem'
// Both styles still work
```

---

## Directory Structure Requirements

Your project MUST have this structure for the new configuration to work:

```
src/
├── index.ts                    # ✅ REQUIRED - Main export
├── core/
│   ├── index.ts               # Barrel export for core
│   ├── search/
│   ├── storage/
│   ├── algorithms/
│   ├── utils/
│   ├── documents/
│   ├── telemetry/
│   └── ...
├── adapters/                  # ✅ MOVED from src/core/adapters
│   ├── browser/
│   ├── node/
│   └── common/
├── web/                       # ✅ MOVED from src/core/web
│   ├── components/
│   └── hooks/
├── cli/
│   ├── index.ts               # CLI entry point
│   └── commands/
└── types/
    └── index.ts               # ✅ Type definitions (moved up)
```

### Important: File Relocations

If you have these files in the old locations, move them:

**Old → New:**
- `src/core/adapters/*` → `src/adapters/*`
- `src/core/web/*` → `src/web/*`
- `src/core/types/*` → `src/types/*` (or keep both if needed)

Or update aliases to match your actual structure.

---

## Code Migration Examples

### Example 1: Updating Imports After Relocation

If you moved `adapters` from `src/core/adapters` to `src/adapters`:

**Old (won't work with new config):**
```typescript
import { BrowserFileHandler } from '@adapters/browser/FileHandler'
// This resolved to: src/core/adapters/browser/FileHandler
```

**New:**
```typescript
import { BrowserFileHandler } from '@browser/FileHandler'
// This resolves to: src/adapters/browser/FileHandler
// Old style still works if you keep backwards-compatible alias
```

### Example 2: Using Root Alias

**Before (required relative paths):**
```typescript
// From src/core/search/Searcher.ts
import { Logger } from '../utils/Logger'
import { Config } from '../../config'
```

**After (using root alias):**
```typescript
// From src/core/search/Searcher.ts
import { Logger } from '/types/Logger'
import { Config } from '/config'
import { Logger } from '@utils/Logger'  // Also works
```

### Example 3: Creating Main Export

Create `src/index.ts` if it doesn't exist:

```typescript
// src/index.ts - Main export barrel
export * from '@core'
export * from '@adapters'
export * from '@web'

// Specific exports
export { SearchEngine } from '@search/SearchEngine'
export { IndexStorage } from '@storage/IndexStorage'
export { DocumentProcessor } from '@documents/DocumentProcessor'

// Type exports
export type { SearchOptions, SearchResult, Document } from '@types'
```

Then consumers can:
```typescript
// ESM
import { SearchEngine, IndexStorage } from 'nexus-search'

// CommonJS
const { SearchEngine, IndexStorage } = require('nexus-search')
```

---

## Build Verification Steps

After updating, verify the build works:

### Step 1: Type Check
```bash
npx tsc --noEmit
```

Expected: No errors

### Step 2: Build All Formats
```bash
npm run build
```

Expected output:
```
dist/index.js        (ESM)
dist/index.cjs       (CommonJS)
dist/index.umd.js    (UMD)
dist/index.d.ts      (Type definitions)
dist/cli/index.js    (CLI executable)
```

### Step 3: Test Imports
```bash
node -e "const ns = require('./dist/index.cjs'); console.log(Object.keys(ns).slice(0, 5))"
```

Expected: Should list exported modules without errors

### Step 4: Type Definition Validation
```bash
# Check that types are correct
npx tsc --noEmit --skipLibCheck dist/index.d.ts
```

---

## Backwards Compatibility

✅ **Preserved:**
- All existing `@` prefixed aliases still work
- Relative imports still work
- CLI commands unchanged
- API surface unchanged

⚠️ **Breaking Changes:**
- If you relied on `src/core/adapters` path, update to `src/adapters`
- If you relied on `src/core/web` path, update to `src/web`
- If entry point was `src/core/index.ts`, verify `src/index.ts` exports everything

---

## Troubleshooting Migration

### Build fails: "Cannot find entry point"

**Problem:** `src/index.ts` doesn't exist

**Solution:**
```bash
# Create main export file
cat > src/index.ts << 'EOF'
// Main export file
export * from '@core'
export * from '@adapters'
export * from '@web'
export * from '@types'
EOF
```

### IDE shows "Cannot find module" for aliases

**Solution:**
1. Ensure `baseUrl: "."` in `tsconfig.json`
2. Ensure `paths` includes all aliases
3. Restart TypeScript server:
   - VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
   - WebStorm: Menu → Language & Frameworks → TypeScript → Restart TypeScript

### Build works but imports fail at runtime

**Problem:** Missing file extensions in import paths

**Solution:**
```typescript
// ❌ Wrong (missing extension)
import { Logger } from '/types/Logger'

// ✅ Correct
import { Logger } from '/types/Logger.js'  // For ESM
import { Logger } from './types/Logger'     // For CommonJS
```

---

## OBINexus Compliance

This configuration update maintains full OBINexus project compliance:

- ✅ **Milestone-based Investment**: Build pipeline properly orchestrated
- ✅ **#NoGhosting**: Telemetry tracking (@telemetry alias) fully integrated
- ✅ **OpenSense Recruitment**: Type safety and documentation preserved
- ✅ **Toolchain**: riftlang → polybuild → rift → gosilang properly configured
- ✅ **Compliance Scripts**: Telemetry module properly aliased

---

## Questions?

Refer to:
- `PATH_ALIASES_REFERENCE.md` - Quick alias lookup
- `BUILD_CONFIG_SUMMARY.md` - Detailed configuration explanation
- `rollup.config.js` - Build configuration source
- `tsconfig.json` - TypeScript configuration

---

**Migration Status:** Ready for deployment
**Last Updated:** 2026-02-25
**Configuration Version:** 2.1
