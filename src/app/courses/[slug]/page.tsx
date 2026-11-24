import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseDetailsClient from "@/components/courses/CourseDetailsClient";
import {
  getSiteSettings,
  getCourseBySlug,
  getCourseLessons,
} from "@/lib/data/repository";

export const dynamic = "force-dynamic";

interface CourseDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CourseDetailsPageProps): Promise<Metadata> {
  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}
  const course = await getCourseBySlug(slug, { publishedOnly: true });
  if (!course) {
    return { title: "الدورة غير موجودة | Course Not Found" };
  }

  const siteUrl = "https://hussein-ali-english.onrender.com";
  const courseUrl = `${siteUrl}/courses/${encodeURIComponent(course.slug)}`;
  let imageUrl = course.thumbnail_url || `${siteUrl}/images/logo.jpg`;
  if (imageUrl.startsWith("/")) {
    imageUrl = `${siteUrl}${imageUrl}`;
  }
  const title = `${course.title} | أكاديمية حسين علي`;
  const description =
    course.short_description ||
    course.description ||
    "كورس تعليمي شامل في اللغة الإنجليزية مع الأستاذ حسين علي.";

  return {
    title: course.title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: courseUrl,
      siteName: "أكاديمية حسين علي لتعليم اللغة الإنجليزية",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 800,
          height: 800,
          alt: course.title,
          type: "image/jpeg",
        },
      ],
      locale: "ar_AR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}

  const [settings, course] = await Promise.all([
    getSiteSettings(),
    getCourseBySlug(slug, { publishedOnly: true }),
  ]);

  if (!course) {
    notFound();
  }

  const lessons = await getCourseLessons(course.id, { publishedOnly: true });

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.short_description || course.description,
    provider: {
      "@type": "Organization",
      name: "Hussein Ali English Academy",
      sameAs: "https://hussein-ali-english.onrender.com",
    },
    instructor: {
      "@type": "Person",
      name: course.instructor_name || "حسين علي",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />

        <CourseDetailsClient
          course={course}
          lessons={lessons}
          settings={settings}
        />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
