# Task 013: Initialize App package

**Status**: Backlog
**Phase**: 3 - Application
**Priority**: Critical
**Labels**: infrastructure, app
**Depends On**: 012

## Goal

Create @frossen/app package consuming the UI library.

## Acceptance Criteria

- [x] `packages/app/package.json` with name "@frossen/app"
- [x] Dependencies: vue, @frossen/ui (workspace:*)
- [x] DevDependencies: vite, @vitejs/plugin-vue, typescript, vue-tsc
- [x] `packages/app/vite.config.ts`
- [x] `packages/app/tsconfig.json`
- [x] `packages/app/index.html`
- [x] `packages/app/src/main.ts` (createApp, mount)
- [x] `packages/app/src/App.vue` (placeholder)
- [x] `pnpm --filter @frossen/app dev` shows placeholder

## Implementation

### package.json
```json
{
  "name": "@frossen/app",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "@frossen/ui": "workspace:*"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vue-tsc": "^1.8.0"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});
```

### index.html
```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frossen Februar</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### main.ts
```typescript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

### App.vue (placeholder)
```vue
<template>
  <h1>Frossen Februar</h1>
</template>
```

## Verification

```bash
pnpm --filter @frossen/app dev
# Browser shows "Frossen Februar" heading
```

## Progress Log

### Completed
1. Created `packages/app/package.json` with @frossen/app name, vue ^3.4.0 dependency, and @frossen/ui workspace dependency
2. Created `packages/app/vite.config.ts` with Vue plugin
3. Created `packages/app/tsconfig.json` with Vue-compatible TypeScript configuration
4. Created `packages/app/index.html` with lang="no" and module script entry point
5. Created `packages/app/src/main.ts` with createApp and mount
6. Created `packages/app/src/App.vue` with placeholder h1
7. Ran `pnpm install` to link workspace dependencies
8. Verified `pnpm --filter @frossen/app dev` starts successfully on localhost:5173

All acceptance criteria completed successfully.
