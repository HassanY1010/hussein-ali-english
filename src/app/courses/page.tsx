import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import CoursesFilterBar from "@/components/courses/CoursesFilterBar";
import EmptyCoursesState from "@/components/courses/EmptyCoursesState";
import {
  getSiteSettings,
  getCourses,
  getCategories,
  getLevels,
} from "@/lib/data/repository";
import { HelpCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const coursesTitle = "جميع الكورسات والدروس | أكاديمية حسين علي";
const coursesDescription =
  "استكشف كافة دورات تعليم اللغة الإنجليزية للأستاذ حسين علي. دورات في القواعد، المحادثة، النطق والمفردات مع تنظيم كامل حسب المستويات.";
const siteUrl = "https://hussein-ali-english.onrender.com";
const defaultImageUrl = `${siteUrl}/images/logo.jpg`;

export const metadata: Metadata = {
  title: coursesTitle,
  description: coursesDescription,
  openGraph: {
    title: coursesTitle,
    description: coursesDescription,
    url: `${siteUrl}/courses`,
    siteName: "أكاديمية حسين علي لتعليم اللغة الإنجليزية",
    images: [
      {
        url: defaultImageUrl,
        secureUrl: defaultImageUrl,
        width: 800,
        height: 800,
        alt: coursesTitle,
        type: "image/jpeg",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: coursesTitle,
    description: coursesDescription,
    images: [defaultImageUrl],
  },
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

  const hasFilterActive = Boolean(searchParams.category || searchParams.level || searchParams.q);

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main id="main-content" className="flex-1 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold text-accent uppercase font-latin tracking-wider">
              المكتبة التعليمية / Course Catalog
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-ink mt-1">
              جميع دورات ودروس اللغة الإنجليزية
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-2 max-w-2xl leading-relaxed">
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

          {/* Results count (only when courses exist) */}
          {courses.length > 0 && (
            <div className="mb-6 flex items-center justify-between text-xs text-ink-muted">
              <span>
                عرض <strong className="text-ink font-latin">{courses.length}</strong> كورس متاح
              </span>
              {searchParams.q && (
                <span>نتائج البحث عن: "{searchParams.q}"</span>
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
              <h3 className="text-base font-bold text-ink">لم نتمكن من إيجاد دورات تطابق خياراتك</h3>
              <p className="text-xs text-ink-muted mt-2">
                جرب إزالة أو تغيير خيارات التصفية للبحث في كافة الدورات.
              </p>
            </div>
          ) : (
            <EmptyCoursesState telegramUrl={settings.telegram_url} />
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
