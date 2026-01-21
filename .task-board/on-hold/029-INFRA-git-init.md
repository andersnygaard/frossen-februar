# Task 029: Initialize Git Repository

**Status**: Backlog
**Priority**: High
**Labels**: infrastructure
**Estimated Effort**: Small

## Context

Project is not currently a git repository. CI/CD workflows exist but can't run without git.

## Acceptance Criteria

- [ ] `git init` run in project root - **MANUAL** (requires git command)
- [x] `.gitignore` created with standard patterns (node_modules, dist, .env, etc.)
- [ ] Initial commit with all current files - **MANUAL** (requires git command)
- [ ] Verify GitHub Actions workflows are valid - **MANUAL** (after git init)

## Status Note

**Blocked**: Git commands cannot be executed by Claude Code in this workflow.

The user must manually run:
```bash
git init
git add .
git commit -m "Initial commit: Frossen Februar no-spend tracker"
```

The `.gitignore` file has been created with patterns for:
- node_modules, dist, build outputs
- Environment files (.env*)
- Editor configs (.idea, .vscode)
- OS files (.DS_Store, Thumbs.db)
- Test outputs (coverage, playwright-report)
- Storybook and PWA build outputs
