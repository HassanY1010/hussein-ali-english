"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Course, Lesson, SiteSettings } from "@/types/database";
import VideoPlayer from "./VideoPlayer";
import {
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  Send,
  FileText,
  Download,
  ListOrdered,
  ChevronRight,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface LessonViewerProps {
  course: Course;
  currentLesson: Lesson;
  allLessons: Lesson[];
  settings: SiteSettings;
}

export default function LessonViewer({
  course,
  currentLesson,
  allLessons,
  settings,
}: LessonViewerProps) {
  const { t, language, dir } = useLanguage();
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const storageKey = `ha_progress_${course.id}`;

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setCompletedLessonIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load local progress", e);
    }
  }, [storageKey]);

  // Toggle completion
  const isCompleted = completedLessonIds.includes(currentLesson.id);

  function toggleCompletion() {
    let updated: string[];
    if (isCompleted) {
      updated = completedLessonIds.filter((id) => id !== currentLesson.id);
    } else {
      updated = [...completedLessonIds, currentLesson.id];
    }
    setCompletedLessonIds(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save progress", e);
    }
  }

  // Find index and previous / next
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const progressPercentage =
    allLessons.length > 0
      ? Math.round((completedLessonIds.length / allLessons.length) * 100)
      : 0;

  function copyCurrentLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col">
      {/* Focused Academic Topbar */}
      <header className="bg-white border-b border-paper-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink transition-colors p-1.5 rounded-sm hover:bg-paper-100"
            >
              {dir === "rtl" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <span>{t.classroom.backToCourse}</span>
            </Link>
            <span className="text-paper-darkborder">|</span>
            <span className="text-xs text-ink-muted truncate max-w-[140px] sm:max-w-xs font-medium">
              {course.title}
            </span>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <span className="text-ink-muted">
                {language === "en" ? "Progress: " : "التقدم: "}
                <strong className="text-ink font-latin font-bold">
                  {completedLessonIds.length} / {allLessons.length}
                </strong>
              </span>
              <div className="w-20 sm:w-24 h-2 bg-paper-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-accent font-bold font-latin">{progressPercentage}%</span>
            </div>

            <button
              onClick={copyCurrentLink}
              className="p-2 text-ink-muted hover:text-ink rounded-sm hover:bg-paper-100 transition-colors text-xs flex items-center gap-1"
              title="Share lesson"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {copiedLink ? (language === "en" ? "Copied!" : "تم النسخ!") : (language === "en" ? "Share" : "مشاركة")}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content Area (Video + Details + Notes) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              videoUrl={currentLesson.video_url}
              provider={currentLesson.video_provider}
              title={currentLesson.title}
            />

            {/* Navigation & Completion Bar */}
            <div className="bg-white border border-paper-border rounded-sm p-4 flex flex-wrap items-center justify-between gap-3 shadow-fine">
              <button
                onClick={toggleCompletion}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-sm transition-all duration-200 border ${
                  isCompleted
                    ? "bg-[#1f5c3f]/10 text-[#1f5c3f] border-[#1f5c3f]/30"
                    : "bg-paper-50 hover:bg-paper-100 text-ink-soft border-paper-border"
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#1f5c3f]" />
                    <span>{language === "en" ? "Completed (Click to undo)" : "تم إكمال هذا الدرس (اضغط للإلغاء)"}</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-ink-muted" />
                    <span>{language === "en" ? "Mark as completed" : "تحديد الدرس كمكتمل"}</span>
                  </>
                )}
              </button>

              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                {prevLesson ? (
                  <Link
                    href={`/courses/${course.slug}/${prevLesson.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-sm bg-paper-100 hover:bg-paper-200 text-ink transition-colors"
                  >
                    {dir === "rtl" ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{t.classroom.previousLesson}</span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-sm bg-paper-100 text-ink-muted/50 cursor-not-allowed"
                  >
                    <span>{t.classroom.previousLesson}</span>
                  </button>
                )}

                {nextLesson ? (
                  <Link
                    href={`/courses/${course.slug}/${nextLesson.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-sm bg-ink hover:bg-accent text-paper-50 transition-colors"
                  >
                    <span>{t.classroom.nextLesson}</span>
                    {dir === "rtl" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                ) : (
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-sm bg-accent hover:bg-accent-hover text-white transition-colors"
                  >
                    <span>{language === "en" ? "Complete Course" : "إتمام الكورس والعودة"}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Lesson Editorial Header */}
            <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-7 space-y-4 shadow-fine">
              <div className="flex items-center justify-between gap-4 text-xs text-ink-muted border-b border-paper-border pb-3">
                <span className="font-bold text-accent font-latin">
                  {language === "en" ? "Lesson" : "الدرس"} {currentIndex + 1} / {allLessons.length}
                </span>
                {currentLesson.duration_minutes > 0 && (
                  <span className="font-latin">
                    {currentLesson.duration_minutes} {t.classroom.minutes}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-ink leading-snug">
                {currentLesson.title}
              </h1>

              {currentLesson.description && (
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {currentLesson.description}
                </p>
              )}

              {/* Study Notes & Markdown content */}
              {currentLesson.content_notes && (
                <div className="pt-5 border-t border-paper-border">
                  <h2 className="text-xs sm:text-sm font-bold text-ink mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>{t.classroom.notes}:</span>
                  </h2>
                  <div className="bg-paper-100 p-4 sm:p-5 rounded-sm border border-paper-border text-xs sm:text-sm text-ink leading-relaxed whitespace-pre-wrap font-sans">
                    {currentLesson.content_notes}
                  </div>
                </div>
              )}

              {/* Lesson Downloadable Resources */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="pt-5 border-t border-paper-border">
                  <h3 className="text-xs sm:text-sm font-bold text-ink mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4 text-accent" />
                    <span>{t.classroom.resources}:</span>
                  </h3>
                  <div className="space-y-2">
                    {currentLesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-sm bg-white border border-paper-border hover:border-accent text-xs transition-colors"
                      >
                        <span className="font-semibold text-ink">{res.title}</span>
                        <span className="text-accent font-latin flex items-center gap-1 font-bold">
                          <span>{t.classroom.download}</span>
                          <Download className="w-3 h-3" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Telegram Q&A link */}
              <div className="pt-4 border-t border-paper-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-paper-50 p-4 rounded-sm">
                <span className="text-ink-soft">
                  {language === "en" ? "Have a question regarding this lesson?" : "هل لديك استفسار أو نقطة غير واضحة في هذا الدرس؟"}
                </span>
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#0c72a6] hover:underline shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                  <span>{t.classroom.telegramDiscuss}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Lessons Navigation */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-paper-border rounded-sm p-4 sm:p-5 shadow-fine sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-paper-border mb-3">
                <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-accent" />
                  <span>{t.classroom.curriculum}</span>
                </h3>
                <span className="text-xs text-ink-muted font-latin">
                  {allLessons.length} {t.courses.lessons}
                </span>
              </div>

              {/* Progress Bar (Mobile and Sidebar) */}
              <div className="mb-4 bg-paper-100 p-2.5 rounded-sm border border-paper-border text-xs flex items-center justify-between">
                <span className="text-ink-muted">{t.classroom.courseProgress}:</span>
                <span className="font-bold text-accent font-latin">{progressPercentage}%</span>
              </div>

              {/* Lessons List */}
              <div className="space-y-1.5 max-h-[calc(100vh-250px)] overflow-y-auto pl-1">
                {allLessons.map((l, index) => {
                  const isActive = l.id === currentLesson.id;
                  const isLessonDone = completedLessonIds.includes(l.id);

                  return (
                    <Link
                      key={l.id}
                      href={`/courses/${course.slug}/${l.slug}`}
                      className={`p-3 rounded-sm flex items-start gap-3 transition-colors text-xs ${
                        isActive
                          ? "bg-ink text-paper-50 font-bold"
                          : "hover:bg-paper-100 text-ink-soft"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isLessonDone ? (
                          <CheckCircle
                            className={`w-4 h-4 ${
                              isActive ? "text-accent" : "text-[#1f5c3f]"
                            }`}
                          />
                        ) : (
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-latin font-bold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-paper-200 text-ink-muted"
                            }`}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className={`block truncate leading-snug ${
                            isActive ? "text-white" : "text-ink"
                          }`}
                        >
                          {l.title}
                        </span>
                        {l.duration_minutes > 0 && (
                          <span
                            className={`block text-[11px] font-latin mt-0.5 ${
                              isActive ? "text-paper-300" : "text-ink-muted"
                            }`}
                          >
                            {l.duration_minutes} {t.classroom.minutes}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
