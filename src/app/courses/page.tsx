import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import CoursesFilterBar from "@/components/courses/CoursesFilterBar";
import {
  getSiteSettings,
  getCourses,
  getCategories,
  getLevels,
} from "@/lib/data/repository";
import { BookOpen, HelpCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "جميع الكورسات والدروس",
  description:
    "استكشف كافة دورات تعليم اللغة الإنجليزية للأستاذ حسين علي. دورات في القواعد، المحادثة، النطق والمفردات مع تنظيم كامل حسب المستويات.",
};

interface CoursesPageProps {
  searchParams: {
    category?: string;
    level?: string;
    q?: string;
  };
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const [settings, categories, levels, courses] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getLevels(),
    getCourses({
      publishedOnly: true,
      categorySlug: searchParams.category,
      levelSlug: searchParams.level,
      searchQuery: searchParams.q,
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold text-accent uppercase font-latin tracking-wider">
              المكتبة التعليمية
            </span>
            <h1 className="text-3xl font-black text-ink mt-1">
              جميع كورسات ودروس اللغة الإنجليزية
            </h1>
            <p className="text-sm text-ink-muted mt-2 max-w-2xl">
              تصفح الدروس المنظمة بعناية حسب مجالك واحتياجك اللغوي، جميع الكورسات في المرحلة الحالية متاحة ومجانية بالكامل للطلاب.
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
          <div className="mb-6 flex items-center justify-between text-xs text-ink-muted">
            <span>
              عرض <strong className="text-ink font-latin">{courses.length}</strong> كورس متاح
            </span>
            {searchParams.q && (
              <span>نتائج البحث عن: "{searchParams.q}"</span>
            )}
          </div>

          {/* Course Grid */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-paper-border rounded-sm p-8">
              <HelpCircle className="w-12 h-12 text-ink-muted mx-auto mb-3 stroke-[1.2]" />
              <h3 className="text-lg font-bold text-ink">لم نتمكن من إيجاد كورسات تطابق بحثك</h3>
              <p className="text-xs text-ink-muted mt-2 max-w-md mx-auto">
                جرب تغيير خيارات التصفية أو البحث بكلمات عامة مثل (أزمنة، قواعد، محادثة).
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
