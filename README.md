# Stunning System K11

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-30+-red.svg)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-9+-purple.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3+-ff69b4.svg)](https://prettier.io/)

Modern TypeScript/Node.js project with institutional-grade tooling and best
practices. This project serves as a comprehensive template for building robust,
scalable, and maintainable Node.js applications with API-first design and code
generation capabilities.

## 🚀 Features

### Core Technologies

- **TypeScript 5.9+** - Latest TypeScript with strict configuration and modern
  features
- **Node.js 18+** - Modern Node.js with ESM support
- **Express.js 5** - Fast, unopinionated web framework with modern middleware
- **Jest 30+** - Comprehensive testing framework with TypeScript support

### Code Quality & Standards

- **ESLint** - Comprehensive linting with TypeScript-specific rules and best
  practices
- **Prettier** - Consistent code formatting across the entire codebase
- **Markdownlint** - Documentation quality enforcement for all markdown files
- **JSON Linting** - Validation and formatting for JSON configuration files
- **Husky + Lint-staged** - Pre-commit hooks ensuring code quality

### API Development

- **OpenAPI 3.0** - Comprehensive API specification and documentation
- **Swagger UI** - Interactive API documentation and testing interface
- **Code Generation** - Automated client/server code generation from OpenAPI
  specs
- **Request Validation** - Automatic validation against OpenAPI schemas

### Development Experience

- **TypeScript Path Mapping** - Clean import statements with `@/` aliases
- **Hot Reload** - Instant development feedback with `tsx watch`
- **Coverage Reports** - Comprehensive test coverage with multiple output
  formats
- **Source Maps** - Full debugging support in development and production

## 📁 Project Structure

```text
stunning-system-k11/
├── src/                    # Source code
│   ├── api/               # API route handlers
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── services/          # Business logic services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── example.ts         # Example implementation patterns
│   └── index.ts           # Application entry point
├── tests/                 # Test files
│   ├── setup.ts          # Jest configuration and global test utilities
│   └── example.test.ts   # Example test patterns
├── api/                   # OpenAPI specifications
│   └── openapi.yaml      # Main API specification
├── docs/                  # Documentation
├── dist/                  # Compiled JavaScript output
├── coverage/              # Test coverage reports
└── memory-bank/           # Copilot AI documentation system
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Luxcium/stunning-system-k11.git
cd stunning-system-k11

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Build the project
npm run build
```

### Package Manager Policy

- This project uses npm as the sole package manager.
- If you see commands using `pnpm`, `yarn`, or `bun`, treat them as typos and convert to npm equivalents.
- Prefer running scripts via `npm run <script>` for cross-platform consistency.

Command transposition cheatsheet:

```bash
# pnpm
pnpm install              -> npm install
pnpm add <pkg>            -> npm install <pkg>
pnpm add -D <pkg>         -> npm install -D <pkg>
pnpm run <script>         -> npm run <script>

# yarn
yarn                      -> npm install
yarn add <pkg>            -> npm install <pkg>
yarn add -D <pkg>         -> npm install -D <pkg>
yarn <script>             -> npm run <script>
```

## 🏃‍♂️ Getting Started

### Development

```bash
# Start development server with hot reload
npm run dev

# Run in watch mode for continuous compilation
npm run build:watch
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting & Formatting

```bash
# Lint and fix all files
npm run lint

# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

### API Development

```bash
# Validate OpenAPI specification
npm run api:validate

# Generate TypeScript client from OpenAPI spec
npm run api:generate
```

## 📚 API Documentation

The API is fully documented using OpenAPI 3.0 specification:

- **Interactive Documentation**: Available at `http://localhost:3000/api-docs`
  when running
- **OpenAPI Spec**: Located at `api/openapi.yaml`
- **Health Check**: `GET /health` - Application health and status
- **User Management**: Full CRUD operations with validation

### Example API Usage

```bash
# Health check
curl http://localhost:3000/health

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "isActive": true,
    "preferences": {
      "theme": "light",
      "language": "en",
      "notifications": {
        "email": true,
        "push": false,
        "sms": false
      }
    }
  }'

# Get all active users
curl http://localhost:3000/api/users
```

## 🧪 Testing Strategy

### Test Structure

- **Unit Tests** - Individual function and class testing
- **Integration Tests** - API endpoint and service integration
- **Custom Matchers** - Domain-specific Jest matchers for better assertions
- **Coverage Thresholds** - Enforced 80% coverage across all metrics

### Example Test Patterns

```typescript
// Custom matchers available in all tests
expect(user.createdAt).toBeValidDate();
expect(user.email).toBeValidEmail();

// Async service testing
await expect(userService.createUser(invalidData)).rejects.toThrow(
  ValidationError
);

// API endpoint testing with proper error handling
const response = await request(app).post('/api/users').send(userData);
expect(response.status).toBe(201);
```

## 🔧 Configuration

### TypeScript Configuration

- **Strict Mode** - All strict TypeScript options enabled
- **Modern Target** - ES2022 with Node.js optimizations
- **Path Mapping** - Clean imports with `@/` prefix
- **Source Maps** - Full debugging support

### ESLint Rules

- **TypeScript-specific** - Comprehensive TypeScript linting
- **Prettier Integration** - Automatic formatting on save
- **Custom Rules** - Institutional-grade code standards
- **Test Overrides** - Relaxed rules for test files

### Environment Variables

Key configuration options (see `.env.example`):

```bash
PORT=3000                          # Server port
NODE_ENV=development               # Environment mode
CORS_ORIGIN=http://localhost:3000  # CORS allowed origins
LOG_LEVEL=combined                 # Morgan logging level
```

## 🏗️ Build & Deployment

### Build Process

```bash
# Clean previous builds
npm run clean

# Compile TypeScript to JavaScript
npm run build

# Run production server
npm start
```

### Production Considerations

- **Environment Variables** - Configure production settings in `.env`
- **Process Management** - Use PM2 or similar for process management
- **Monitoring** - Integrate with APM tools (New Relic, Datadog, etc.)
- **Security** - Review and configure Helmet.js security headers

## 🚨 Error Handling

### Institutional-Grade Error Handling

- **Custom Error Classes** - Structured error types with proper status codes
- **Validation Errors** - Detailed field-level validation feedback
- **Not Found Errors** - Consistent resource-not-found responses
- **Global Error Handler** - Centralized error processing and logging

```typescript
// Example error usage
throw new ValidationError('Invalid email format', 'email');
throw new NotFoundError('User', userId);
```

## 🔍 Code Quality Tools

### Configured Tools

1. **TypeScript Compiler** - Strict type checking and modern JavaScript output
2. **ESLint** - 60+ rules covering TypeScript, Node.js, and general best
   practices
3. **Prettier** - Consistent formatting for TypeScript, JSON, Markdown, and YAML
4. **Markdownlint** - Documentation quality and consistency
5. **Jest** - Unit testing with TypeScript support and custom matchers
6. **Husky** - Git hooks for automated quality checks
7. **Lint-staged** - Efficient pre-commit linting for changed files only

### Quality Metrics

- **Test Coverage** - 80% minimum across lines, functions, branches, and
  statements
- **Type Coverage** - 100% TypeScript type coverage with strict mode
- **Linting** - Zero ESLint errors or warnings in CI/CD
- **Documentation** - All public APIs documented with TSDoc comments

## 🤝 Contributing

### Development Workflow

1. **Setup** - Follow installation instructions
2. **Branch** - Create feature branch from `main`
3. **Develop** - Write code following established patterns
4. **Test** - Ensure tests pass and coverage meets requirements
5. **Lint** - Fix all linting and formatting issues
6. **Commit** - Use conventional commit messages
7. **Review** - Submit pull request for review

### Code Standards

- **TypeScript** - Use strict typing, avoid `any`
- **Testing** - Write tests for all new functionality
- **Documentation** - Update README and API docs for changes
- **Commits** - Use conventional commit format

## 📖 Resources

### TypeScript & Node.js

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Guide](https://expressjs.com/en/guide/)

### API Development

- [OpenAPI Specification](https://swagger.io/specification/)
- [API Design Guidelines](https://github.com/microsoft/api-guidelines)
- [RESTful API Best Practices](https://restfulapi.net/)

### Testing

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for
details.

## 🏢 Institutional Grade Features

This project demonstrates enterprise-ready patterns:

- **Comprehensive Error Handling** - Structured error types with proper HTTP
  status codes
- **Security Headers** - Helmet.js with security best practices
- **Request Validation** - Automated validation against OpenAPI schemas
- **Logging & Monitoring** - Morgan logging with configurable levels
- **Code Generation** - Swagger Codegen for consistent API client generation
- **Documentation** - Self-documenting APIs with interactive Swagger UI
- **Type Safety** - End-to-end TypeScript coverage with strict configuration
- **Testing Strategy** - Comprehensive test coverage with custom matchers
- **Code Quality** - Multiple layers of quality enforcement and automation

---

**Built with ❤️ using modern TypeScript and Node.js best practices**
