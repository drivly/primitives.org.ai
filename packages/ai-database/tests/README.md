# AI-Database Test Suite

This directory contains tests for the `ai-database` package, organized into the following structure:

## Directory Structure

```
tests/
├── unit/
│   ├── collections/    # Tests for collection configurations
│   ├── databases/      # Tests for database adapters and configuration
│   └── lib/            # Tests for utility functions and libraries
├── integration/
│   └── workflows/      # Tests for workflow execution
└── e2e/                # End-to-end tests
```

## Running Tests

You can run the tests using the following commands:

```bash
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## Test Strategy

### Unit Tests

Unit tests focus on testing individual components in isolation:

- **Collections**: Verify field definitions, validation rules, and access control
- **Database**: Test SQLite adapter configuration and vector embedding setup
- **Lib**: Test utility functions and AI service integrations

### Integration Tests

Integration tests verify that components work together correctly:

- **Workflows**: Test the execution of workflows like `executeFunction` with mocked dependencies

### E2E Tests

End-to-end tests verify the complete functionality of the package in a real-world scenario.

## Mocking Strategy

- **AI Services**: Mock AI service responses for deterministic testing
- **Database**: Use in-memory SQLite for testing
- **External APIs**: Mock external API calls to avoid network dependencies

## Test Data

Test data is created using fixtures and factory functions to ensure consistency across tests.
