import expressSession from 'express-session';

declare module 'express-session' {
    interface SessionData {
      user: {
        username: string;
        email: string;
        user_id: string;
      }; // Use any or replace with the correct type for your user object
    }
  }
  
declare module 'express-serve-static-core' {
  interface Request {
    session?: expressSession.Session & Partial<expressSession.SessionData>;
  }
}