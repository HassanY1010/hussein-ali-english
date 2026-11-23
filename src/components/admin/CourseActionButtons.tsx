"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deleteCourseAction, toggleCoursePublishAction } from "@/lib/actions/courses";
import { Trash2, Edit3, PlayCircle, Eye, EyeOff } from "lucide-react";

interface ActionButtonsProps {
  courseId: string;
  courseSlug: string;
  isPublished: boolean;
}

export default function CourseActionButtons({
  courseId,
  courseSlug,
  isPublished,
}: ActionButtonsProps) {
  const [isPending, startTransition] = useTransition();

  function handleTogglePublish() {
    startTransition(async () => {
      await toggleCoursePublishAction(courseId, isPublished);
    });
  }

  function handleDelete() {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا الكورس وجميع دروسه نهائياً؟")) {
      startTransition(async () => {
        await deleteCourseAction(courseId);
      });
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <Link
        href={`/admin/courses/${courseId}/lessons`}
        className="px-2.5 py-1 text-xs font-semibold rounded-sm bg-paper-100 hover:bg-paper-200 text-ink transition-colors flex items-center gap-1"
        title="إدارة دروس هذا الكورس"
      >
        <PlayCircle className="w-3.5 h-3.5 text-accent" />
        <span>الدروس</span>
      </Link>

      <button
        onClick={handleTogglePublish}
        disabled={isPending}
        className={`px-2.5 py-1 text-xs font-semibold rounded-sm transition-colors flex items-center gap-1 border ${
          isPublished
            ? "bg-[#1f5c3f]/10 text-[#1f5c3f] border-[#1f5c3f]/20 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
            : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-green-50 hover:text-green-800"
        }`}
        title={isPublished ? "إلغاء النشر (تحويل لمسودة)" : "نشر الكورس للطلاب"}
      >
        {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        <span>{isPublished ? "منشور" : "مسودة"}</span>
      </button>

      <Link
        href={`/admin/courses/${courseId}/edit`}
        className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper-100 rounded-sm transition-colors"
        title="تعديل بيانات الكورس"
      >
        <Edit3 className="w-4 h-4" />
      </Link>

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
        title="حذف الكورس نهائياً"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
