# Versioning and Publishing Process

This repository uses [changesets](https://github.com/changesets/changesets) to manage versions and publish packages.

## Creating a changeset

When you make a change that needs to be published, create a changeset by running:

```bash
pnpm changeset
```

This will guide you through creating a changeset file that describes your changes.

## Publishing Process

The publishing process is as follows:

1. When changesets are merged to main, a "Version Packages" PR is automatically created or updated
2. Once approved, the "Version Packages" PR can be merged to update package versions and changelogs
3. To publish packages to npm, manually trigger the "Release" workflow from the GitHub Actions tab
4. Select the "Publish packages to npm" option to publish the new versions

This ensures that packages are only published with explicit approval, not automatically when code merges to main.
