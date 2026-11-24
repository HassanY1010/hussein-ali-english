"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/types/database";
import CourseCard from "@/components/courses/CourseCard";
import EmptyCoursesState from "@/components/courses/EmptyCoursesState";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HomeCoursesSectionProps {
  allCourses: Course[];
  telegramUrl: string;
}

export default function HomeCoursesSection({
  allCourses,
  telegramUrl,
}: HomeCoursesSectionProps) {
  const { t, dir } = useLanguage();

  const featuredCourse = allCourses.find((c) => c.is_featured) || allCourses[0];
  const regularCourses = allCourses.filter((c) => c.id !== featuredCourse?.id);

  return (
    <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase font-latin tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.homeCourses.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            {t.homeCourses.title}
          </h2>
        </div>

        {allCourses.length > 0 && (
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-ink hover:text-accent transition-colors"
          >
            <span>{t.homeCourses.viewAll(allCourses.length)}</span>
            {dir === "rtl" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        )}
      </div>

      {/* Featured Course Highlight */}
      {featuredCourse && (
        <div className="mb-10">
          <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-3 flex items-center gap-2 font-latin">
            <span>{t.homeCourses.featuredBadge}</span>
            <span className="h-px bg-paper-border flex-1" />
          </div>
          <CourseCard course={featuredCourse} featured />
        </div>
      )}

      {/* Other Courses Grid */}
      {regularCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Empty State when no courses have been published yet */}
      {allCourses.length === 0 && (
        <EmptyCoursesState telegramUrl={telegramUrl} />
      )}
    </section>
  );
}
