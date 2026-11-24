"use client";

import React from "react";
import { SiteSettings } from "@/types/database";
import { Send, CheckCircle2, GraduationCap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface InstructorSectionProps {
  settings: SiteSettings;
}

export default function InstructorSection({ settings }: InstructorSectionProps) {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 border-b border-paper-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white border border-paper-border/80 rounded-2xl p-6 sm:p-10 md:p-12 shadow-lifted overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Subtle top accent gradient combining Royal Gold, Muted Honey, and Bronze */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#8C7853]" />

          {/* Subtle brand emblem watermark */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full overflow-hidden opacity-[0.03] pointer-events-none -z-0">
            <img src="/images/logo.jpg" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Visual Monogram & Identity Card (in RTL on the right) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-paper-50 rounded-xl border border-paper-border/60 shadow-xs">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-ink shadow-md shadow-ink/10 mb-4 border-2 border-accent/40 shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt={settings.instructor_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                {settings.instructor_name}
              </h3>
              <p className="text-xs text-accent font-bold mt-1">
                {language === "en" ? t.hero.instructorTitle : settings.instructor_title}
              </p>

              <div className="mt-4 pt-4 border-t border-paper-border/80 w-full flex justify-center">
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#229ED9]/10 hover:bg-[#229ED9] text-[#0c72a6] hover:text-white font-bold text-xs font-latin ltr-text transition-all duration-200 border border-[#229ED9]/25 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>{settings.telegram_channel_name}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Editorial Content & Bio (in RTL on the left) */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>{t.instructor.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-ink leading-tight tracking-tight">
                {language === "en"
                  ? "Practical Mastery Over Rote Memorization"
                  : "التعليم المبني على الإتقان العملي وليس التلقين الجاف"}
              </h2>

              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {settings.instructor_bio}
              </p>

              {/* Message block */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-paper-100 to-accent-light/40 rounded-xl border-r-4 border-accent text-xs sm:text-sm text-ink-soft italic leading-relaxed shadow-xs">
                "{language === "en" ? t.instructor.quote : settings.instructor_message}"
              </div>

              {/* Highlights 2x2 Grid with clean cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-ink-soft">
                <div className="p-3 bg-paper-50 hover:bg-paper-100/70 border border-paper-border/70 rounded-lg flex items-center gap-2.5 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">
                    {language === "en" ? "Deconstruct subtle differences between similar phrases" : "تفكيك الفروق الدقيقة بين التراكيب المتشابهة"}
                  </span>
                </div>

                <div className="p-3 bg-paper-50 hover:bg-paper-100/70 border border-paper-border/70 rounded-lg flex items-center gap-2.5 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">
                    {language === "en" ? "Emphasis on authentic phonetics & connected speech" : "التركيز على نطق الأصوات والوصل الصوتي الطبيعي"}
                  </span>
                </div>

                <div className="p-3 bg-paper-50 hover:bg-paper-100/70 border border-paper-border/70 rounded-lg flex items-center gap-2.5 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">
                    {language === "en" ? "Curricula tailored for students & professionals" : "مناهج مناسبة للطلاب في كافة المراحل الدراسية والمهنية"}
                  </span>
                </div>

                <div className="p-3 bg-paper-50 hover:bg-paper-100/70 border border-paper-border/70 rounded-lg flex items-center gap-2.5 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">
                    {language === "en" ? "Direct answers and advice on Telegram" : "ردود مباشرة وتوجيهات مستمرة عبر التلغرام"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
