"use client";

import React from "react";
import Link from "next/link";
import { Send, ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const { t, language, dir } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20 border-b border-paper-border">
      {/* Editorial backdrop accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-paper-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-light/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Academic badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-100 border border-paper-border text-xs text-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span className="font-medium">{t.hero.badge}</span>
              <span className="text-paper-darkborder">|</span>
              <span className="font-latin text-ink-muted">Hussein Ali Academy</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-ink leading-[1.25] tracking-tight">
              {language === "en" ? "Learn English with Structure, Logic & Real Fluency" : settings.hero_title}
            </h1>

            {/* Subtitle / Philosophy */}
            <p className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-xl">
              {language === "en" ? t.hero.subtitle : settings.hero_subtitle}
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>{language === "en" ? "Real-world practical examples & usage" : "شروحات تطبيقية بأمثلة من الحياة اليومية"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>{language === "en" ? "Deconstruct grammar logically without memorization" : "تفكيك القواعد بأسلوب منطقي بدون تعقيد"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>{language === "en" ? "Completely free open access courses" : "كافة الكورسات والدروس متاحة مجاناً"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>{language === "en" ? "Direct follow-up & community on Telegram" : "متابعة وتحديثات دورية على التلغرام"}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-ink text-paper-50 font-semibold text-xs sm:text-sm hover:bg-accent transition-all duration-200 shadow-fine"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>{t.hero.exploreCourses}</span>
                {dir === "rtl" ? <ArrowLeft className="w-4 h-4 shrink-0" /> : <ArrowRight className="w-4 h-4 shrink-0" />}
              </Link>

              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#229ED9]/10 text-[#0b6a9c] hover:bg-[#229ED9] hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 border border-[#229ED9]/30"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{t.hero.telegramChannel}</span>
              </a>
            </div>
          </div>

          {/* Teacher Academic Panel */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border border-paper-border rounded-sm p-6 sm:p-8 shadow-fine">
              <div className="absolute top-0 right-0 left-0 h-1 bg-accent rounded-t-sm" />

              <div className="flex items-start justify-between pb-4 border-b border-paper-border">
                <div>
                  <span className="text-xs font-bold text-accent uppercase font-latin tracking-wider">
                    {t.hero.instructorCard}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
                    {settings.instructor_name}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {language === "en" ? t.hero.instructorTitle : settings.instructor_title}
                  </p>
                </div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-xl sm:text-2xl font-bold shrink-0">
                  HA
                </div>
              </div>

              <div className="py-4 space-y-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                <p className="italic bg-paper-100 p-3 rounded-sm border-r-2 border-accent">
                  "{language === "en" ? t.instructor.quote : settings.instructor_message}"
                </p>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {settings.instructor_bio}
                </p>
              </div>

              <div className="pt-3 border-t border-paper-border flex flex-wrap items-center justify-between text-xs gap-2">
                <span className="text-ink-muted">{t.hero.directSupport}</span>
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0b6a9c] hover:underline font-latin ltr-text flex items-center gap-1"
                >
                  <Send className="w-3 h-3 text-[#229ED9] shrink-0" />
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
