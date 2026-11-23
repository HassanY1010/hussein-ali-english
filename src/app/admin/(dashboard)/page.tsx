import Link from "next/link";
import { getAdminStats, getCourses } from "@/lib/data/repository";
import {
  BookOpen,
  PlayCircle,
  PlusCircle,
  Layers,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, courses] = await Promise.all([
    getAdminStats(),
    getCourses(),
  ]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome banner */}
      <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-fine">
        <div>
          <span className="text-xs font-bold text-accent uppercase font-latin tracking-wider">
            نظام إدارة المحتوى / CMS
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-ink mt-0.5">
            مرحباً بك يا أستاذ حسين علي
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            من هنا يمكنك إضافة وتعديل الكورسات والدروس، وإدارة محتوى المنصة وقناة التلغرام.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink hover:bg-accent text-paper-50 font-bold text-xs transition-colors shadow-fine"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span>إضافة كورس جديد</span>
          </Link>

          <a
            href="https://hussein-ali-english.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-paper-100 hover:bg-paper-200 text-ink font-semibold text-xs transition-colors border border-paper-border"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>عرض المنصة (onrender.com)</span>
          </a>
        </div>
      </div>

      {/* Real Functional Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-paper-border rounded-sm p-4 sm:p-5 shadow-fine">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-muted">إجمالي الدورات</span>
            <BookOpen className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-ink font-latin">
            {stats.totalCourses}
          </div>
          <div className="text-[11px] text-ink-muted mt-1 flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#1f5c3f] font-semibold font-latin">{stats.publishedCourses} منشور</span>
            <span>•</span>
            <span className="text-amber-700 font-semibold font-latin">{stats.draftCourses} مسودة</span>
          </div>
        </div>

        <div className="bg-white border border-paper-border rounded-sm p-4 sm:p-5 shadow-fine">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-muted">إجمالي الدروس</span>
            <PlayCircle className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-ink font-latin">
            {stats.totalLessons}
          </div>
          <div className="text-[11px] text-ink-muted mt-1">
            دروس تفاعلية ومسجلة
          </div>
        </div>

        <div className="bg-white border border-paper-border rounded-sm p-4 sm:p-5 shadow-fine">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-muted">الأقسام اللغوية</span>
            <Layers className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-ink font-latin">
            {stats.totalCategories}
          </div>
          <div className="text-[11px] text-ink-muted mt-1">
            قواعد، محادثة، نطق...
          </div>
        </div>

        <div className="bg-white border border-paper-border rounded-sm p-4 sm:p-5 shadow-fine">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-muted">المستويات التعليمية</span>
            <CheckCircle2 className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-ink font-latin">
            {stats.totalLevels}
          </div>
          <div className="text-[11px] text-ink-muted mt-1 font-latin">
            Beginner → Advanced
          </div>
        </div>
      </div>

      {/* Courses quick management table */}
      <div className="bg-white border border-paper-border rounded-sm shadow-fine overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-paper-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-ink">
              الدورات في المنصة ({courses.length})
            </h2>
            <p className="text-xs text-ink-muted">
              إدارة الكورسات، إضافة الدروس، وتعديل الحالة بين منشور ومسودة.
            </p>
          </div>

          <Link
            href="/admin/courses"
            className="text-xs font-bold text-accent hover:underline flex items-center gap-1 shrink-0"
          >
            <span>إدارة جميع الدورات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs min-w-[500px]">
            <thead className="bg-paper-50 text-ink-soft border-b border-paper-border font-bold">
              <tr>
                <th className="py-3 px-4">الدورة</th>
                <th className="py-3 px-4">المستوى / التصنيف</th>
                <th className="py-3 px-4">الدروس</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-paper-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-ink text-xs sm:text-sm">
                      {course.title}
                    </div>
                    <div className="text-[11px] text-ink-muted font-latin ltr-text">
                      /{course.slug}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-ink-soft">
                    <div>{course.level?.name_ar || "-"}</div>
                    <div className="text-accent text-[11px]">{course.category?.name_ar || "-"}</div>
                  </td>
                  <td className="py-3.5 px-4 font-latin font-bold text-ink">
                    {course.lessons_count || 0} دروس
                  </td>
                  <td className="py-3.5 px-4">
                    {course.is_published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#1f5c3f]/10 text-[#1f5c3f] border border-[#1f5c3f]/20 font-semibold">
                        منشور
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        مسودة
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-left">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/courses/${course.id}/lessons`}
                        className="px-2.5 py-1 bg-paper-100 hover:bg-paper-200 text-ink font-semibold rounded-sm transition-colors text-[11px]"
                      >
                        الدروس
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="px-2.5 py-1 bg-ink hover:bg-accent text-white font-semibold rounded-sm transition-colors text-[11px]"
                      >
                        تعديل
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-ink-muted">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-ink-muted/60" />
                    <p className="font-semibold text-xs sm:text-sm text-ink">لا توجد دورات مضافة حالياً</p>
                    <p className="text-xs text-ink-muted mt-1">اضغط على "إضافة كورس جديد" بالأعلى لنشر أول دورة في الأكاديمية.</p>
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
