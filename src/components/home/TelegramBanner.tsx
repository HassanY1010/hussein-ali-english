import { Send, ArrowUpRight, MessageCircle, Bell } from "lucide-react";
import { SiteSettings } from "@/types/database";

interface TelegramBannerProps {
  settings: SiteSettings;
}

export default function TelegramBanner({ settings }: TelegramBannerProps) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-ink text-paper-50 rounded-sm p-8 sm:p-12 border border-ink-light">
          {/* Subtle accent border on top */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-[#229ED9]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-[#54c4ff] text-xs font-semibold">
                <Bell className="w-3.5 h-3.5" />
                <span>مجتمع الطلاب الرسمي للأستاذ حسين علي</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                انضم لقناة التلغرام لمتابعة الدروس والاختبارات اليومية
              </h2>

              <p className="text-sm text-paper-200 leading-relaxed max-w-2xl">
                نشارك على القناة تمارينات تفاعلية سريعة، تصحيح الأخطاء الشائعة، مفردات الاستخدام اليومي، وإشعارات فورية بكل درس جديد يضاف إلى المنصة.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3">
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-sm bg-[#229ED9] hover:bg-[#1b8bc2] text-white font-bold text-sm transition-all duration-200 shadow-fine"
              >
                <Send className="w-4 h-4" />
                <span>تابعني على Telegram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-paper-300 font-latin">
                القناة: {settings.telegram_channel_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
