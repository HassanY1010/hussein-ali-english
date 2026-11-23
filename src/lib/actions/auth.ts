"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth/session";
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from "@/lib/auth/rate-limit";
import { headers } from "next/headers";

export async function loginAdminAction(prevState: any, formData: FormData) {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  // Get client identifier (IP or forwarded IP)
  const headerList = headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "client_ip";
  const rateLimitKey = `${clientIp}_${email.trim().toLowerCase()}`;

  // 1. Check Rate Limit / Brute Force
  const rateLimit = checkRateLimit(rateLimitKey);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfterSeconds || 60) / 60);
    return {
      error: `تم قفل محاولات الدخول مؤقتاً لحماية الحساب بعد تكرار إدخال كلمة مرور خاطئة. يرجى المحاولة بعد ${minutes} دقيقة.`,
    };
  }

  if (!email || !password) {
    return { error: "يرجى إدخال البريد الإلكتروني وكلمة المرور." };
  }

  // 2. Verify Credentials
  const isValid = verifyAdminCredentials(email, password);

  if (!isValid) {
    const attemptResult = recordFailedAttempt(rateLimitKey);
    if (attemptResult.blocked) {
      return {
        error: "تم استنفاد الحد الأقصى للمحاولات (5 محاولات). تم تجميد تسجيل الدخول مؤقتاً لمدة 15 دقيقة لدواعي الأمان.",
      };
    }
    return { error: "بيانات الدخول غير صحيحة. يرجى التحقق من البريد وكلمة المرور." };
  }

  // 3. Success: Reset rate limiter and create signed session
  resetRateLimit(rateLimitKey);
  await createAdminSession(email.trim(), "حسين علي");
  redirect("/admin");
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
