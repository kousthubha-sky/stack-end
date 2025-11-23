# Release Checklist for stack-end v1.0.0

This document summarizes all preparations made for the initial npm publication of stack-end.

## ✅ Completed Tasks

### 1. Package Configuration (package.json)
- [x] Updated version to `1.0.0`
- [x] Added `files` field: `["dist", "README.md", "LICENSE"]`
- [x] Enhanced keywords: cli, scaffold, templates, backend, generator, boilerplate, starter
- [x] Set author: `kousthubha-sky`
- [x] Added repository URL: `https://github.com/kousthubha-sky/stack-end.git`
- [x] Added homepage URL
- [x] Added bugs/issues URL
- [x] Added Node.js engines requirement: `>=18.0.0`
- [x] Verified bin entry: `"stack-end": "dist/cli.js"`

### 2. Documentation
- [x] Created MIT LICENSE file
- [x] Enhanced README.md with:
  - npm and CI badges
  - Installation instructions (global & npx)
  - Quick start guide
  - Installation verification steps
  - Usage examples
  - Available templates table (with repository links)
  - Comprehensive troubleshooting section
  - Contributing guidelines
  - CI/CD workflow documentation
  - Version management guide
  - Release automation instructions
- [x] Created CHANGELOG.md with initial v1.0.0 release notes
- [x] Created PUBLISHING.md with detailed publishing instructions
- [x] Created this RELEASE_CHECKLIST.md

### 3. GitHub Actions Workflows
- [x] Created `.github/workflows/test.yml`:
  - Runs on push/PR to main and develop branches
  - Tests across Node.js 18.x, 20.x, 22.x
  - Tests across Ubuntu, macOS, Windows
  - Verifies build output
  - Tests CLI commands
  - Runs npm pack --dry-run
- [x] Created `.github/workflows/publish.yml`:
  - Triggers on tags matching `v*.*.*`
  - Validates version matches between tag and package.json
  - Builds and verifies output
  - Runs dry-run before publishing
  - Publishes to npm with provenance
  - Creates GitHub release automatically

### 4. Build & Testing
- [x] Updated version in `src/cli.ts` to match package.json (1.0.0)
- [x] Successfully ran `npm run build`
- [x] Verified dist/ folder generation
- [x] Tested CLI commands:
  - `node dist/cli.js --help` ✓
  - `node dist/cli.js list` ✓
  - `node dist/cli.js better-auth-mongodb test-project` ✓
- [x] Verified npm pack --dry-run (19 files, 42.5 kB unpacked)

### 5. Configuration Files
- [x] Verified .gitignore excludes dist/, node_modules/, etc.
- [x] Verified .npmignore excludes src/, tests/, CI files
- [x] Created .npmrc with npm authentication configuration

## 📋 Pre-Publish Checklist

Before publishing for the first time:

- [ ] **Set up npm account**: Ensure you have an account at npmjs.com
- [ ] **Generate npm token**: Create an automation token from npm account settings
- [ ] **Configure GitHub Secret**: Add `NPM_TOKEN` to repository secrets
  1. Go to: https://github.com/kousthubha-sky/stack-end/settings/secrets/actions
  2. Click "New repository secret"
  3. Name: `NPM_TOKEN`
  4. Value: Your npm automation token
- [ ] **Review package contents**: Run `npm pack --dry-run` one more time
- [ ] **Verify no sensitive data**: Check for .env files, API keys, tokens

## 🚀 Publishing Options

### Option A: Automated (Recommended)
```bash
# Ensure you're on main branch and changes are committed
git checkout main
git pull origin main

# Tag will trigger publish workflow
git tag v1.0.0
git push origin v1.0.0

# Monitor: https://github.com/kousthubha-sky/stack-end/actions
```

### Option B: Manual
```bash
# Build the project
npm run build

# Login to npm (if not already)
npm login

# Publish
npm publish --access public

# Manually create GitHub release
# Visit: https://github.com/kousthubha-sky/stack-end/releases/new
```

## ✓ Post-Publish Verification

After publishing, verify:

1. **Package is live**:
   ```bash
   npm view stack-end
   npm info stack-end
   ```

2. **Global installation works**:
   ```bash
   npm install -g stack-end
   stack-end --version  # Should show 1.0.0
   stack-end --help
   stack-end list
   ```

3. **npx works**:
   ```bash
   npx stack-end@latest --help
   npx stack-end@latest list
   ```

4. **Search indexing**:
   ```bash
   npm search stack-end
   ```

5. **Package page**: Visit https://www.npmjs.com/package/stack-end

6. **GitHub Release**: Check https://github.com/kousthubha-sky/stack-end/releases

## 📊 Package Summary

- **Name**: stack-end
- **Version**: 1.0.0
- **Size**: ~12.2 kB (packed), 42.5 kB (unpacked)
- **Files**: 19 (dist/, README.md, LICENSE, package.json)
- **Dependencies**: 5 (chalk, commander, dotenv, ora, simple-git)
- **Node.js**: >=18.0.0
- **License**: MIT

## 🔄 Future Releases

For subsequent releases:

1. Make your changes and update code
2. Update CHANGELOG.md with new version section
3. Bump version: `npm version patch|minor|major`
4. Push with tags: `git push origin main --tags`
5. Automated workflow publishes to npm

## 📚 Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Actions Workflows](https://docs.github.com/en/actions)

## 🎯 Next Steps

1. Set up NPM_TOKEN in GitHub repository secrets
2. Review and commit all changes to the main branch
3. Create and push v1.0.0 tag to trigger automated publishing
4. Monitor GitHub Actions workflow
5. Verify package is published and working
6. Announce the release!

---

**Ready to publish!** 🎉
