"use client";

import React from "react";
import { BookOpen, Send, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface EmptyCoursesStateProps {
  telegramUrl?: string;
}

export default function EmptyCoursesState({
  telegramUrl = "https://t.me/gccxic",
}: EmptyCoursesStateProps) {
  const { t } = useLanguage();

  return (
    <div className="text-center py-16 px-6 bg-white border border-paper-border rounded-sm shadow-fine max-w-2xl mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-paper-100 border border-paper-border flex items-center justify-center mx-auto mb-5 text-accent">
        <BookOpen className="w-8 h-8" aria-hidden="true" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent-light text-accent text-xs font-bold font-latin mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Hussein Ali English Academy</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2">
        {t.courses.emptyTitle}
      </h3>

      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mx-auto mb-6">
        {t.courses.emptyDescription}
      </p>

      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#229ED9] hover:bg-[#1c8ec4] text-white text-xs sm:text-sm font-semibold transition-all shadow-fine"
      >
        <Send className="w-4 h-4" />
        <span>{t.hero.telegramChannel}</span>
      </a>
    </div>
  );
}
