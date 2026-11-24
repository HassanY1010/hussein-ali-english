"use client";

import React from "react";
import { Course, Category, Level } from "@/types/database";
import CourseCard from "@/components/courses/CourseCard";
import CoursesFilterBar from "@/components/courses/CoursesFilterBar";
import EmptyCoursesState from "@/components/courses/EmptyCoursesState";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CoursesPageClientProps {
  categories: Category[];
  levels: Level[];
  courses: Course[];
  searchParams: {
    category?: string;
    level?: string;
    q?: string;
  };
  telegramUrl: string;
}

export default function CoursesPageClient({
  categories,
  levels,
  courses,
  searchParams,
  telegramUrl,
}: CoursesPageClientProps) {
  const { t, language } = useLanguage();
  const hasFilterActive = Boolean(searchParams.category || searchParams.level || searchParams.q);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-accent uppercase font-latin tracking-wider">
          {t.courses.badge}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-ink mt-1">
          {t.courses.title}
        </h1>
        <p className="text-xs text-sm text-ink-muted mt-2 max-w-2xl leading-relaxed">
          {t.courses.subtitle}
        </p>
      </div>

      {/* Filter Bar */}
      <CoursesFilterBar
        categories={categories}
        levels={levels}
        initialCategory={searchParams.category}
        initialLevel={searchParams.level}
        initialSearch={searchParams.q}
      />

      {/* Results count */}
      {courses.length > 0 && (
        <div className="mb-6 flex items-center justify-between text-xs text-ink-muted">
          <span>
            {language === "en" ? (
              <>Showing <strong className="text-ink font-latin">{courses.length}</strong> available courses</>
            ) : (
              <>عرض <strong className="text-ink font-latin">{courses.length}</strong> كورس متاح</>
            )}
          </span>
          {searchParams.q && (
            <span>
              {language === "en" ? `Search results for: "${searchParams.q}"` : `نتائج البحث عن: "${searchParams.q}"`}
            </span>
          )}
        </div>
      )}

      {/* Course Grid or Empty State */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : hasFilterActive ? (
        <div className="text-center py-16 bg-white border border-paper-border rounded-sm p-8 max-w-md mx-auto">
          <HelpCircle className="w-12 h-12 text-ink-muted mx-auto mb-3 stroke-[1.2]" />
          <h3 className="text-base font-bold text-ink">
            {language === "en" ? "No courses match your filter criteria" : "لم نتمكن من إيجاد دورات تطابق خياراتك"}
          </h3>
          <p className="text-xs text-ink-muted mt-2">
            {language === "en"
              ? "Try resetting or changing your filters to search all courses."
              : "جرب إزالة أو تغيير خيارات التصفية للبحث في كافة الدورات."}
          </p>
        </div>
      ) : (
        <EmptyCoursesState telegramUrl={telegramUrl} />
      )}
    </div>
  );
}
