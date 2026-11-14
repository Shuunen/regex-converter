# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed

- The page was blank because the content security policy blocked the app script, the script now gets the nonce the policy asks for
- Link the web app manifest from the page so the app can be installed

### Added

- Serve a `robots.txt` that lets crawlers index the site
- App icons (favicon, apple touch icon, 64, 192 and 512 pixel icons and a maskable one) listed in the web app manifest, so the app can be installed
- Add a description and a theme color to the page

### Changed

- Add the repo-check schema to its config
- Drop the redundant `onlyBuiltDependencies` from the pnpm workspace

## [0.2.1] - 2026-11-13

### Changed

- Dropped the redundant `run_install` option from the CI
- Sent a `Referrer-Policy` header

## [0.2.0] - 2026-06-15

### Changed

- Migrated from vanilla JS/HTML/CSS to React 19 + TypeScript + Vite — users get a fully reactive UI with live preview as they type
- Replaced ESLint with oxlint for significantly faster linting
- Replaced manual build with Turbo-powered pipeline (`build`, `lint`, `test`)
- URL state persistence now uses base64 encoding for shareable rule configurations
- Upgraded dependency management to pnpm workspace

### Added

- Regex rules UI: add, remove, enable/disable individual rules with live output
- Typewriter heading animation using Framer Motion
- 100% test coverage via vitest with v8 coverage provider
- Custom markdown linter CLI (`src/bin/lint.cli.ts`) for enforcing doc conventions
- Unique build mark Vite plugin that injects a git-based identifier into build artifacts

### Fixed

- Rule ID collision bug: dynamically added rules now use `crypto.randomUUID()` instead of index-based IDs
- CSS class typo in typewriter heading (`lg:text:3xl` → `lg:text-3xl`)
- Path traversal guard in markdown linter CLI (resolved paths now constrained to project root)
- `history.replaceState` wrapped in try/catch to handle browsers with URL length limits

## [0.1.1] - prior release

See monorepo history for earlier changes.
