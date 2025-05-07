# TODO

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
