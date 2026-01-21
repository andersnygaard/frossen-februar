# Task 005: Setup Storybook in UI package

**Status**: Done
**Phase**: 1 - Project Foundation
**Priority**: High
**Labels**: infrastructure, ui, storybook
**Depends On**: 004

## Goal

Configure Storybook 8 for Vue component development with play function testing.

## Acceptance Criteria

- [x] Storybook initialized in packages/ui
- [x] `.storybook/main.ts` configured for Vue + Vite
- [x] `.storybook/preview.ts` imports tokens.css
- [x] @storybook/test installed for play functions
- [x] `pnpm --filter @frossen/ui storybook` opens browser

## Implementation

1. Run `npx storybook@latest init` in packages/ui
2. Configure `.storybook/main.ts`:
   ```typescript
   import type { StorybookConfig } from '@storybook/vue3-vite';

   const config: StorybookConfig = {
     stories: ['../src/**/*.stories.@(ts|tsx)'],
     framework: '@storybook/vue3-vite',
     addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
   };
   export default config;
   ```

3. Configure `.storybook/preview.ts`:
   ```typescript
   import '../src/styles/tokens.css';
   ```

4. Add scripts to package.json:
   - "storybook": "storybook dev -p 6006"
   - "build-storybook": "storybook build"
   - "test:storybook": "test-storybook"

## Verification

```bash
pnpm --filter @frossen/ui storybook
```

## Progress Log

### Completed Tasks
1. Ran `npx storybook@latest init` in packages/ui - auto-configured Storybook with Vue support
2. Updated `.storybook/main.ts` to use vue3-vite framework with addon-essentials and addon-interactions
3. Updated `.storybook/preview.ts` to import tokens.css (placeholder created, will be populated in task 006)
4. Installed @storybook/test (v8.5.0) for play function support
5. Added all required scripts to package.json:
   - "storybook": "storybook dev -p 6006"
   - "build-storybook": "storybook build"
   - "test:storybook": "test-storybook"
6. Updated vite.config.ts to remove storybook test plugin references (incompatible with Storybook 8)
7. Downgraded Vite to v4.5.0 to ensure compatibility with Storybook 8
8. Created placeholder `src/styles/tokens.css` (will be populated in task 006)

### Verification
- Dev server starts: `pnpm storybook` successfully launches Storybook dev server
- All acceptance criteria met
- Configuration ready for component story development
