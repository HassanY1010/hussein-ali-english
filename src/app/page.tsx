import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import LevelsSection from "@/components/home/LevelsSection";
import InstructorSection from "@/components/home/InstructorSection";
import TelegramBanner from "@/components/home/TelegramBanner";
import CourseCard from "@/components/courses/CourseCard";
import { getSiteSettings, getCourses, getLevels } from "@/lib/data/repository";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, allCourses, levels] = await Promise.all([
    getSiteSettings(),
    getCourses({ publishedOnly: true }),
    getLevels(),
  ]);

  const featuredCourse = allCourses.find((c) => c.is_featured) || allCourses[0];
  const regularCourses = allCourses.filter((c) => c.id !== featuredCourse?.id);

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection settings={settings} />

        {/* Featured Course & Courses Overview */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase font-latin tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الكورسات والمناهج المتاحة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                أحدث الكورسات التعليمية
              </h2>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-ink hover:text-accent transition-colors"
            >
              <span>مشاهدة جميع الكورسات ({allCourses.length})</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured Course Highlight */}
          {featuredCourse && (
            <div className="mb-10">
              <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-3 flex items-center gap-2 font-latin">
                <span>الكورس المميز المقترح للبدء</span>
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

          {allCourses.length === 0 && (
            <div className="text-center py-16 bg-white border border-paper-border rounded-sm p-8">
              <BookOpen className="w-10 h-10 text-ink-muted mx-auto mb-3" />
              <h3 className="text-base font-bold text-ink">لا توجد كورسات منشورة حالياً</h3>
              <p className="text-xs text-ink-muted mt-1">
                سيتم إضافة الدروس ونشرها قريباً من قبل الأستاذ حسين علي.
              </p>
            </div>
          )}
        </section>

        {/* Language Levels Progression */}
        <LevelsSection levels={levels} />

        {/* About Instructor */}
        <InstructorSection settings={settings} />

        {/* Telegram Community Callout */}
        <TelegramBanner settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
