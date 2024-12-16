# Contributing to @ai-primitives/package-template

Thank you for your interest in contributing to our package template! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/ai-primitives/package-template.git
cd package-template
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

### TypeScript Configuration

The project uses TypeScript for type safety. Key configurations:

- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Path aliases configured (@/_ points to src/_)

### Testing with Vitest

We use Vitest for testing. Run tests with:

```bash
pnpm test        # Run tests once
pnpm test:watch  # Run tests in watch mode
```

Write tests in the `src/__tests__` directory with the `.test.ts` extension.

### Code Style

We use ESLint and Prettier for consistent code style:

- No semicolons
- Single quotes (including JSX)
- 160 character line width
- 2 spaces for indentation

#### Naming Conventions

- Use camelCase for all variable names
- Use camelCase for object property keys
- Use camelCase for string literals
- Use PascalCase for class names and types
- Use UPPER_SNAKE_CASE for constants

Format your code with:

```bash
pnpm format
```

Lint your code with:

```bash
pnpm lint
```

### Building the Package

Build the package with:

```bash
pnpm build
```

The build output will be in the `dist` directory.

## Commit Guidelines

We use semantic versioning and conventional commits. Each commit message should be structured as:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc)
- refactor: Code changes that neither fix bugs nor add features
- test: Adding or modifying tests
- chore: Changes to build process or auxiliary tools

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the TODO.md to reflect completed tasks
3. Ensure all tests pass and code is properly formatted
4. Create a pull request with a clear title and description
5. Link any related issues

## Release Process

Releases are automated through GitHub Actions and semantic-release:

1. Commits to main branch trigger the release workflow
2. Version is determined from commit messages
3. Changelog is generated automatically
4. Package is published to npm
5. GitHub release is created

## Questions or Problems?

Feel free to open an issue for:

- Bug reports
- Feature requests
- Help with development setup
- Questions about contributing

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
