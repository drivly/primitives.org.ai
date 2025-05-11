# TODO

## AI-Database Package

### Embedding and Vector Search (AI-59)
- [x] Add embedding tracking fields to Things collection
- [x] Create batch embedding workflow
- [x] Update hooks to trigger batch embedding
- [x] Implement vector search functionality
- [ ] Optimize vector search performance with indices
- [ ] Add API endpoint for vector search
- [ ] Create UI for testing vector search

### Future Improvements
- [ ] Support for different embedding models
- [ ] Configurable embedding dimensions
- [ ] Automatic re-embedding on model change

## Blockers

### AI-49: Implement comprehensive test suite for ai-functions package

#### Issue with ai-providers package

The ai-providers package is currently returning mock responses instead of making real API calls. This is preventing our tests from executing properly against the actual backend as required.

**Error description:**
- The languageModel function in registry.ts returns mock responses
- Tests are queued but not executing properly
- The implementation doesn't use the actual AI gateway

**Reproduction steps:**
1. Run `pnpm test` in the repository
2. Observe that ai-functions tests are queued but not executing
3. Examine the registry.ts file in ai-providers package to see mock implementation

**Temporary solution:**
- Modify tests to work with the current implementation while noting this is temporary
- Document the issue for the team to address

**Long-term solution:**
- Update the ai-providers package to use real API calls through the AI gateway
- Ensure the AI gateway URL is correctly configured
- Implement proper error handling for cases where the AI gateway is unavailable

#### Issue with Vercel deployment failure

The Vercel deployment is failing due to a build error in the ai-brand package, which is unrelated to our test changes.

**Error description:**
- TypeScript error in the ai-brand package: `error TS5074: Option '--incremental' can only be specified using tsconfig, emitting to single file or when option '--tsBuildInfoFile' is specified.`
- The same error occurs in both our PR branch and the main branch
- Recent PRs have been focused on fixing build configurations for various packages

**Verification:**
1. Checked the build logs for our PR and found the error in the ai-brand package
2. Verified the same error occurs when building the ai-brand package on the main branch
3. Observed that recent PRs have been focused on fixing build configurations for other packages

**Note:**
- This is a pre-existing issue in the repository and not related to our test changes
- Our PR can be merged despite the Vercel deployment failure since it doesn't affect the functionality of our tests
