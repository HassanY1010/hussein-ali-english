import Link from "next/link";
import { Send, ArrowLeft, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { SiteSettings } from "@/types/database";

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-paper-border">
      {/* Editorial backdrop accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-paper-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-light/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Academic badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-100 border border-paper-border text-xs text-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-medium">منهجية مبنية للفهم والاستخدام الواقعي</span>
              <span className="text-paper-darkborder">|</span>
              <span className="font-latin text-ink-muted">Hussein Ali Academy</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-[1.2] tracking-tight">
              {settings.hero_title}
            </h1>

            {/* Subtitle / Philosophy */}
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              {settings.hero_subtitle}
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>شروحات تطبيقية بأمثلة من الحياة اليومية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>تفكيك القواعد بأسلوب منطقي بدون تعقيد</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>كافة الكورسات والدروس متاحة مجاناً</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>متابعة وتحديثات دورية على التلغرام</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-ink text-paper-50 font-semibold text-sm hover:bg-accent transition-all duration-200 shadow-fine"
              >
                <BookOpen className="w-4 h-4" />
                <span>استكشف الكورسات المتاحة</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#229ED9]/10 text-[#0b6a9c] hover:bg-[#229ED9] hover:text-white font-semibold text-sm transition-all duration-200 border border-[#229ED9]/30"
              >
                <Send className="w-4 h-4" />
                <span>تابعني على Telegram</span>
              </a>
            </div>
          </div>

          {/* Teacher Academic Panel (Human-crafted, not a generic fake photo) */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border border-paper-border rounded-sm p-6 sm:p-8 shadow-fine">
              <div className="absolute top-0 right-0 left-0 h-1 bg-accent rounded-t-sm" />

              <div className="flex items-start justify-between pb-4 border-b border-paper-border">
                <div>
                  <span className="text-xs font-bold text-accent uppercase font-latin tracking-wider">
                    المدرس المشرف
                  </span>
                  <h3 className="text-xl font-bold text-ink mt-0.5">
                    {settings.instructor_name}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {settings.instructor_title}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-2xl font-bold">
                  HA
                </div>
              </div>

              <div className="py-4 space-y-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                <p className="italic bg-paper-100 p-3 rounded-sm border-r-2 border-accent">
                  "{settings.instructor_message}"
                </p>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {settings.instructor_bio}
                </p>
              </div>

              <div className="pt-4 border-t border-paper-border flex items-center justify-between text-xs">
                <span className="text-ink-muted">القناة التعليمية المباشرة:</span>
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0b6a9c] hover:underline font-latin ltr-text flex items-center gap-1"
                >
                  <Send className="w-3 h-3 text-[#229ED9]" />
                  <span>{settings.telegram_channel_name}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
