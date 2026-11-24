import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoursesPageClient from "@/components/courses/CoursesPageClient";
import {
  getSiteSettings,
  getCourses,
  getCategories,
  getLevels,
} from "@/lib/data/repository";

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

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main id="main-content" className="flex-1 py-10 md:py-14">
        <CoursesPageClient
          categories={categories}
          levels={levels}
          courses={courses}
          searchParams={searchParams}
          telegramUrl={settings.telegram_url}
        />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
