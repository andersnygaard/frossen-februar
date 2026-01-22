# Frossen Februar

A Progressive Web App for tracking daily spending habits during a no-spend challenge. Built with Vue 3, TypeScript, and Vite.

## What is Frossen Februar?

"Frossen Februar" (Frozen February) helps users track their spending during a no-spend challenge. Each day can be marked as:

- **Success** (green) - No spending that day
- **Warning** (yellow) - Small or necessary spend
- **Fail** (red) - Broke the challenge

## Features

- Calendar-based tracking with monthly navigation
- Click to cycle through day states
- Statistics display
- Data persisted in localStorage
- Installable as a PWA
- Works offline

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Custom component library (`@frossen/ui`)
- **E2E Testing**: Playwright
- **Documentation**: Storybook

## Project Structure

```
packages/
  app/     - Vue 3 PWA application
  ui/      - Shared component library
  e2e/     - Playwright E2E tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
# Run the app (localhost:5173)
pnpm dev

# Run Storybook (localhost:6006)
pnpm storybook

# Build all packages
pnpm build

# Run E2E tests
pnpm --filter @frossen/e2e test
```

## License

MIT
