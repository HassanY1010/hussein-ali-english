"use client";

import React from "react";
import Link from "next/link";
import { Level } from "@/types/database";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface LevelsSectionProps {
  levels: Level[];
}

export default function LevelsSection({ levels }: LevelsSectionProps) {
  const { t, language, dir } = useLanguage();

  return (
    <section id="levels" className="py-14 sm:py-20 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-right">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2942]">
              مستويات مصممة لتنقلك من البداية للاحتراف
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
              اختر المستوى المناسب لك وابدأ رحلتك في تعلم اللغة الإنجليزية بسهولة واحترافية.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>المستوى : جميع المستويات</span>
            {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Levels Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {levels.map((level, idx) => (
            <div
              key={level.id}
              className="bg-white border border-blue-100/80 hover:border-blue-400 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group text-right"
            >
              <div>
                {/* Top: index and Level badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-black flex items-center justify-center font-latin border border-blue-100">
                    {idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100/70 text-blue-700 text-[11px] font-bold font-latin">
                    Level 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-bold text-[#0F2942] text-base mb-1 group-hover:text-blue-600 transition-colors">
                  {language === "en" ? level.name_en : level.name_ar}
                </h3>
                <span className="block text-[11px] text-slate-400 font-latin mb-3 ltr-text">
                  {language === "en" ? level.name_ar : level.name_en}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {level.description || "بناء المهارات اللغوية والتطبيقية لهذه المرحلة."}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100">
                <Link
                  href={`/courses?level=${level.slug}`}
                  className="text-xs font-bold text-blue-600 group-hover:text-blue-800 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>استعرض دورات المستوى</span>
                  {dir === "rtl" ? (
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
