# Publishing Guide for stack-end

This document provides step-by-step instructions for publishing stack-end to npm, both manually and via automated GitHub Actions.

## Prerequisites

Before publishing, ensure you have:

1. **npm Account**: Create an account at [npmjs.com](https://npmjs.com)
2. **npm Access Token**: Generate an automation token from npm:
   - Log in to npmjs.com
   - Go to Account Settings → Access Tokens
   - Click "Generate New Token" → "Automation"
   - Copy the token (starts with `npm_...`)
3. **npm CLI Login** (for manual publishing):
   ```bash
   npm login
   ```
4. **GitHub Repository Access**: Admin access to set repository secrets

## Setup for Automated Publishing

### Step 1: Configure npm Token in GitHub

1. Go to your GitHub repository: https://github.com/kousthubha-sky/stack-end
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm automation token
6. Click **Add secret**

### Step 2: Verify Workflows

The repository includes two GitHub Actions workflows:

- **`.github/workflows/test.yml`**: Runs on pushes and PRs to test the build
- **`.github/workflows/publish.yml`**: Runs on version tags to publish to npm

These are already configured and ready to use.

## Publishing Workflow

### Automated Publishing (Recommended)

The recommended way to publish is via GitHub Actions:

1. **Update the code and documentation**
   - Make your changes
   - Update CHANGELOG.md with the new version notes

2. **Bump the version**
   ```bash
   npm version patch    # 1.0.0 → 1.0.1 (bug fixes)
   npm version minor    # 1.0.0 → 1.1.0 (new features)
   npm version major    # 1.0.0 → 2.0.0 (breaking changes)
   ```
   This automatically:
   - Updates `package.json` and `package-lock.json`
   - Creates a git commit
   - Creates a git tag (e.g., `v1.0.1`)

3. **Push the tag**
   ```bash
   git push origin main --tags
   ```

4. **Monitor the workflow**
   - Go to GitHub Actions tab
   - Watch the "Publish to npm" workflow
   - Verify it completes successfully

5. **Verify the publication**
   ```bash
   npm info stack-end
   npm view stack-end versions
   ```

### Manual Publishing (Alternative)

If you need to publish manually:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Test the build**
   ```bash
   node dist/cli.js --help
   node dist/cli.js list
   ```

3. **Dry run to verify package contents**
   ```bash
   npm publish --dry-run
   ```
   Review the output to ensure:
   - dist/ directory is included
   - README.md is included
   - LICENSE is included
   - node_modules/ is NOT included
   - src/ is NOT included (should be in .npmignore)

4. **Publish to npm**
   ```bash
   # Set your npm token (if not logged in)
   export NODE_AUTH_TOKEN=your_npm_token_here
   
   # Publish with provenance (recommended)
   npm publish --access public
   ```

5. **Verify publication**
   ```bash
   npm info stack-end
   npm search stack-end
   ```

6. **Test the published package**
   ```bash
   # Test global install
   npm install -g stack-end
   stack-end --help
   stack-end list
   
   # Test npx
   npx stack-end --help
   ```

## Post-Publication Verification

After publishing (automated or manual), verify:

1. **Package appears on npm**: https://www.npmjs.com/package/stack-end
2. **Installation works**:
   ```bash
   npm install -g stack-end
   stack-end --version  # Should show the new version
   ```
3. **npx works**:
   ```bash
   npx stack-end@latest --version
   ```
4. **Search indexing**:
   ```bash
   npm search stack-end
   ```
5. **GitHub Release created**: Check https://github.com/kousthubha-sky/stack-end/releases

## Troubleshooting

### Publish fails with "You do not have permission"

- Verify your npm token has publish access
- Check that the token is correctly set in GitHub Secrets (for automated)
- Ensure you're logged in to npm (for manual): `npm whoami`

### Build fails in CI

- Check the workflow logs in GitHub Actions
- Ensure TypeScript compiles locally: `npm run build`
- Verify all dependencies are in package.json (not just package-lock.json)

### Package version already exists

- You cannot overwrite an existing version on npm
- Bump to a new version: `npm version patch`
- Delete the existing git tag if needed: `git tag -d v1.0.0 && git push origin :refs/tags/v1.0.0`

### .npmrc authentication issues

The `.npmrc` file expects `NODE_AUTH_TOKEN` as an environment variable:
```bash
export NODE_AUTH_TOKEN=your_npm_token_here
npm publish
```

Or use `npm login` which stores credentials differently.

## Version Strategy

Follow semantic versioning:

- **1.0.x** (Patch): Bug fixes, documentation updates, minor improvements
- **1.x.0** (Minor): New templates, new features, backwards compatible changes
- **x.0.0** (Major): Breaking changes, API changes, removed features

## Checklist Before Publishing

- [ ] All tests pass locally (if tests exist)
- [ ] `npm run build` completes successfully
- [ ] dist/ folder is generated and complete
- [ ] README.md is up-to-date
- [ ] CHANGELOG.md includes new version notes
- [ ] Version number is bumped in package.json (via `npm version`)
- [ ] No sensitive data in source code (.env files, tokens, etc.)
- [ ] .gitignore and .npmignore are correct
- [ ] CLI commands work: `node dist/cli.js --help` and `node dist/cli.js list`
- [ ] Dry run succeeds: `npm publish --dry-run`

## First-Time Setup Complete

The package is now ready for its first publication. To publish v1.0.0:

```bash
# Verify everything is ready
npm run build
npm publish --dry-run

# Tag and push (triggers automated publish)
git tag v1.0.0
git push origin main --tags

# Or publish manually
npm publish --access public
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/kousthubha-sky/stack-end/issues
- npm Package: https://www.npmjs.com/package/stack-end
