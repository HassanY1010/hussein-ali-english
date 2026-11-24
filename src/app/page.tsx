import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import LevelsSection from "@/components/home/LevelsSection";
import InstructorSection from "@/components/home/InstructorSection";
import TelegramBanner from "@/components/home/TelegramBanner";
import CourseCard from "@/components/courses/CourseCard";
import EmptyCoursesState from "@/components/courses/EmptyCoursesState";
import { getSiteSettings, getCourses, getLevels } from "@/lib/data/repository";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, allCourses, levels] = await Promise.all([
    getSiteSettings(),
    getCourses({ publishedOnly: true }),
    getLevels(),
  ]);

  const featuredCourse = allCourses.find((c) => c.is_featured) || allCourses[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/40">
      <Navbar settings={settings} />

      <main id="main-content" className="flex-1">
        {/* Hero Section with Featured Course (Top-Left Panel in Reference Design) */}
        <HeroSection settings={settings} featuredCourse={featuredCourse} />

        {/* Telegram Community Callout (Top-Right Panel in Reference Design) */}
        <TelegramBanner settings={settings} />

        {/* About Instructor Philosophy (Middle-Left Panel in Reference Design) */}
        <InstructorSection settings={settings} />

        {/* Language Levels Progression (Middle-Right Panel in Reference Design) */}
        <LevelsSection levels={levels} />

        {/* Courses Overview Grid (Bottom-Left Panel in Reference Design) */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-right">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase font-latin tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الكورسات والمناهج المتاحة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F2942]">
                أحدث الكورسات التعليمية
              </h2>
            </div>

            {allCourses.length > 0 && (
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>مشاهدة جميع الكورسات ({allCourses.length})</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Courses Grid */}
          {allCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <EmptyCoursesState telegramUrl={settings.telegram_url} />
          )}
        </section>
      </main>

      {/* Modern Newsletter Footer (Bottom-Right Panel in Reference Design) */}
      <Footer settings={settings} />
    </div>
  );
}
