"use client";

import { useState, useTransition } from "react";
import { Course, Lesson } from "@/types/database";
import {
  saveLessonAction,
  deleteLessonAction,
  reorderLessonsAction,
} from "@/lib/actions/courses";
import {
  Plus,
  PlayCircle,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Eye,
  ExternalLink,
  Clock,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface LessonManagerProps {
  course: Course;
  initialLessons: Lesson[];
}

export default function LessonManager({ course, initialLessons }: LessonManagerProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Reorder: Move Up / Down
  function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lessons.length) return;

    const reordered = [...lessons];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setLessons(reordered);

    startTransition(async () => {
      const ids = reordered.map((l) => l.id);
      await reorderLessonsAction(course.id, ids);
      setStatusMessage({ type: "success", text: "تم تحديث ترتيب الدروس بنجاح." });
      setTimeout(() => setStatusMessage(null), 3000);
    });
  }

  // Delete
  function handleDeleteLesson(lessonId: string) {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا الدرس نهائياً؟")) {
      startTransition(async () => {
        await deleteLessonAction(lessonId, course.id);
        setLessons((prev) => prev.filter((l) => l.id !== lessonId));
        setStatusMessage({ type: "success", text: "تم حذف الدرس بنجاح." });
        setTimeout(() => setStatusMessage(null), 3000);
      });
    }
  }

  // Handle Form Submit
  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("course_id", course.id);
    if (editingLesson) {
      formData.set("id", editingLesson.id);
    }

    startTransition(async () => {
      const res = await saveLessonAction(null, formData);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({ type: "success", text: "تم حفظ الدرس بنجاح!" });
        setIsAddingNew(false);
        setEditingLesson(null);
        window.location.reload();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Link href="/admin/courses" className="hover:text-ink">
              الكورسات
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">{course.title}</span>
          </div>
          <h1 className="text-2xl font-black text-ink mt-1">
            إدارة دروس الكورس ({lessons.length} دروس)
          </h1>
        </div>

        <button
          onClick={() => {
            setEditingLesson(null);
            setIsAddingNew(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink hover:bg-accent text-white font-bold text-xs transition-colors shadow-fine shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة درس جديد</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-sm text-xs flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Add / Edit Lesson Modal / Form */}
      {(isAddingNew || editingLesson) && (
        <div className="bg-white border-2 border-accent rounded-sm p-6 shadow-lifted">
          <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-4">
            <h3 className="text-base font-bold text-ink flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-accent" />
              <span>{editingLesson ? "تعديل بيانات الدرس" : "إضافة درس جديد للكورس"}</span>
            </h3>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingLesson(null);
              }}
              className="p-1 text-ink-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  عنوان الدرس *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingLesson?.title || ""}
                  required
                  placeholder="مثال: الدرس 1: أساسيات المضارع البسيط واستخدامات s المفرد"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  المعرّف بالرابط (Slug)
                </label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={editingLesson?.slug || ""}
                  placeholder="تلقائي إن تركته فارغاً"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  رابط الفيديو (YouTube / Vimeo / Direct MP4) *
                </label>
                <input
                  type="url"
                  name="video_url"
                  defaultValue={editingLesson?.video_url || ""}
                  required
                  placeholder="https://www.youtube.com/watch?v=... أو رابط مباشر"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  مدة الدرس (بالدقائق)
                </label>
                <input
                  type="number"
                  name="duration_minutes"
                  defaultValue={editingLesson?.duration_minutes || 15}
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-latin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1">
                نبذة سريعة عن الدرس
              </label>
              <textarea
                name="description"
                defaultValue={editingLesson?.description || ""}
                rows={2}
                placeholder="شرح موجز لأهم النقاط التي سيتعلمها الطالب في هذا الدرس..."
                className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1">
                ملاحظات الشرح وقواعد الدرس (تظهر تحت الفيديو للطالب)
              </label>
              <textarea
                name="content_notes"
                defaultValue={editingLesson?.content_notes || ""}
                rows={6}
                placeholder="اكتب هنا ملخص القواعد، الأمثلة التوضيحية، وتنبيهات الأستاذ حسين..."
                className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-sans"
              />
            </div>

            <div className="pt-2 border-t border-paper-border flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingLesson ? editingLesson.is_published : true}
                  className="w-4 h-4 text-accent border-paper-border rounded-sm focus:ring-accent"
                />
                <span className="text-xs font-bold text-ink">نشر الدرس للطلاب</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingLesson(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-paper-100 rounded-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-bold bg-ink hover:bg-accent text-white rounded-sm flex items-center gap-1.5 shadow-fine"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isPending ? "جاري الحفظ..." : "حفظ الدرس"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Lessons List */}
      <div className="bg-white border border-paper-border rounded-sm shadow-fine divide-y divide-paper-border">
        {lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-paper-50/50 transition-colors"
          >
            <div className="flex items-start sm:items-center gap-3">
              {/* Reorder controls */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0 || isPending}
                  className="p-1 rounded-sm hover:bg-paper-200 text-ink-soft disabled:opacity-30"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === lessons.length - 1 || isPending}
                  className="p-1 rounded-sm hover:bg-paper-200 text-ink-soft disabled:opacity-30"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Order number */}
              <span className="w-7 h-7 rounded-sm bg-paper-100 text-ink font-bold text-xs flex items-center justify-center font-latin border border-paper-border shrink-0">
                {idx + 1}
              </span>

              {/* Title & info */}
              <div>
                <h4 className="font-bold text-ink text-sm sm:text-base leading-snug">
                  {lesson.title}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-muted mt-0.5">
                  <span className="font-latin text-accent font-mono truncate max-w-xs">
                    {lesson.video_url}
                  </span>
                  {lesson.duration_minutes > 0 && (
                    <span className="flex items-center gap-1 font-latin">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration_minutes}m</span>
                    </span>
                  )}
                  <span>•</span>
                  {lesson.is_published ? (
                    <span className="text-[#1f5c3f] font-semibold">منشور</span>
                  ) : (
                    <span className="text-amber-700 font-semibold">مسودة</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                href={`/courses/${course.slug}/${lesson.slug}`}
                target="_blank"
                className="p-2 text-ink-muted hover:text-ink hover:bg-paper-100 rounded-sm transition-colors text-xs flex items-center gap-1"
                title="معاينة في مشغل الفيديو"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة</span>
              </Link>

              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingLesson(lesson);
                }}
                className="p-2 text-ink-muted hover:text-ink hover:bg-paper-100 rounded-sm transition-colors text-xs flex items-center gap-1"
                title="تعديل"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>

              <button
                onClick={() => handleDeleteLesson(lesson.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                title="حذف الدرس"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {lessons.length === 0 && (
          <div className="text-center py-16 p-6 text-xs text-ink-muted">
            <PlayCircle className="w-12 h-12 stroke-[1.2] mx-auto mb-2 text-ink-muted/50" />
            <p className="font-semibold text-ink">لا توجد دروس في هذا الكورس بعد</p>
            <p className="mt-1">
              اضغط على "إضافة درس جديد" لإرفاق أول درس وفيديو تعليمي.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
