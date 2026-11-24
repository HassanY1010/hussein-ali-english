"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/types/database";
import { Clock, PlayCircle, BookOpen, ArrowLeft, ArrowRight, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export default function CourseCard({ course, featured = false }: CourseCardProps) {
  const { t, language, dir } = useLanguage();

  return (
    <article
      className={`group bg-white border border-blue-100/80 hover:border-blue-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between ${
        featured ? "md:grid md:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-6 md:p-8" : "p-4 sm:p-5"
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden rounded-xl bg-slate-100 ${
          featured ? "md:col-span-6 aspect-[16/10]" : "aspect-[16/10] mb-4"
        }`}
      >
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
            <BookOpen className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}

        {/* Free Tag Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {course.is_free && (
            <span className="px-3 py-1 text-xs font-bold bg-[#0F2942] text-white rounded-full shadow-md">
              {t.courses.free}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between ${featured ? "md:col-span-6 py-2" : "flex-1"} text-right`}>
        <div>
          {/* Badges: Level & Certificate matching reference design */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
            {course.level && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 font-bold">
                المستوى : {language === "en" ? course.level.name_en : course.level.name_ar}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-600" />
              <span>شهادة إتمام</span>
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-black text-[#0F2942] group-hover:text-blue-600 transition-colors leading-snug mb-2 ${
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
            {course.short_description}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
          {/* Action Link with blue arrow */}
          <Link
            href={`/courses/${course.slug}`}
            className="text-xs font-bold text-blue-600 group-hover:text-blue-800 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>عرض تفاصيل الدورة</span>
            {dir === "rtl" ? (
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            )}
          </Link>

          {/* Metadata: Duration & Lessons */}
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            {course.duration_hours > 0 && (
              <span className="flex items-center gap-1 font-latin">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{course.duration_hours} ساعات</span>
              </span>
            )}
            {course.lessons_count !== undefined && (
              <span className="flex items-center gap-1 font-latin">
                <PlayCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>{course.lessons_count} دروس</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
