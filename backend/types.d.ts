import expressSession from 'express-session';

declare module 'express-session' {
    interface SessionData {
      user: { [key: string]: any }; // Use any or replace with the correct type for your user object
    }
  }
  
declare module 'express-serve-static-core' {
  interface Request {
    session?: expressSession.Session & Partial<expressSession.SessionData>;
  }
}