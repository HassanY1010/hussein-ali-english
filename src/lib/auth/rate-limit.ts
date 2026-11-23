// Simple in-memory sliding window rate limiter for login attempts
interface RateLimitEntry {
  attempts: number;
  blockedUntil: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (!entry) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // If blocked, check if block period has expired
  if (entry.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // If block expired, reset
  if (entry.blockedUntil > 0 && entry.blockedUntil <= now) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - entry.attempts);
  return { allowed: remaining > 0, remainingAttempts: remaining };
}

export function recordFailedAttempt(identifier: string): { blocked: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier) || { attempts: 0, blockedUntil: 0 };

  entry.attempts += 1;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_DURATION_MS;
    loginAttempts.set(identifier, entry);
    return { blocked: true, retryAfterSeconds: Math.ceil(BLOCK_DURATION_MS / 1000) };
  }

  loginAttempts.set(identifier, entry);
  return { blocked: false };
}

export function resetRateLimit(identifier: string): void {
  loginAttempts.delete(identifier);
}
