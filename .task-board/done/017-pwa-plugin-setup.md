# Task 017: PWA plugin setup

**Status**: Backlog
**Phase**: 4 - PWA
**Priority**: Medium
**Labels**: app, pwa
**Depends On**: 016

## Goal

Configure vite-plugin-pwa for offline-capable installable app.

## Acceptance Criteria

- [x] vite-plugin-pwa added to app package
- [x] Configure in vite.config.ts
- [x] registerType: 'autoUpdate'
- [x] manifest with name, icons, theme_color
- [x] workbox runtimeCaching for offline
- [x] Service worker registers in browser devtools

## Implementation

### Install
```bash
pnpm --filter @frossen/app add -D vite-plugin-pwa
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Frossen Februar',
        short_name: 'Frossen',
        description: 'Spor ditt forbruk i februar',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1a1a1a',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
});
```

## Verification

1. Build app: `pnpm --filter @frossen/app build`
2. Preview: `pnpm --filter @frossen/app preview`
3. Check DevTools > Application > Service Workers

## Progress Log

**2026-01-21 - Implementation Complete**

- Installed vite-plugin-pwa@^1.2.0 via `pnpm --filter @frossen/app add -D vite-plugin-pwa`
- Updated packages/app/vite.config.ts with full PWA configuration:
  - VitePWA plugin imported and registered
  - registerType set to 'autoUpdate' for automatic updates
  - Manifest configured with app metadata (name, short_name, description, icons, theme_color)
  - Workbox configured with glob patterns for aggressive caching
- Build verification: `pnpm --filter @frossen/app build` succeeded
- Generated artifacts: dist/sw.js, dist/workbox-01f28f5c.js, dist/manifest.webmanifest
- All acceptance criteria marked as complete
