// rollup.config.js
// OBINexus NexusSearch - Build Orchestration Configuration
// Build Pipeline: nlink → polybuild → riftlang.exe → .so.a → rift.exe → gosilang
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * @license MIT
 * OBINexus: Build ${new Date().toISOString()}
 */`;

// External dependencies - compliance with OBINexus policy
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'idb',
  'punycode',
  'tslib'
];

// === PATH ALIAS CONFIGURATION ===
// Maps development imports to source directories for proper module resolution
// Critical for build orchestration and CLI toolchain (riftlang → polybuild)
const srcAliases = [
  // Root alias - fixes missing /src resolution
  { find: '/', replacement: path.resolve(__dirname, 'src') },
  // @src aliases — most specific first to prevent @src matching @src/cli or @src/core
  { find: '@src/cli', replacement: path.resolve(__dirname, 'src/cli') },
  { find: '@src/core', replacement: path.resolve(__dirname, 'src/core') },
  { find: '@src', replacement: path.resolve(__dirname, 'src') },
  // Generic @ root alias (@/storage → src/core/storage, @/types → src/core/types)
  { find: '@', replacement: path.resolve(__dirname, 'src/core') },
  // Core module aliases
  { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  { find: '@core/', replacement: path.resolve(__dirname, 'src/core') },
  // Algorithm subsystem
  { find: '@algorithms', replacement: path.resolve(__dirname, 'src/core/algorithms') },
  { find: '@algorithms/', replacement: path.resolve(__dirname, 'src/core/algorithms') },
  // Search engine subsystem
  { find: '@search', replacement: path.resolve(__dirname, 'src/core/search') },
  { find: '@search/', replacement: path.resolve(__dirname, 'src/core/search') },
  // Storage layer
  { find: '@storage', replacement: path.resolve(__dirname, 'src/core/storage') },
  { find: '@storage/', replacement: path.resolve(__dirname, 'src/core/storage') },
  // Utilities
  { find: '@utils', replacement: path.resolve(__dirname, 'src/core/utils') },
  { find: '@utils/', replacement: path.resolve(__dirname, 'src/core/utils') },
  // Document processing
  { find: '@documents', replacement: path.resolve(__dirname, 'src/core/documents') },
  { find: '@documents/', replacement: path.resolve(__dirname, 'src/core/documents') },
  // Type definitions
  { find: '@types', replacement: path.resolve(__dirname, 'src/core/types') },
  { find: '@types/', replacement: path.resolve(__dirname, 'src/core/types') },
  // Telemetry & monitoring (compliance tracking)
  { find: '@telemetry', replacement: path.resolve(__dirname, 'src/core/telemetry') },
  { find: '@telemetry/', replacement: path.resolve(__dirname, 'src/core/telemetry') },
  // Mappers
  { find: '@mappers', replacement: path.resolve(__dirname, 'src/core/mappers') },
  { find: '@mappers/', replacement: path.resolve(__dirname, 'src/core/mappers') },
  // Platform adapters
  { find: '@adapters', replacement: path.resolve(__dirname, 'src/core/adapters') },
  { find: '@adapters/', replacement: path.resolve(__dirname, 'src/core/adapters') },
  { find: '@browser', replacement: path.resolve(__dirname, 'src/core/adapters/browser') },
  { find: '@node', replacement: path.resolve(__dirname, 'src/core/adapters/node') },
  // Web integration
  { find: '@web', replacement: path.resolve(__dirname, 'src/core/web') },
  { find: '@web/', replacement: path.resolve(__dirname, 'src/core/web') },
  // CLI command suite
  { find: '@cli', replacement: path.resolve(__dirname, 'src/cli') },
  { find: '@cli/', replacement: path.resolve(__dirname, 'src/cli') }
];

// Configure base output parameters
const baseOutput = {
  banner,
  sourcemap: true,
  exports: 'named'
};

// === CORE BUILD CONFIGURATION ===
// Compiles main library targeting ESM, CJS, and UMD formats
const typescriptCoreConfig = {
  tsconfig: './tsconfig.json',
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationDir: './dist/types',
      sourceMap: true,
      baseUrl: '.',
      paths: {
        '/*': ['src/*'],
        '@/*': ['src/core/*'],
        '@src': ['src'],
        '@src/*': ['src/*'],
        '@src/cli': ['src/cli'],
        '@src/cli/*': ['src/cli/*'],
        '@src/core': ['src/core'],
        '@src/core/*': ['src/core/*'],
        '@core/*': ['src/core/*'],
        '@algorithms/*': ['src/core/algorithms/*'],
        '@search/*': ['src/core/search/*'],
        '@storage/*': ['src/core/storage/*'],
        '@utils/*': ['src/core/utils/*'],
        '@documents/*': ['src/core/documents/*'],
        '@types/*': ['src/core/types/*'],
        '@telemetry/*': ['src/core/telemetry/*'],
        '@adapters/*': ['src/core/adapters/*'],
        '@browser/*': ['src/core/adapters/browser/*'],
        '@node/*': ['src/core/adapters/node/*'],
        '@web/*': ['src/core/web/*'],
        '@cli/*': ['src/cli/*']
      }
    },
    include: [
      'src/**/*.ts',
      'src/core/**/*.ts',
      'src/adapters/**/*.ts',
      'src/web/**/*.ts',
      'src/types/**/*.ts'
    ],
    exclude: [
      'node_modules',
      'dist',
      '**/*.test.ts',
      '**/*.spec.ts',
      'src/cli/**/*'
    ]
  },
  clean: true,
  check: false // Skip type-checking during build to allow incremental compilation
};

const coreConfig = {
  input: 'src/index.ts',
  external,
  plugins: [
    alias({ entries: srcAliases }),
    resolve({
      browser: true,
      preferBuiltins: true,
      extensions: ['.ts', '.js', '.json']
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto',
      sourceMap: true
    }),
    typescript(typescriptCoreConfig)
  ]
};

// === CLI BUILD CONFIGURATION ===
// Builds command-line interface with shebang support
const typescriptCliConfig = {
  tsconfig: './tsconfig.json',
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationDir: './dist/types',
      sourceMap: true,
      baseUrl: '.',
      paths: {
        '/*': ['src/*'],
        '@/*': ['src/core/*'],
        '@src': ['src'],
        '@src/*': ['src/*'],
        '@src/cli': ['src/cli'],
        '@src/cli/*': ['src/cli/*'],
        '@src/core': ['src/core'],
        '@src/core/*': ['src/core/*'],
        '@core/*': ['src/core/*'],
        '@algorithms/*': ['src/core/algorithms/*'],
        '@search/*': ['src/core/search/*'],
        '@storage/*': ['src/core/storage/*'],
        '@utils/*': ['src/core/utils/*'],
        '@documents/*': ['src/core/documents/*'],
        '@types/*': ['src/core/types/*'],
        '@telemetry/*': ['src/core/telemetry/*'],
        '@adapters/*': ['src/core/adapters/*'],
        '@cli/*': ['src/cli/*']
      }
    },
    include: ['src/cli/**/*.ts', 'src/**/*.ts'],
    exclude: ['node_modules', 'dist', '**/*.test.ts', '**/*.spec.ts']
  },
  clean: true,
  check: false
};

const cliConfig = {
  input: 'src/cli/index.ts',
  external: [...external, './core/index.js'],
  plugins: [
    alias({ entries: srcAliases }),
    resolve({
      browser: false,
      preferBuiltins: true,
      extensions: ['.ts', '.js', '.json']
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto',
      sourceMap: true
    }),
    typescript(typescriptCliConfig)
  ]
};

// === BUILD OUTPUT CONFIGURATIONS ===
// Multi-format export strategy: ESM (modern), CJS (compatibility), UMD (browser)
export default [
  // Core library - ESM build (modern module format)
  {
    ...coreConfig,
    output: {
      ...baseOutput,
      file: 'dist/index.js',
      format: 'esm'
    }
  },

  // Core library - CJS build (Node.js compatibility)
  {
    ...coreConfig,
    output: {
      ...baseOutput,
      file: 'dist/index.cjs',
      format: 'cjs'
    }
  },

  // Core library - UMD build (browser universal module)
  {
    ...coreConfig,
    output: {
      ...baseOutput,
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'NexusSearch',
      globals: {
        'idb': 'idb',
      },
    },
    plugins: [
      ...coreConfig.plugins,
      terser({
        output: {
          comments: (node, comment) =>
            comment.type === 'comment2' && /@license/i.test(comment.value)
        }
      })
    ]
  },

  // CLI executable - ESM build
  {
    ...cliConfig,
    output: {
      ...baseOutput,
      file: 'dist/cli/index.js',
      format: 'esm',
      banner: '#!/usr/bin/env node\n' + banner
    }
  },

  // CLI executable - CJS build (required by bin.nscli → dist/cli/index.cjs in package.json)
  {
    ...cliConfig,
    output: {
      ...baseOutput,
      file: 'dist/cli/index.cjs',
      format: 'cjs',
      exports: 'auto',
      banner: '#!/usr/bin/env node\n' + banner
    }
  },

  // Type definitions bundle for core library
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [
      alias({ entries: srcAliases }),
      dts({
        respectExternal: true,
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '/*': ['src/*'],
            '@/*': ['src/core/*'],
            '@src': ['src'],
            '@src/*': ['src/*'],
            '@src/cli': ['src/cli'],
            '@src/cli/*': ['src/cli/*'],
            '@src/core': ['src/core'],
            '@src/core/*': ['src/core/*'],
            '@core/*': ['src/core/*'],
            '@algorithms/*': ['src/core/algorithms/*'],
            '@search/*': ['src/core/search/*'],
            '@storage/*': ['src/core/storage/*'],
            '@utils/*': ['src/core/utils/*'],
            '@documents/*': ['src/core/documents/*'],
            '@types/*': ['src/core/types/*'],
            '@telemetry/*': ['src/core/telemetry/*'],
            '@adapters/*': ['src/core/adapters/*'],
            '@web/*': ['src/core/web/*'],
            '@cli/*': ['src/cli/*']
          }
        }
      })
    ]
  }
];