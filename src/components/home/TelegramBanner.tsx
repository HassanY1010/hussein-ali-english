"use client";

import React from "react";
import { Send, ArrowUpRight, Laptop } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TelegramBannerProps {
  settings: SiteSettings;
}

export default function TelegramBanner({ settings }: TelegramBannerProps) {
  const { language } = useLanguage();

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#071739] via-[#0D2A5E] to-[#071739] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-900/60">
          {/* Subtle curved background overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Graphic on the side (in RTL left side) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center justify-center">
              <div className="relative">
                {/* Glowing Circle with Telegram Logo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#0088cc] to-[#29b6f6] shadow-xl shadow-cyan-500/30 flex items-center justify-center border-4 border-white/20 animate-pulse">
                  <Send className="w-12 h-12 text-white -rotate-12 translate-x-1 -translate-y-1" />
                </div>
              </div>

              {/* Telegram handle badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-latin">
                <Send className="w-3 h-3" />
                <span>{settings.telegram_channel_name}</span>
              </div>
            </div>

            {/* Content & Headline (in RTL right side) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 sm:space-y-4 text-right">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
                {language === "en"
                  ? "Join the Telegram Channel for Daily Quizzes and Lessons"
                  : "انضم لقناة التليغرام لمتابعة الدروس والاختبارات اليومية"}
              </h2>

              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-xl">
                {language === "en"
                  ? "Interactive exercises, error correction, practical conversational vocabulary and instant notifications with every new lesson."
                  : "خدماتنا في منصة الكورسات التعليمية تتيح لك متابعة الدروس والاختبارات بشكل دوري وتعزيز مهاراتك اللغوية بسهولة."}
              </p>

              <div className="pt-2">
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#1A56DB] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === "en" ? "Follow Us on Telegram" : "تابعنا على Telegram"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
