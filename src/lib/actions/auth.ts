"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function loginAdminAction(prevState: any, formData: FormData) {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!email || !password) {
    return { error: "يرجى إدخال البريد الإلكتروني وكلمة المرور." };
  }

  // 1. Try Supabase Auth if credentials match or are configured
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (!error && data.user) {
        await createAdminSession(data.user.email || email, data.user.user_metadata?.full_name || "حسين علي");
        redirect("/admin");
      }
    } catch (err: any) {
      if (err?.message?.includes("NEXT_REDIRECT")) throw err;
      // If Supabase auth failed, attempt fallback check below
    }
  }

  // 2. Direct verify against admin credentials
  if (verifyAdminCredentials(email, password)) {
    await createAdminSession(email.trim(), "حسين علي");
    redirect("/admin");
  }

  return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." };
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
