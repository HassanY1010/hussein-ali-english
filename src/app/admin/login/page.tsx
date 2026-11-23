"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdminAction } from "@/lib/actions/auth";
import { Shield, Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 rounded-sm bg-ink text-paper-50 font-bold text-sm hover:bg-accent transition-colors disabled:opacity-60 shadow-fine flex items-center justify-center gap-2"
    >
      {pending ? "جاري التحقق..." : "تسجيل الدخول إلى لوحة التحكم"}
      <ArrowLeft className="w-4 h-4" />
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAdminAction, null);

  return (
    <div className="min-h-screen bg-paper-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        {/* Monogram brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-2xl font-bold mx-auto mb-3 shadow-lifted">
            HA
          </div>
          <h1 className="text-2xl font-black text-ink">
            لوحة تحكم الأستاذ حسين علي
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            بوابة الإدارة الخاصة بمنصة تعليم اللغة الإنجليزية
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-paper-border rounded-sm p-6 sm:p-8 shadow-fine">
          {state?.error && (
            <div className="mb-6 p-3 rounded-sm bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                البريد الإلكتروني للإدارة
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  defaultValue="admin@husseinali.com"
                  required
                  placeholder="admin@husseinali.com"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm pr-9 pl-3 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent transition-colors ltr-text"
                />
                <Mail className="w-4 h-4 text-ink-muted absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  defaultValue="HusseinAli2026!"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm pr-9 pl-3 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent transition-colors ltr-text"
                />
                <Lock className="w-4 h-4 text-ink-muted absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>

          {/* Credentials hint for administrator */}
          <div className="mt-6 pt-4 border-t border-paper-border text-[11px] text-ink-muted leading-relaxed bg-paper-50 p-3 rounded-sm">
            <span className="font-bold text-ink block mb-0.5">بيانات الدخول الافتراضية للمدرس:</span>
            <span className="block font-latin">Email: admin@husseinali.com</span>
            <span className="block font-latin">Password: HusseinAli2026!</span>
            <span className="block text-[10px] text-ink-muted mt-1">
              (يمكن تخصيصها عبر متغيرات البيئة ADMIN_EMAIL و ADMIN_PASSWORD أو Supabase Auth)
            </span>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-ink-muted hover:text-ink font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <span>العودة للموقع الرئيسي (hussein-ali-english.onrender.com)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
