# stack-end

A CLI tool for scaffolding backend templates with modern Node.js technologies.

## Installation

### Global Installation
```bash
npm install -g stack-end
```

### Using npx (no installation required)
```bash
npx stack-end <template-name>
```

## Usage

### Scaffold a new project
```bash
# Create a new project in current directory
stack-end better-auth-mongodb

# Create a new project in specific directory
stack-end express-prisma-postgres ./my-new-project

# Verbose output
stack-end fastify-typeorm-mysql --verbose
```

### List available templates
```bash
stack-end list
```

## Available Templates

| Template | Description | Version |
|----------|-------------|---------|
| `better-auth-mongodb` | Backend template with Better Auth and MongoDB | 1.0.0 |
| `express-prisma-postgres` | Express.js with Prisma ORM and PostgreSQL | 1.0.0 |
| `fastify-typeorm-mysql` | Fastify with TypeORM and MySQL | 1.0.0 |

## Examples

### Quick start with a Better Auth + MongoDB project
```bash
mkdir my-backend
cd my-backend
stack-end better-auth-mongodb .
cd better-auth-mongodb
npm install
npm run dev
```

### Using npx for one-time scaffolding
```bash
npx stack-end express-prisma-postgres ./new-api
```

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
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
    version: '1.0.0'
  }
];
```

## Template Requirements

Templates should be Git repositories that:
- Contain a `package.json` file
- Follow standard Node.js project structure
- Have clear setup instructions in their README
- Are compatible with Node.js 18+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

If you encounter any issues or have questions:
- Check the [Issues](https://github.com/username/stack-end/issues) page
- Create a new issue with detailed information
- Include the template name and error messages

## Roadmap

- [ ] Interactive template selection
- [ ] Custom template registry
- [ ] Template versioning and updates
- [ ] Plugin system for custom scaffolding logic
- [ ] Integration with package managers (pnpm, yarn)