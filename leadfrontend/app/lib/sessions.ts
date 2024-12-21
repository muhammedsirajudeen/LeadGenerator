import { createCookieSessionStorage, Session } from '@remix-run/node';

// Make sure to replace this with a strong secret in a production environment
// const sessionSecret = process.env.SESSION_SECRET || 'default-secret';

// Create a cookie session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'my_session', // The name of the cookie
    secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
    httpOnly: true, // Ensures the cookie is only accessible via HTTP requests
    sameSite: 'lax', // SameSite policy to control cross-site cookie sending
    maxAge: 60 * 60 * 24 * 7, // 1 week expiry
    path: '/', // Cookie scope
  },
});

// Get the session from the request headers
export function getSession(cookieHeader: string | null): Promise<Session> {
  return sessionStorage.getSession(cookieHeader);
}

// Commit the session to the response, returning the Set-Cookie header
export function commitSession(session: Session): Promise<string> {
  return sessionStorage.commitSession(session);
}

// Destroy the session, returning the Set-Cookie header
export function destroySession(session: Session): Promise<string> {
  return sessionStorage.destroySession(session);
}
