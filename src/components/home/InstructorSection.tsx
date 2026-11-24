"use client";

import React from "react";
import { SiteSettings } from "@/types/database";
import { Send, CheckCircle, GraduationCap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface InstructorSectionProps {
  settings: SiteSettings;
}

export default function InstructorSection({ settings }: InstructorSectionProps) {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-20 border-b border-paper-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-paper-100 border border-paper-border rounded-sm p-6 sm:p-10 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Visual Monogram & Identity */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-4xl sm:text-5xl font-bold shadow-lifted mb-4 border-2 border-accent shrink-0">
                HA
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                {settings.instructor_name}
              </h3>
              <p className="text-xs text-ink-muted mt-1 font-medium">
                {language === "en" ? t.hero.instructorTitle : settings.instructor_title}
              </p>
              <div className="mt-4 pt-4 border-t border-paper-border w-full flex justify-center">
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0c72a6] hover:underline font-latin"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{settings.telegram_channel_name}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Editorial Content & Bio */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase font-latin tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>{t.instructor.badge}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-ink leading-snug">
                {language === "en"
                  ? "Practical Mastery Over Rote Memorization"
                  : "التعليم المبني على الإتقان العملي وليس التلقين الجاف"}
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-ink-soft leading-relaxed">
                {settings.instructor_bio}
              </p>

              {/* Message block */}
              <div className="p-4 bg-white rounded-sm border-r-4 border-accent text-xs sm:text-sm text-ink-soft italic leading-relaxed">
                "{language === "en" ? t.instructor.quote : settings.instructor_message}"
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>{language === "en" ? "Deconstruct subtle differences between similar phrases" : "تفكيك الفروق الدقيقة بين التراكيب المتشابهة"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>{language === "en" ? "Emphasis on authentic phonetics & connected speech" : "التركيز على نطق الأصوات والوصل الصوتي الطبيعي"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>{language === "en" ? "Curricula tailored for students & professionals" : "مناهج مناسبة للطلاب في كافة المراحل الدراسية والمهنية"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>{language === "en" ? "Direct answers and advice on Telegram" : "ردود مباشرة وتوجيهات مستمرة عبر التلغرام"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
