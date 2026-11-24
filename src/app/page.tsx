import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeCoursesSection from "@/components/home/HomeCoursesSection";
import LevelsSection from "@/components/home/LevelsSection";
import InstructorSection from "@/components/home/InstructorSection";
import TelegramBanner from "@/components/home/TelegramBanner";
import { getSiteSettings, getCourses, getLevels } from "@/lib/data/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, allCourses, levels] = await Promise.all([
    getSiteSettings(),
    getCourses({ publishedOnly: true }),
    getLevels(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <HeroSection settings={settings} />

        {/* Featured Course & Courses Overview */}
        <HomeCoursesSection
          allCourses={allCourses}
          telegramUrl={settings.telegram_url}
        />

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
