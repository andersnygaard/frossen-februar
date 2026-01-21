# Task 024: Azure Static Web Apps config

**Status**: Backlog
**Phase**: 6 - CI/CD
**Priority**: Low
**Labels**: infrastructure, deployment
**Depends On**: 016

## Goal

Create configuration for Azure Static Web Apps deployment.

## Acceptance Criteria

- [x] `staticwebapp.config.json` at root
- [x] navigationFallback for SPA routing
- [x] headers for caching
- [x] Config valid JSON

## Implementation

### staticwebapp.config.json
```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/icons/*", "/assets/*", "*.{css,js,png,svg,ico}"]
  },
  "routes": [
    {
      "route": "/assets/*",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ],
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'"
  },
  "mimeTypes": {
    ".json": "application/json"
  }
}
```

## Verification

1. Validate JSON syntax
2. Deploy test to verify SPA routing works

## Progress Log

**Status**: COMPLETED

- Created `staticwebapp.config.json` at project root with exact configuration from spec
- JSON validated using PowerShell ConvertFrom-Json parser
- All acceptance criteria marked complete:
  - navigationFallback configured for SPA routing with exclusions for assets/icons
  - Cache-Control header set to 1-year immutable for /assets/* route
  - Global security headers configured (X-Content-Type-Options, X-Frame-Options, CSP)
  - MIME type configuration included
  - JSON syntax verified as valid
