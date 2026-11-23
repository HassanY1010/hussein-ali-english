import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const ADMIN_COOKIE_NAME = "ha_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "hussein-ali-academy-secure-key-2026";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

export async function getAdminSession(): Promise<AdminUser | null> {
  // 1. Try Supabase Auth first
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && user.email) {
        // Check profile role or email match
        const configuredAdminEmail = process.env.ADMIN_EMAIL || "admin@husseinali.com";
        if (user.email.toLowerCase() === configuredAdminEmail.toLowerCase()) {
          return {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || "حسين علي",
            role: "admin",
          };
        }
      }
    } catch {
      // fallback
    }
  }

  // 2. Check secure admin cookie session
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (sessionToken) {
    try {
      const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded);
      if (parsed.exp && parsed.exp > Date.now() && parsed.role === "admin") {
        return {
          id: parsed.id || "admin_primary",
          email: parsed.email,
          name: parsed.name || "حسين علي",
          role: "admin",
        };
      }
    } catch {
      // invalid token
    }
  }

  return null;
}

export async function createAdminSession(email: string, name: string = "حسين علي"): Promise<void> {
  const cookieStore = cookies();
  const sessionData = {
    id: "admin_primary",
    email,
    name,
    role: "admin",
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  const token = Buffer.from(JSON.stringify(sessionData)).toString("base64");

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {}
  }
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@husseinali.com").trim().toLowerCase();
  const envAdminPassword = (process.env.ADMIN_PASSWORD || "HusseinAli2026!").trim();

  return (
    email.trim().toLowerCase() === envAdminEmail &&
    password === envAdminPassword
  );
}
