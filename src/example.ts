/**
 * Example TypeScript file demonstrating modern TypeScript patterns and best practices
 * This file serves as a template and starting point for the project
 */

import { RequestHandler } from 'express';

// Type definitions with strict typing
export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly isActive: boolean;
  readonly preferences: UserPreferences;
}

export interface UserPreferences {
  readonly theme: 'light' | 'dark' | 'auto';
  readonly language: string;
  readonly notifications: NotificationSettings;
}

export interface NotificationSettings {
  readonly email: boolean;
  readonly push: boolean;
  readonly sms: boolean;
}

// Error types for institutional-grade error handling
export class ValidationError extends Error {
  public readonly code = 'VALIDATION_ERROR';
  public readonly statusCode = 400;

  constructor(
    message: string,
    public readonly field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  public readonly code = 'NOT_FOUND';
  public readonly statusCode = 404;

  constructor(resource: string, identifier: string) {
    super(`${resource} with identifier '${identifier}' not found`);
    this.name = 'NotFoundError';
  }
}

// Service class demonstrating modern patterns
export class UserService {
  private readonly users: Map<string, UserProfile> = new Map();

  /**
   * Creates a new user profile with validation
   * @param userData - User data to create profile from
   * @returns Promise resolving to created user profile
   * @throws ValidationError when data is invalid
   */
  public async createUser(userData: Omit<UserProfile, 'id' | 'createdAt'>): Promise<UserProfile> {
    this.validateUserData(userData);

    const user: UserProfile = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  /**
   * Retrieves a user by ID
   * @param id - User ID to retrieve
   * @returns Promise resolving to user profile
   * @throws NotFoundError when user doesn't exist
   */
  public async getUserById(id: string): Promise<UserProfile> {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  }

  /**
   * Updates user preferences
   * @param id - User ID to update
   * @param preferences - New preferences to set
   * @returns Promise resolving to updated user profile
   */
  public async updateUserPreferences(
    id: string,
    preferences: Partial<UserPreferences>
  ): Promise<UserProfile> {
    const user = await this.getUserById(id);
    const updatedUser: UserProfile = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences,
      },
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  /**
   * Lists all active users
   * @returns Promise resolving to array of active users
   */
  public async getActiveUsers(): Promise<UserProfile[]> {
    return Array.from(this.users.values()).filter((user) => user.isActive);
  }

  private validateUserData(userData: Omit<UserProfile, 'id' | 'createdAt'>): void {
    if (!userData.email?.includes('@')) {
      throw new ValidationError('Invalid email format', 'email');
    }

    if (!userData.name?.trim()) {
      throw new ValidationError('Name is required', 'name');
    }

    if (typeof userData.isActive !== 'boolean') {
      throw new ValidationError('isActive must be a boolean', 'isActive');
    }
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
}

// Express middleware example
export const validateJsonContent: RequestHandler = (req, res, next): void => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const contentType = req.headers['content-type'];
    if (!contentType?.includes('application/json')) {
      res.status(400).json({
        error: 'Content-Type must be application/json',
        code: 'INVALID_CONTENT_TYPE',
      });
      return;
    }
  }
  next();
};

// Utility functions with proper typing
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Configuration constants
export const CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
} as const;

// Example of using the service
export const createExampleUser = async (): Promise<UserProfile> => {
  const userService = new UserService();

  const exampleUser = await userService.createUser({
    email: 'example@company.com',
    name: 'Example User',
    isActive: true,
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
    },
  });

  return exampleUser;
};
