/**
 * Main application entry point
 * Demonstrates modern Express.js setup with TypeScript and best practices
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { UserService, ValidationError, NotFoundError, validateJsonContent } from './example.js';

// Load environment variables
dotenv.config();

// Application configuration
interface AppConfig {
  readonly port: number;
  readonly nodeEnv: string;
  readonly corsOrigin: string[];
  readonly logLevel: string;
}

const config: AppConfig = {
  port: parseInt(process.env['PORT'] ?? '3000', 10),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  corsOrigin: process.env['CORS_ORIGIN']?.split(',') ?? ['http://localhost:3000'],
  logLevel: process.env['LOG_LEVEL'] ?? 'combined',
};

// Swagger/OpenAPI configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stunning System K11 API',
      version: '1.0.0',
      description: 'Modern TypeScript/Node.js API with institutional-grade practices',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        UserProfile: {
          type: 'object',
          required: ['id', 'email', 'name', 'createdAt', 'isActive', 'preferences'],
          properties: {
            id: { type: 'string', description: 'Unique user identifier' },
            email: { type: 'string', format: 'email', description: 'User email address' },
            name: { type: 'string', description: 'User full name' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date',
            },
            isActive: { type: 'boolean', description: 'User account status' },
            preferences: { $ref: '#/components/schemas/UserPreferences' },
          },
        },
        UserPreferences: {
          type: 'object',
          required: ['theme', 'language', 'notifications'],
          properties: {
            theme: { type: 'string', enum: ['light', 'dark', 'auto'] },
            language: { type: 'string', description: 'User preferred language code' },
            notifications: { $ref: '#/components/schemas/NotificationSettings' },
          },
        },
        NotificationSettings: {
          type: 'object',
          required: ['email', 'push', 'sms'],
          properties: {
            email: { type: 'boolean' },
            push: { type: 'boolean' },
            sms: { type: 'boolean' },
          },
        },
        Error: {
          type: 'object',
          required: ['error', 'code'],
          properties: {
            error: { type: 'string', description: 'Error message' },
            code: { type: 'string', description: 'Error code' },
            field: { type: 'string', description: 'Field that caused the error (if applicable)' },
          },
        },
      },
    },
  },
  apis: ['./src/*.ts'], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Create Express application
const app: Express = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));

// Utility middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan(config.logLevel));

// Custom middleware
app.use(validateJsonContent);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Service instances
const userService = new UserService();

// Health check endpoint
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the application
 *     responses:
 *       200:
 *         description: Application is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Uptime in seconds
 */
app.get('/health', (_req: Request, res: Response): void => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// User endpoints
/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user profile with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, name, isActive, preferences]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               preferences:
 *                 $ref: '#/components/schemas/UserPreferences'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user profile by their unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get(
  '/api/users/:id',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params['id'];
      if (!userId) {
        res.status(400).json({
          error: 'User ID is required',
          code: 'VALIDATION_ERROR',
          field: 'id',
        });
        return;
      }
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all active users
 *     description: Retrieves a list of all active users
 *     responses:
 *       200:
 *         description: List of active users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserProfile'
 */
app.get('/api/users', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getActiveUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
      field: error.field,
    });
    return;
  }

  if (error instanceof NotFoundError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
    return;
  }

  // Generic error handling
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
  });
});

// 404 handler
app.use((_req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Not Found',
    code: 'NOT_FOUND',
    message: 'The requested resource was not found',
  });
});

// Start server
const startServer = (): void => {
  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`📚 API documentation available at http://localhost:${config.port}/api-docs`);
    console.log(`🏥 Health check available at http://localhost:${config.port}/health`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
  });
};

// Graceful shutdown handling
process.on('SIGTERM', (): void => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', (): void => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the application
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export { app, config };
export default app;
