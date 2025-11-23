# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- _Nothing yet_

## [1.0.0] - 2025-11-23

### Added
- Initial release of stack-end CLI tool
- Support for scaffolding backend templates from Git repositories
- Two initial templates:
  - `better-auth-mongodb` - Backend template with Better Auth and MongoDB
  - `portfolio-3` - Portfolio template
- CLI commands:
  - `stack-end <template-name> [directory]` - Scaffold a new project
  - `stack-end list` - List all available templates
  - `stack-end --help` - Show help information
- Verbose output option with `--verbose` flag
- Cross-platform support (Linux, macOS, Windows)
- Global npm installation support
- npx usage support for no-install scaffolding
- Color-coded terminal output using chalk
- Loading spinners for long-running operations
- Comprehensive README with:
  - Installation instructions
  - Usage examples
  - Troubleshooting guide
  - Contributing guidelines
- MIT License
- GitHub repository with issue tracking

### Technical Details
- Built with TypeScript
- Uses commander.js for CLI argument parsing
- Uses simple-git for repository cloning
- Uses ora for progress spinners
- Uses chalk for colored terminal output
- Node.js 18+ required
- ES Modules support

---

## Release Guidelines

When releasing a new version:

1. Update the version in `package.json` following semantic versioning:
   - **MAJOR** (X.0.0): Breaking changes
   - **MINOR** (1.X.0): New features, backwards compatible
   - **PATCH** (1.0.X): Bug fixes, backwards compatible

2. Add an entry to this CHANGELOG under a new version heading with the date

3. Commit the changes:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: bump version to X.Y.Z"
   ```

4. Create and push a git tag:
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

5. The GitHub Actions workflow will automatically publish to npm

### Categories for Changelog Entries

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

[1.0.0]: https://github.com/kousthubha-sky/stack-end/releases/tag/v1.0.0
