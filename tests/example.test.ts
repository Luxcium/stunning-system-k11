/**
 * Example test file demonstrating testing patterns and best practices
 * Tests the UserService class from example.ts
 */

import {
  UserService,
  ValidationError,
  NotFoundError,
  createExampleUser,
  isValidEmail,
  sanitizeString,
  delay,
  CONFIG,
} from '../src/example';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        isActive: true,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      };

      const user = await userService.createUser(userData);

      expect(user.id).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(user.isActive).toBe(userData.isActive);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.preferences).toEqual(userData.preferences);
    });

    it('should throw ValidationError for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
        isActive: true,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      };

      await expect(userService.createUser(userData)).rejects.toThrow(ValidationError);
      await expect(userService.createUser(userData)).rejects.toThrow('Invalid email format');
    });

    it('should throw ValidationError for empty name', async () => {
      const userData = {
        email: 'test@example.com',
        name: '',
        isActive: true,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      };

      await expect(userService.createUser(userData)).rejects.toThrow(ValidationError);
      await expect(userService.createUser(userData)).rejects.toThrow('Name is required');
    });

    it('should throw ValidationError for invalid isActive type', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        isActive: 'true' as any, // Invalid type
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      };

      await expect(userService.createUser(userData)).rejects.toThrow(ValidationError);
      await expect(userService.createUser(userData)).rejects.toThrow('isActive must be a boolean');
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        isActive: true,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      };

      const createdUser = await userService.createUser(userData);
      const retrievedUser = await userService.getUserById(createdUser.id);

      expect(retrievedUser).toEqual(createdUser);
    });

    it('should throw NotFoundError when user not found', async () => {
      const nonExistentId = 'non-existent-id';

      await expect(userService.getUserById(nonExistentId)).rejects.toThrow(NotFoundError);
      await expect(userService.getUserById(nonExistentId)).rejects.toThrow(
        `User with identifier '${nonExistentId}' not found`
      );
    });
  });

  describe('updateUserPreferences', () => {
    it('should update user preferences', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        isActive: true,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      };

      const user = await userService.createUser(userData);
      const newPreferences = {
        theme: 'dark' as const,
        notifications: {
          email: false,
          push: true,
          sms: true,
        },
      };

      const updatedUser = await userService.updateUserPreferences(user.id, newPreferences);

      expect(updatedUser.preferences.theme).toBe('dark');
      expect(updatedUser.preferences.language).toBe('en'); // Should remain unchanged
      expect(updatedUser.preferences.notifications.email).toBe(false);
      expect(updatedUser.preferences.notifications.push).toBe(true);
      expect(updatedUser.preferences.notifications.sms).toBe(true);
    });
  });

  describe('getActiveUsers', () => {
    it('should return only active users', async () => {
      const activeUserData = {
        email: 'active@example.com',
        name: 'Active User',
        isActive: true,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          notifications: { email: true, push: false, sms: false },
        },
      };

      const inactiveUserData = {
        email: 'inactive@example.com',
        name: 'Inactive User',
        isActive: false,
        preferences: {
          theme: 'dark' as const,
          language: 'en',
          notifications: { email: false, push: false, sms: false },
        },
      };

      const activeUser = await userService.createUser(activeUserData);
      await userService.createUser(inactiveUserData);

      const activeUsers = await userService.getActiveUsers();

      expect(activeUsers).toHaveLength(1);
      expect(activeUsers[0]).toEqual(activeUser);
    });
  });
});

describe('Error Classes', () => {
  describe('ValidationError', () => {
    it('should create error with correct properties', () => {
      const error = new ValidationError('Test message', 'testField');

      expect(error.message).toBe('Test message');
      expect(error.field).toBe('testField');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('ValidationError');
    });
  });

  describe('NotFoundError', () => {
    it('should create error with correct properties', () => {
      const error = new NotFoundError('User', 'test-id');

      expect(error.message).toBe("User with identifier 'test-id' not found");
      expect(error.code).toBe('NOT_FOUND');
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe('NotFoundError');
    });
  });
});

describe('Utility Functions', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should remove dangerous characters and trim', () => {
      expect(sanitizeString('  hello<script>alert()</script>world  ')).toBe(
        'helloscriptalert()/scriptworld'
      );
      expect(sanitizeString('<div>test</div>')).toBe('divtest/div');
    });
  });

  describe('delay', () => {
    it('should wait for specified time', async () => {
      const start = Date.now();
      await delay(100);
      const end = Date.now();

      expect(end - start).toBeGreaterThanOrEqual(95); // Allow for some timing variance
    });
  });
});

describe('Configuration', () => {
  it('should have expected configuration values', () => {
    expect(CONFIG.DEFAULT_PAGE_SIZE).toBe(20);
    expect(CONFIG.MAX_PAGE_SIZE).toBe(100);
    expect(CONFIG.RATE_LIMIT_WINDOW_MS).toBe(15 * 60 * 1000);
    expect(CONFIG.RATE_LIMIT_MAX_REQUESTS).toBe(100);
  });
});

describe('Integration Tests', () => {
  describe('createExampleUser', () => {
    it('should create a valid example user', async () => {
      const user = await createExampleUser();

      expect(user.id).toBeDefined();
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(user.name).toBe('Example User');
      expect(user.isActive).toBe(true);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.preferences.theme).toBe('light');
    });
  });
});
