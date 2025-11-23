# stack-end

[![npm version](https://badge.fury.io/js/stack-end.svg)](https://www.npmjs.com/package/stack-end)
[![CI Status](https://github.com/kousthubha-sky/stack-end/actions/workflows/test.yml/badge.svg)](https://github.com/kousthubha-sky/stack-end/actions/workflows/test.yml)
[![Release](https://github.com/kousthubha-sky/stack-end/actions/workflows/publish.yml/badge.svg)](https://github.com/kousthubha-sky/stack-end/actions/workflows/publish.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CLI tool for scaffolding backend templates with modern Node.js technologies.

## Installation

### Global Installation
```bash
npm install -g stack-end
```

### Using npx (no installation required)
```bash
npx stack-end <template-name> [project-directory]
```

## Quick Start

```bash
# List available templates
stack-end list

# Create a new project in current directory
stack-end better-auth-mongodb

# Create a new project in specific directory
stack-end better-auth-mongodb ./my-new-project

# Use npx for one-time scaffolding
npx stack-end better-auth-mongodb my-backend
```

## Verify your installation

After installing, confirm everything works:

```bash
stack-end --help                    # Global install verification
stack-end list                      # Ensure templates load
npx stack-end --help                # npx execution
npx stack-end better-auth-mongodb test-app  # Full scaffolding dry-run
npm search stack-end                # Confirm package is indexed
```

## Usage

### Scaffold a new project
```bash
# Create a new project in current directory
stack-end <template-name>

# Create a new project in specific directory
stack-end <template-name> <project-directory>

# Verbose output
stack-end <template-name> --verbose
```

### List available templates
```bash
stack-end list
```

### Get help
```bash
stack-end --help
```

## Available Templates

| Template | Description | Default Branch | Repository |
|----------|-------------|----------------|------------|
| `better-auth-mongodb` | Backend template with Better Auth and MongoDB | `main` | https://github.com/backend-bits/better-auth-mongodb |
| `portfolio-3` | Portfolio template for showcasing projects | `main` | https://github.com/backend-bits/portfolio-3 |

## Examples

### Quick start with a Better Auth + MongoDB project
```bash
# Using npx (recommended for first-time users)
npx stack-end better-auth-mongodb my-backend
cd my-backend/better-auth-mongodb
npm install
npm run dev

# Or with global installation
npm install -g stack-end
stack-end better-auth-mongodb my-backend
cd my-backend/better-auth-mongodb
npm install
npm run dev
```

### Scaffold directly into current directory
```bash
mkdir my-project
cd my-project
stack-end better-auth-mongodb .
```

## Troubleshooting

### Command not found after global installation
If you get a "command not found" error after installing globally:

1. **Check if npm global bin is in your PATH:**
   ```bash
   npm config get prefix
   ```
   The bin directory should be in your PATH. For example:
   - Linux/macOS: Add `~/.npm-global/bin` or `/usr/local/bin` to PATH
   - Windows: Add `%APPDATA%\npm` to PATH

2. **Verify installation:**
   ```bash
   npm list -g stack-end
   ```

3. **Try using npx instead:**
   ```bash
   npx stack-end --help
   ```

### Git clone fails
If the template fails to clone:

1. Check your internet connection
2. Verify you have Git installed: `git --version`
3. If behind a proxy, configure Git proxy settings
4. Try cloning the repository URL manually to verify access

### Permission errors
If you encounter permission errors during global installation:

**Linux/macOS:**
```bash
sudo npm install -g stack-end
# or configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g stack-end
```

**Windows:**
Run your terminal/command prompt as Administrator.

### Template-specific issues
After scaffolding a template, if you encounter issues:

1. Read the template's README.md for specific setup instructions
2. Ensure all dependencies are installed: `npm install`
3. Check for required environment variables
4. Verify you meet the template's prerequisites (databases, services, etc.)

## Development

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/kousthubha-sky/stack-end.git
cd stack-end

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Development Scripts
```bash
npm run build    # Compile TypeScript to JavaScript
npm run dev      # Run CLI in development mode with tsx
npm test         # Run tests (when implemented)
```

### Testing locally
After building, you can test the CLI locally:
```bash
# Build first
npm run build

# Test commands
node dist/cli.js --help
node dist/cli.js list
node dist/cli.js better-auth-mongodb test-project
```

### Project Structure
```
stack-end/
├── src/
│   ├── cli.ts              # Main CLI entry point
│   ├── index.ts            # Core scaffolding functions
│   ├── templates.ts        # Template definitions
│   └── utils/
│       └── index.ts        # Utility functions
├── dist/                   # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Adding New Templates

To add a new template, update `src/templates.ts`:

```typescript
export const availableTemplates: Template[] = [
  // ... existing templates
  {
    name: 'your-new-template',
    description: 'Description of your template',
    url: 'https://github.com/username/template-repo.git',
    version: 'main'
  }
];
```

### Template Requirements

Templates should be Git repositories that:
- Contain a `package.json` file
- Follow standard Node.js project structure
- Have clear setup instructions in their README
- Are compatible with Node.js 18+
- Can be cloned and used immediately after `npm install`

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features (when test framework is set up)
- Update documentation for any changed functionality
- Ensure all checks pass before submitting PR
- Write clear, descriptive commit messages

### Reporting Issues

If you encounter any issues or have questions:
- Check existing [Issues](https://github.com/kousthubha-sky/stack-end/issues)
- Create a new issue with:
  - Clear description of the problem
  - Steps to reproduce
  - Template name (if applicable)
  - Error messages and logs
  - Your environment (OS, Node version, npm version)

## Continuous Integration & Publishing

stack-end is continuously tested and published via GitHub Actions:

| Workflow | File | Trigger | Description |
|----------|------|---------|-------------|
| CI Tests | [.github/workflows/test.yml](.github/workflows/test.yml) | Pushes & Pull Requests | Runs the TypeScript build across Node.js 18/20/22 and Linux/macOS/Windows matrices, exercises the CLI, and packs the npm tarball. |
| Publish to npm | [.github/workflows/publish.yml](.github/workflows/publish.yml) | Tags matching `v*.*.*` | Builds the project, verifies the generated dist artifacts, performs a dry-run, and publishes `stack-end` to npm with provenance enabled. |

> **Note:** The publish workflow requires an `NPM_TOKEN` repository secret with access to the `stack-end` package. Locally, `.npmrc` expects `NODE_AUTH_TOKEN` to be set before running `npm publish`.
>
> For a detailed, step-by-step release checklist, see [PUBLISHING.md](PUBLISHING.md).

## Versioning & Releases

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

### Bumping versions
1. Update documentation and code, and add release notes to [CHANGELOG.md](CHANGELOG.md).
2. Run `npm run build` to ensure the dist output is up to date.
3. Use `npm version patch|minor|major` to bump the version (this updates `package.json` and creates a git tag).
4. Push commits and tags: `git push origin main --tags`.
5. Monitor the "Publish to npm" workflow until it completes successfully.

### Release automation
- Creating a tag that matches `vX.Y.Z` triggers the publish workflow automatically.
- The workflow runs `npm publish --dry-run` before the real publish to surface packaging issues early.
- Release notes are generated automatically using the tagged commit history.

### Changelog
All release history lives in [CHANGELOG.md](CHANGELOG.md). Every pull request that modifies functionality should update the "Unreleased" section (or create a new version section) before merging.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/kousthubha-sky/stack-end#readme)
- 🐛 [Issue Tracker](https://github.com/kousthubha-sky/stack-end/issues)
- 💬 [Discussions](https://github.com/kousthubha-sky/stack-end/discussions)

## Roadmap

- [ ] Interactive template selection
- [ ] Custom template registry
- [ ] Template versioning and updates
- [ ] Plugin system for custom scaffolding logic
- [ ] Integration with package managers (pnpm, yarn)
- [ ] Template search and filtering
- [ ] Local template caching
- [ ] Custom template creation wizard

---

Made with ❤️ by the stack-end community
