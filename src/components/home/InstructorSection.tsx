"use client";

import React from "react";
import { SiteSettings } from "@/types/database";
import { Send, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface InstructorSectionProps {
  settings: SiteSettings;
}

export default function InstructorSection({ settings }: InstructorSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-blue-50/80 border border-blue-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content (in RTL on the right) */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-right">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F2942] leading-snug">
                {language === "en"
                  ? "Practical Mastery Over Rote Memorization"
                  : "التعليم المبني على الإتقان العملي وليس التلقين الجاف."}
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                {settings.instructor_bio ||
                  "أشرفنا لكم بتجربة تعلم مميزة، نوفر لك المحتوى التدريبي في دورات اللغة الإنجليزية وتجربة تعليمية تفاعلية تساعدك على تحقيق أهدافك بعيداً عن التعقيد."}
              </p>

              {/* 2x2 Feature Checkmarks matching reference panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F2942]">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>دورات احترافية في اللغة الإنجليزية</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F2942]">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>تدريبات واختبارات لتقييم مستواك</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F2942]">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>محتوى تفاعلي ومتميز</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F2942]">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>شهادات إتمام في الإنجليزية</span>
                </div>
              </div>
            </div>

            {/* Dark Navy Instructor Card (in RTL on the left) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs bg-[#0B1E3F] text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg shadow-blue-950/20 border border-blue-900/50">
                {/* Monogram Box */}
                <div className="w-20 h-20 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-3xl mx-auto mb-4 shadow-md shadow-blue-500/20">
                  HA
                </div>

                <h3 className="text-xl font-black text-white">
                  {settings.instructor_name}
                </h3>
                <p className="text-xs text-blue-200/80 font-medium mt-1">
                  {settings.instructor_title}
                </p>

                <p className="text-[11px] text-blue-100/60 mt-3">
                  انضم معنا الآن واستفد من مميزات المنصة
                </p>

                <div className="mt-5 pt-4 border-t border-blue-800/60 flex justify-center">
                  <a
                    href={settings.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors font-latin"
                  >
                    <span>{settings.telegram_channel_name}</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
