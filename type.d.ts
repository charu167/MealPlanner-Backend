// Extend Express Request in a .d.ts file, such as types.d.ts
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {  // Define this based on what your JWT will decode
        id: string;
        name: string;
        email: string;
      };
    }
  }
}
