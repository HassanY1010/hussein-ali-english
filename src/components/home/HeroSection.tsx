"use client";

import React from "react";
import Link from "next/link";
import {
  Send,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SiteSettings, Course } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeroSectionProps {
  settings: SiteSettings;
  featuredCourse?: Course | null;
}

export default function HeroSection({ settings, featuredCourse }: HeroSectionProps) {
  const { language, dir } = useLanguage();

  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Hero Card Matching Top-Left Panel in Reference Design */}
        <div className="relative bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 border border-blue-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm overflow-hidden">
          {/* Decorative Dot Matrix Patterns in Corners */}
          <div className="absolute top-4 right-4 w-28 h-20 dot-pattern opacity-60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-32 h-20 dot-pattern opacity-60 pointer-events-none" />

          {/* Floating Carousel Arrows (Left & Right) */}
          <div className="hidden md:flex absolute inset-y-0 left-4 items-center z-10">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white border border-blue-100 text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-50 hover:scale-105 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:flex absolute inset-y-0 right-4 items-center z-10">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white border border-blue-100 text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-50 hover:scale-105 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Right side (RTL): Course info & Headline */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{featuredCourse ? "الكورس المميز المقترح للبدء" : "أحدث الكورسات التعليمية"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0F2942] leading-[1.25] tracking-tight">
                {featuredCourse?.title || settings.hero_title || "English Grammar Essentials"}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
                {featuredCourse?.short_description ||
                  settings.hero_subtitle ||
                  "أساسيات قواعد اللغة الإنجليزية بطريقة مبسطة وفعالة لتطوير مهاراتك في القراءة والكتابة والتحدث بعيداً عن الحفظ التلقيني."}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                {featuredCourse ? (
                  <Link
                    href={`/courses/${featuredCourse.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A56DB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-500/20 transition-all duration-200"
                  >
                    <span>معرفة المزيد وتفاصيل الدورة</span>
                    {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
                ) : (
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A56DB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-500/20 transition-all duration-200"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>تصفح جميع الكورسات</span>
                  </Link>
                )}

                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm border border-blue-200 transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>انضم لقناة التليغرام</span>
                </a>
              </div>
            </div>

            {/* Left side (RTL): Course Thumbnail / Visual Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[16/11] rounded-2xl overflow-hidden shadow-lg shadow-blue-900/10 border-2 border-white bg-slate-100">
                {featuredCourse?.thumbnail_url ? (
                  <img
                    src={featuredCourse.thumbnail_url}
                    alt={featuredCourse.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-6 text-center">
                    <BookOpen className="w-16 h-16 stroke-[1.5] mb-3 opacity-90" />
                    <span className="font-bold text-base sm:text-lg">
                      {featuredCourse?.title || "English Grammar Essentials"}
                    </span>
                    <span className="text-xs text-blue-100 mt-1">كورس شامل وتطبيقي</span>
                  </div>
                )}

                {/* Free Badge */}
                <div className="absolute top-3 left-3 bg-[#0F2942] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  مجاناً
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-8 relative z-10">
            <span className="w-6 h-2 rounded-full bg-blue-600 transition-all" />
            <span className="w-2 h-2 rounded-full bg-blue-200" />
            <span className="w-2 h-2 rounded-full bg-blue-200" />
            <span className="w-2 h-2 rounded-full bg-blue-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
