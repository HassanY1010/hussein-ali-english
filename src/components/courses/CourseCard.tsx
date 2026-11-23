"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/types/database";
import { Clock, PlayCircle, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export default function CourseCard({ course, featured = false }: CourseCardProps) {
  const { t, language, dir } = useLanguage();

  return (
    <article
      className={`group bg-white border border-paper-border hover:border-accent/60 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between ${
        featured ? "md:grid md:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-6 md:p-8" : "p-4 sm:p-5"
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden bg-paper-200 rounded-sm ${
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
          <div className="w-full h-full flex items-center justify-center bg-paper-200 text-ink-muted">
            <BookOpen className="w-12 h-12 stroke-[1.2]" />
          </div>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-2">
          {course.is_free && (
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-ink text-paper-50 rounded-sm shadow-fine">
              {t.courses.free}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between ${featured ? "md:col-span-6 py-2" : "flex-1"}`}>
        <div>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
            {course.level && (
              <span className="px-2 py-0.5 rounded-sm bg-paper-100 text-ink-soft border border-paper-border font-medium">
                {language === "en" ? course.level.name_en : course.level.name_ar}
              </span>
            )}
            {course.category && (
              <span className="px-2 py-0.5 rounded-sm bg-accent-light text-accent border border-accent-border font-medium">
                {language === "en" ? course.category.name_en : course.category.name_ar}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-ink group-hover:text-accent transition-colors leading-snug mb-2.5 ${
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2 mb-4">
            {course.short_description}
          </p>

          {/* Objectives in featured view */}
          {featured && course.objectives && course.objectives.length > 0 && (
            <ul className="mb-6 space-y-1.5 text-xs text-ink-soft border-t border-paper-border pt-4">
              {course.objectives.slice(0, 3).map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>{obj.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-paper-border/70 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-ink-muted font-latin">
            {course.lessons_count !== undefined && (
              <span className="flex items-center gap-1.5 font-medium">
                <PlayCircle className="w-3.5 h-3.5 text-ink-soft" />
                <span>{course.lessons_count} {t.courses.lessons}</span>
              </span>
            )}
            {course.duration_hours > 0 && (
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-ink-soft" />
                <span>{course.duration_hours} {t.courses.hours}</span>
              </span>
            )}
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink group-hover:text-accent transition-colors"
          >
            <span>{t.courses.viewCourse}</span>
            {dir === "rtl" ? (
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}
