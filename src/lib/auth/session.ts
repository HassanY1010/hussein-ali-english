import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_COOKIE_NAME = "ha_admin_session";

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL SECURITY ERROR: ADMIN_SESSION_SECRET environment variable is missing in production.");
    }
    return "dev-fallback-secret-at-least-32-chars-long-2026";
  }
  return secret;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

interface SessionPayload {
  id: string;
  email: string;
  name: string;
  role: "admin";
  iat: number;
  exp: number;
}

/**
 * Sign payload with HMAC-SHA256
 */
function signToken(data: SessionPayload): string {
  const secret = getSessionSecret();
  const payloadStr = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");
  return `${payloadStr}.${signature}`;
}

/**
 * Verify HMAC-SHA256 signed token
 */
function verifyToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payloadStr, signature] = parts;
    const secret = getSessionSecret();
    const expectedSignature = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");

    // Timing-safe signature check
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const json = Buffer.from(payloadStr, "base64url").toString("utf-8");
    const payload: SessionPayload = JSON.parse(json);

    // Verify expiration and role
    if (!payload.exp || payload.exp < Date.now() || payload.role !== "admin") {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates active admin session on server side
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const payload = verifyToken(sessionToken);
  if (!payload) {
    return null;
  }

  // Ensure email matches currently configured admin email
  const configuredEmail = getAdminConfiguredEmail();
  if (configuredEmail && payload.email.toLowerCase() !== configuredEmail.toLowerCase()) {
    return null;
  }

  return {
    id: payload.id,
    email: payload.email,
    name: payload.name,
    role: "admin",
  };
}

/**
 * Creates cryptographically signed admin session cookie
 */
export async function createAdminSession(email: string, name: string = "حسين علي"): Promise<void> {
  const cookieStore = cookies();
  const now = Date.now();
  const sessionData: SessionPayload = {
    id: "admin_primary",
    email: email.trim().toLowerCase(),
    name,
    role: "admin",
    iat: now,
    exp: now + 1000 * 60 * 60 * 24 * 7, // 7 days expiration
  };

  const token = signToken(sessionData);

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

/**
 * Destroys admin session cookie
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Get configured admin email with no default leak in production
 */
export function getAdminConfiguredEmail(): string | null {
  const envEmail = process.env.ADMIN_EMAIL;
  if (!envEmail) {
    if (process.env.NODE_ENV === "production") return null;
    return "admin@husseinali.com";
  }
  return envEmail.trim().toLowerCase();
}

/**
 * Verify admin password using timing-safe comparison or PBKDF2 hash
 */
export function verifyAdminCredentials(email: string, passwordInput: string): boolean {
  const adminEmail = getAdminConfiguredEmail();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  // In production, refuse login if neither password nor hash is configured
  if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
    console.error("Authentication rejected: ADMIN_EMAIL and ADMIN_PASSWORD must be configured in environment variables.");
    return false;
  }

  // Email verification (case insensitive)
  if (email.trim().toLowerCase() !== adminEmail) {
    return false;
  }

  // Check 1: If ADMIN_PASSWORD_HASH is set (format: salt$hash using sha256 PBKDF2)
  if (adminPasswordHash && adminPasswordHash.includes("$")) {
    const [salt, storedHash] = adminPasswordHash.split("$");
    const testHash = crypto.pbkdf2Sync(passwordInput, salt, 100000, 32, "sha256").toString("hex");
    const a = Buffer.from(testHash);
    const b = Buffer.from(storedHash);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  // Check 2: Direct timing-safe comparison with ADMIN_PASSWORD
  if (adminPassword) {
    const a = Buffer.from(passwordInput);
    const b = Buffer.from(adminPassword);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  }

  return false;
}
