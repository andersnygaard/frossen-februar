# Task 004: Initialize UI package

**Status**: Backlog
**Phase**: 1 - Project Foundation
**Priority**: Critical
**Labels**: infrastructure, ui
**Depends On**: 003

## Goal

Create @frossen/ui package with Vue + TypeScript + Vite library build.

## Acceptance Criteria

- [x] `packages/ui/package.json` with name "@frossen/ui"
- [x] Dependencies: vue, typescript
- [x] DevDependencies: vite, @vitejs/plugin-vue, vue-tsc
- [x] `packages/ui/vite.config.ts` for library build
- [x] `packages/ui/tsconfig.json`
- [x] `packages/ui/src/index.ts` (empty export file)
- [x] `pnpm --filter @frossen/ui build` succeeds

## Implementation

1. Create `packages/ui/package.json`:
   ```json
   {
     "name": "@frossen/ui",
     "version": "0.0.1",
     "type": "module",
     "main": "./dist/frossen-ui.umd.cjs",
     "module": "./dist/frossen-ui.js",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "import": "./dist/frossen-ui.js",
         "require": "./dist/frossen-ui.umd.cjs"
       },
       "./styles/*": "./dist/styles/*"
     },
     "scripts": {
       "build": "vue-tsc && vite build",
       "dev": "vite"
     }
   }
   ```

2. Create vite.config.ts with library mode
3. Create tsconfig.json for Vue
4. Create src/index.ts with placeholder export

## Verification

```bash
pnpm --filter @frossen/ui build
```

## Progress Log

**Completed**: 2026-01-20

### What was done:

1. Created `packages/ui/package.json` with @frossen/ui package configuration
   - Added Vue and TypeScript to dependencies
   - Added vite, @vitejs/plugin-vue, and vue-tsc to devDependencies
   - Configured proper export entries for library distribution
   - Set up build and dev scripts

2. Created `packages/ui/vite.config.ts` for library build configuration
   - Set up library mode with proper entry point
   - Configured rollup options to externalize Vue dependency
   - Set name to "FrossonUI" for UMD builds

3. Created `packages/ui/tsconfig.json` for Vue TypeScript support
   - Configured for Vue component development
   - Set appropriate compiler options for library builds
   - Disabled strict mode for flexibility during initial development

4. Created `packages/ui/tsconfig.node.json` for Vite configuration typing

5. Created `packages/ui/src/index.ts` with placeholder export

6. Ran `pnpm install` to add dependencies to workspace

7. Verified build succeeds with `pnpm --filter @frossen/ui build`
   - Build output: dist/frossen-ui.js (0.05 kB) and dist/frossen-ui.umd.cjs (0.32 kB)
   - Successfully exports the version constant

### Notes:

- TypeScript version pinned to 5.3.3 to ensure compatibility with vue-tsc 1.8.0
- pnpm-lock.yaml regenerated with new package specifications
- All acceptance criteria met and verified
