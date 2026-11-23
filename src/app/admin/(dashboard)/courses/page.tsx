import Link from "next/link";
import { getCourses } from "@/lib/data/repository";
import CourseActionButtons from "@/components/admin/CourseActionButtons";
import { PlusCircle, BookOpen, Layers, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink">
            إدارة الكورسات التعليمية
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            إضافة كورس جديد، تعديل الدروس، النشر، وتحديد المستويات والتصنيفات.
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink hover:bg-accent text-paper-50 font-bold text-xs transition-colors shadow-fine shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة كورس جديد</span>
        </Link>
      </div>

      {/* Courses List Table */}
      <div className="bg-white border border-paper-border rounded-sm shadow-fine overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-paper-50 text-ink-soft border-b border-paper-border font-bold">
              <tr>
                <th className="py-3 px-4">الكورس</th>
                <th className="py-3 px-4">المستوى</th>
                <th className="py-3 px-4">التصنيف</th>
                <th className="py-3 px-4">المدة</th>
                <th className="py-3 px-4">الدروس</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-left">إجراءات</th>
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
                    {course.level?.name_ar || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-accent font-medium">
                    {course.category?.name_ar || "-"}
                  </td>
                  <td className="py-3.5 px-4 font-latin text-ink-soft">
                    {course.duration_hours > 0 ? `${course.duration_hours}h` : "-"}
                  </td>
                  <td className="py-3.5 px-4 font-latin font-bold text-ink">
                    {course.lessons_count || 0} دروس
                  </td>
                  <td className="py-3.5 px-4">
                    {course.is_published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#1f5c3f]/10 text-[#1f5c3f] border border-[#1f5c3f]/20 font-semibold">
                        منشور للطلاب
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        مسودة
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-left">
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
                  <td colSpan={7} className="text-center py-12 text-ink-muted">
                    لا توجد كورسات مضافة بعد. اضغط على "إضافة كورس جديد" لإنشاء أول كورس.
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
