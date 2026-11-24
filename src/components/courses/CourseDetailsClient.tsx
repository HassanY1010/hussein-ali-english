"use client";

import React from "react";
import Link from "next/link";
import { Course, Lesson, SiteSettings } from "@/types/database";
import {
  Clock,
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  User,
  Send,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CourseDetailsClientProps {
  course: Course;
  lessons: Lesson[];
  settings: SiteSettings;
}

export default function CourseDetailsClient({
  course,
  lessons,
  settings,
}: CourseDetailsClientProps) {
  const { t, language, dir } = useLanguage();
  const firstLesson = lessons[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink">
          {t.nav.home}
        </Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-ink">
          {t.nav.courses}
        </Link>
        <span>/</span>
        <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-md">
          {course.title}
        </span>
      </nav>

      {/* Course Hero Editorial Grid */}
      <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-8 md:p-10 mb-10 shadow-fine">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Metadata & Narrative */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {course.level && (
                <span className="px-2.5 py-0.5 rounded-sm bg-paper-100 text-ink-soft border border-paper-border font-medium">
                  {language === "en" ? (course.level.name_en || course.level.name_ar) : course.level.name_ar}
                </span>
              )}
              {course.category && (
                <span className="px-2.5 py-0.5 rounded-sm bg-accent-light text-accent border border-accent-border font-medium">
                  {language === "en" ? (course.category.name_en || course.category.name_ar) : course.category.name_ar}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-sm bg-ink text-paper-50 font-semibold font-latin">
                {t.courses.free}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-ink leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-ink-soft leading-relaxed">
              {course.description}
            </p>

            {/* Course Facts */}
            <div className="pt-4 border-t border-paper-border grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-ink-muted">
              <div>
                <span className="block text-ink-soft font-bold mb-0.5">
                  {t.courses.instructor}:
                </span>
                <span className="text-ink font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent" />
                  {language === "en" ? t.instructor.name : (course.instructor_name || settings.instructor_name)}
                </span>
              </div>
              <div>
                <span className="block text-ink-soft font-bold mb-0.5">
                  {language === "en" ? "Lessons Count:" : "عدد الدروس:"}
                </span>
                <span className="text-ink font-semibold font-latin flex items-center gap-1.5">
                  <PlayCircle className="w-3.5 h-3.5 text-accent" />
                  {lessons.length} {t.courses.lessons}
                </span>
              </div>
              <div>
                <span className="block text-ink-soft font-bold mb-0.5">
                  {language === "en" ? "Total Duration:" : "المدة الإجمالية:"}
                </span>
                <span className="text-ink font-semibold font-latin flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  {course.duration_hours > 0 ? `${course.duration_hours} ${t.courses.hours}` : (language === "en" ? "Comprehensive" : "محتوى شامل")}
                </span>
              </div>
            </div>

            {/* Start Learning Action */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {firstLesson ? (
                <Link
                  href={`/courses/${course.slug}/${firstLesson.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-ink text-paper-50 font-bold text-xs sm:text-sm hover:bg-accent transition-all duration-200 shadow-fine"
                >
                  <PlayCircle className="w-4 h-4 shrink-0" />
                  <span>{t.courses.startCourse}</span>
                  {dir === "rtl" ? <ArrowLeft className="w-4 h-4 shrink-0" /> : <ArrowRight className="w-4 h-4 shrink-0" />}
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-paper-100 text-ink-muted text-xs sm:text-sm font-semibold border border-paper-border">
                  <span>{language === "en" ? "Coming Soon: Lessons upload" : "قريباً: رفع ونشر الدروس"}</span>
                </div>
              )}

              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-[#229ED9]/10 text-[#0c72a6] hover:bg-[#229ED9] hover:text-white text-xs font-semibold transition-colors border border-[#229ED9]/30"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>{t.classroom.telegramDiscuss}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Thumbnail */}
          <div className="lg:col-span-5">
            <div className="rounded-sm overflow-hidden border border-paper-border bg-paper-200 aspect-[16/11]">
              {course.thumbnail_url ? (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-muted">
                  <BookOpen className="w-14 h-14 stroke-[1.2]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout: Objectives & Curriculum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Lessons Curriculum List */}
        <div className="lg:col-span-8 space-y-5">
          <div className="border-b border-paper-border pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-accent" />
              <span>{t.courses.courseContent} ({lessons.length} {t.courses.lessons})</span>
            </h2>
          </div>

          {lessons.length > 0 ? (
            <div className="divide-y divide-paper-border border border-paper-border bg-white rounded-sm">
              {lessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.slug}/${lesson.slug}`}
                  className="group p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-paper-50 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-sm bg-paper-100 text-ink font-bold text-xs flex items-center justify-center font-latin shrink-0 border border-paper-border group-hover:bg-accent group-hover:text-white transition-colors">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-ink text-sm sm:text-base group-hover:text-accent transition-colors">
                        {lesson.title}
                      </h3>
                      {lesson.description && (
                        <p className="text-xs text-ink-muted mt-1 line-clamp-2 leading-relaxed">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-1">
                    {lesson.duration_minutes > 0 && (
                      <span className="text-xs text-ink-muted font-latin flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.duration_minutes}m</span>
                      </span>
                    )}
                    {dir === "rtl" ? (
                      <ArrowLeft className="w-4 h-4 text-ink-muted group-hover:text-accent transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-accent transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white border border-paper-border rounded-sm text-ink-muted text-xs sm:text-sm">
              {language === "en" ? "Lessons for this course are currently being uploaded and published." : "دروس هذه الدورة قيد الرفع والنشر حالياً."}
            </div>
          )}
        </div>

        {/* Sidebar: Objectives + Instructor Bio */}
        <div className="lg:col-span-4 space-y-6">
          {/* Objectives */}
          {course.objectives && course.objectives.length > 0 && (
            <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-6 shadow-fine">
              <h3 className="text-sm font-bold text-ink mb-4 pb-2 border-b border-paper-border">
                {t.courses.whatYouWillLearn}
              </h3>
              <ul className="space-y-3 text-xs text-ink-soft">
                {course.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{obj.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor Bio Snippet */}
          <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-6 shadow-fine space-y-3">
            <span className="inline-block text-[11px] font-bold text-accent uppercase font-latin tracking-wider">
              {t.instructor.badge}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-ink shadow-sm border border-accent/40 shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt={language === "en" ? t.instructor.name : settings.instructor_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-ink">
                  {language === "en" ? t.instructor.name : settings.instructor_name}
                </h4>
                <p className="text-[11px] text-ink-muted">
                  {language === "en" ? t.hero.instructorTitle : settings.instructor_title}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed pt-1">
              {language === "en" ? t.instructor.bio : settings.instructor_bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
