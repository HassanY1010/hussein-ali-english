"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdminAction } from "@/lib/actions/auth";
import { Lock, Mail, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t, dir } = useLanguage();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 rounded-sm bg-ink text-paper-50 font-bold text-xs sm:text-sm hover:bg-accent transition-colors disabled:opacity-60 shadow-fine flex items-center justify-center gap-2"
    >
      {pending ? t.admin.login.submitting : t.admin.login.submitButton}
      {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAdminAction, null);
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-paper-100 flex flex-col justify-center items-center p-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full">
        {/* Monogram brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-2xl font-bold mx-auto mb-3 shadow-lifted">
            HA
          </div>
          <h1 className="text-2xl font-black text-ink">
            {t.admin.login.title}
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            {t.admin.login.subtitle}
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
                {t.admin.login.emailLabel}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder={t.admin.login.emailPlaceholder}
                  className="w-full bg-paper-50 border border-paper-border rounded-sm pr-9 pl-3 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent transition-colors ltr-text"
                />
                <Mail className="w-4 h-4 text-ink-muted absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                {t.admin.login.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder={t.admin.login.passwordPlaceholder}
                  className="w-full bg-paper-50 border border-paper-border rounded-sm pr-9 pl-3 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent transition-colors ltr-text"
                />
                <Lock className="w-4 h-4 text-ink-muted absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-ink-muted hover:text-ink font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <span>{t.admin.login.backToSite}</span>
            {dir === "rtl" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
