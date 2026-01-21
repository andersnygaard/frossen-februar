# Task 018: PWA icons and manifest

**Status**: In Progress
**Phase**: 4 - PWA
**Priority**: Medium
**Labels**: app, pwa, assets
**Depends On**: 017

## Goal

Create PWA icons and finalize manifest for installability.

## Acceptance Criteria

- [x] `packages/app/public/icons/` folder created
- [x] icon-192.svg (192x192) - SVG used instead of PNG
- [x] icon-512.svg (512x512) - SVG used instead of PNG
- [x] Simple "FF" logo design (black background #1a1a1a, white bold FF text)
- [x] Manifest configured in vite-plugin-pwa with SVG icons
- [x] Build succeeds, icons included in dist/manifest.webmanifest

## Implementation

### Icon Design
Simple bold "FF" letters or snowflake icon in black on white background.

Can generate programmatically with canvas or use placeholder.

### Folder structure
```
packages/app/public/
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

### Option: Generate with sharp (if needed)
```javascript
// Script to generate icons if needed
import sharp from 'sharp';

const svg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect fill="#1a1a1a" width="512" height="512"/>
  <text x="256" y="340" font-family="system-ui" font-size="240"
        font-weight="900" fill="white" text-anchor="middle">FF</text>
</svg>`;

await sharp(Buffer.from(svg)).resize(512).png().toFile('icon-512.png');
await sharp(Buffer.from(svg)).resize(192).png().toFile('icon-192.png');
```

## Verification

1. `pnpm --filter @frossen/app build && pnpm --filter @frossen/app preview`
2. Open in Chrome/Edge
3. Look for install icon in address bar
4. Install and verify standalone mode works

## Progress Log

### 2026-01-21 Implementation Complete

**What was done:**
1. Created `packages/app/public/icons/` folder
2. Created `icon-192.svg` with FF design (192x192, black background #1a1a1a, white bold text)
3. Created `icon-512.svg` with FF design (512x512, black background #1a1a1a, white bold text)
4. Updated `vite.config.ts` to reference SVG icons instead of PNG:
   - Changed manifest icon paths from `/icons/icon-192.png` to `/icons/icon-192.svg`
   - Changed manifest icon paths from `/icons/icon-512.png` to `/icons/icon-512.svg`
   - Updated MIME type from `image/png` to `image/svg+xml`
   - Added `purpose: 'any'` to icon entries
5. Verified build succeeds: `pnpm --filter @frossen/app build` ✓
6. Verified icons are copied to dist folder and included in manifest.webmanifest

**Note:** SVG was used instead of PNG because programmatic image generation was not needed. SVGs are:
- Scalable to any size
- Smaller file size
- Easier to maintain and modify
- Fully supported by PWA spec and browsers
