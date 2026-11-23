"use client";

import { useFormState, useFormStatus } from "react-dom";
import { SiteSettings } from "@/types/database";
import { saveSiteSettingsAction } from "@/lib/actions/courses";
import { Save, CheckCircle2, AlertCircle, Send, Globe, User, Mail } from "lucide-react";

interface SettingsFormProps {
  settings: SiteSettings;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-ink text-paper-50 font-bold text-xs hover:bg-accent transition-colors disabled:opacity-50 shadow-fine"
    >
      <Save className="w-4 h-4" />
      <span>{pending ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
    </button>
  );
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [state, formAction] = useFormState(saveSiteSettingsAction, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="p-4 rounded-sm bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* 1. Identity & Teacher Profile */}
      <div className="bg-white border border-paper-border rounded-sm p-6 sm:p-8 space-y-6 shadow-fine">
        <div className="border-b border-paper-border pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-accent" />
          <h2 className="text-base font-bold text-ink">
            بيانات المدرس والهوية الشخصية
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              اسم المدرس *
            </label>
            <input
              type="text"
              name="instructor_name"
              defaultValue={settings.instructor_name}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              الصفة / اللقب المهني *
            </label>
            <input
              type="text"
              name="instructor_title"
              defaultValue={settings.instructor_title}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            نبذة تعريفية عن المدرس (تظهر في قسم "عن المدرس") *
          </label>
          <textarea
            name="instructor_bio"
            defaultValue={settings.instructor_bio}
            rows={3}
            required
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            رسالة المدرس للطلاب (اقتباس ملهم بالصفحة الرئيسية)
          </label>
          <textarea
            name="instructor_message"
            defaultValue={settings.instructor_message}
            rows={2}
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
          />
        </div>
      </div>

      {/* 2. Platform Headings & Hero */}
      <div className="bg-white border border-paper-border rounded-sm p-6 sm:p-8 space-y-6 shadow-fine">
        <div className="border-b border-paper-border pb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          <h2 className="text-base font-bold text-ink">
            واجهة الصفحة الرئيسية والـ Hero Section
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              اسم المنصة بالعربية
            </label>
            <input
              type="text"
              name="site_name"
              defaultValue={settings.site_name}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              اسم المنصة بالإنجليزية
            </label>
            <input
              type="text"
              name="site_name_en"
              defaultValue={settings.site_name_en}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            العنوان الرئيسي (Hero Title) *
          </label>
          <input
            type="text"
            name="hero_title"
            defaultValue={settings.hero_title}
            required
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            الوصف التعريفي (Hero Subtitle) *
          </label>
          <textarea
            name="hero_subtitle"
            defaultValue={settings.hero_subtitle}
            rows={2}
            required
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
          />
        </div>
      </div>

      {/* 3. Telegram & Contact */}
      <div className="bg-white border border-paper-border rounded-sm p-6 sm:p-8 space-y-6 shadow-fine">
        <div className="border-b border-paper-border pb-3 flex items-center gap-2">
          <Send className="w-5 h-5 text-[#229ED9]" />
          <h2 className="text-base font-bold text-ink">
            إعدادات قناة Telegram والتواصل
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              رابط قناة Telegram الرسمي *
            </label>
            <input
              type="url"
              name="telegram_url"
              defaultValue={settings.telegram_url}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              معرّف القناة (للعرض)
            </label>
            <input
              type="text"
              name="telegram_channel_name"
              defaultValue={settings.telegram_channel_name}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              البريد الإلكتروني للتواصل
            </label>
            <input
              type="email"
              name="contact_email"
              defaultValue={settings.contact_email}
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              نص حقوق الملكية في الـ Footer
            </label>
            <input
              type="text"
              name="footer_text"
              defaultValue={settings.footer_text}
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
