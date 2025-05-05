# TODO: Experiments Package Implementation

## Documentation
- [x] Create README.md with package overview
- [x] Document API usage examples
- [x] Document installation instructions

## Package Structure
- [ ] Set up package.json with dependencies
  - [ ] Add vitest as dependency
  - [ ] Configure TypeScript support
  - [ ] Set up proper exports
- [ ] Create source file structure
  - [ ] index.ts for main exports
  - [ ] experiment.ts for Experiment function
  - [ ] cartesian.ts for parameter combinations
  - [ ] runner.ts for vitest runner
  - [ ] types.ts for type definitions

## Implementation
- [ ] Implement cartesian function
  - [ ] Support parameter combinations
  - [ ] Type safety for combinations
- [ ] Implement Experiment function
  - [ ] Support for various AI tasks
  - [ ] Parameter handling
  - [ ] Result collection and formatting
- [ ] Implement vitest runner
  - [ ] File discovery for experiments
  - [ ] Result output as markdown
  - [ ] Subfolder organization for variations

## Testing
- [ ] Create basic test examples
- [ ] Verify parameter combinations
- [ ] Test markdown output generation
- [ ] Validate runner configuration

## Integration
- [ ] Ensure compatibility with existing AI packages
- [ ] Verify proper exports and imports
- [ ] Test in sample projects

## Deployment
- [ ] Prepare for npm publishing
- [ ] Set up semantic versioning
- [ ] Configure GitHub Actions for releases
