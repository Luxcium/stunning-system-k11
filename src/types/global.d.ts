/**
 * Global type definitions for the project
 */

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidDate(): R;
      toBeValidEmail(): R;
    }
  }
}

export {};