"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/types/database";
import CourseActionButtons from "@/components/admin/CourseActionButtons";
import { PlusCircle, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AdminCoursesClientProps {
  courses: Course[];
}

export default function AdminCoursesClient({ courses }: AdminCoursesClientProps) {
  const { t, language } = useLanguage();
  const cp = t.admin.coursesPage;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink">
            {cp.title}
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            {cp.subtitle}
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink hover:bg-accent text-paper-50 font-bold text-xs transition-colors shadow-fine shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{cp.newCourse}</span>
        </Link>
      </div>

      {/* Courses List Table */}
      <div className="bg-white border border-paper-border rounded-sm shadow-fine overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right rtl:text-right ltr:text-left text-xs">
            <thead className="bg-paper-50 text-ink-soft border-b border-paper-border font-bold">
              <tr>
                <th className="py-3 px-4">{cp.thCourse}</th>
                <th className="py-3 px-4">{cp.thLevel}</th>
                <th className="py-3 px-4">{cp.thCategory}</th>
                <th className="py-3 px-4">{cp.thDuration}</th>
                <th className="py-3 px-4">{cp.thLessons}</th>
                <th className="py-3 px-4">{cp.thStatus}</th>
                <th className="py-3 px-4 rtl:text-left ltr:text-right">{cp.thActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-paper-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-ink text-sm">
                      {course.title}
                    </div>
                    <div className="text-[11px] text-ink-muted font-latin ltr-text">
                      /{course.slug}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-ink-soft">
                    {language === "en" ? (course.level?.name_en || course.level?.name_ar || "-") : (course.level?.name_ar || "-")}
                  </td>
                  <td className="py-3.5 px-4 text-ink-soft">
                    {language === "en" ? (course.category?.name_en || course.category?.name_ar || "-") : (course.category?.name_ar || "-")}
                  </td>
                  <td className="py-3.5 px-4 font-latin text-ink-soft">
                    {course.duration_hours > 0 ? `${course.duration_hours}h` : "-"}
                  </td>
                  <td className="py-3.5 px-4 font-latin font-bold text-ink">
                    {course.lessons_count || 0} {t.courses.lessons}
                  </td>
                  <td className="py-3.5 px-4">
                    {course.is_published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                        {cp.publishedForStudents}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[11px]">
                        {cp.draftState}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 rtl:text-left ltr:text-right">
                    <CourseActionButtons
                      courseId={course.id}
                      courseSlug={course.slug}
                      isPublished={course.is_published}
                    />
                  </td>
                </tr>
              ))}

              {courses.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-ink-muted">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-ink-muted/60" />
                    <p className="font-semibold text-xs sm:text-sm text-ink">{t.admin.emptyCourses}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
