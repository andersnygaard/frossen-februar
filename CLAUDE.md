# Frossen Februar

See [.claude/CLAUDE.md](.claude/CLAUDE.md) for full project documentation.

## Quick Reference

```bash
pnpm dev        # Run app (localhost:5173)
pnpm storybook  # Run Storybook (localhost:6006)
pnpm build      # Build all packages
```

## Package Rules

Each package has its own `.claude-rules` file:
- [packages/ui/.claude-rules](packages/ui/.claude-rules) - Component library patterns
- [packages/app/.claude-rules](packages/app/.claude-rules) - Vue app patterns
- [packages/e2e/.claude-rules](packages/e2e/.claude-rules) - E2E test patterns
