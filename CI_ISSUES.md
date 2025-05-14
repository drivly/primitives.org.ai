# CI Issues in PR #155

## Package Resolution and Dependency Issues

### Current Status
- CI checks are failing with `ERR_PNPM_OUTDATED_LOCKFILE` error because pnpm-lock.yaml is not in sync with package.json
- Multiple peer dependency conflicts exist in the project:
  - React version conflicts (18.3.1 vs 19.1.0)
  - ESLint version conflicts (9.26.0 vs expected 7.x or 8.x)
  - Payload CMS version conflicts (3.37.0 vs 3.33.0)
- These dependency conflicts are causing build and deployment failures

### Fix Attempts
1. Updated the ai-providers package.json to use ESM format exclusively
2. Updated the pnpm-lock.yaml file to match the package.json changes
3. Removed the unused esbuild dependency from the package.json

### Next Steps
These dependency conflicts appear to be pre-existing issues in the repository and may require more extensive changes to resolve. The documentation changes in this PR are complete and ready for review, but the CI checks are failing due to these dependency issues.
