import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLessonBySlug, getSiteSettings } from "@/lib/data/repository";
import LessonViewer from "@/components/classroom/LessonViewer";

export const dynamic = "force-dynamic";

interface LessonPageProps {
  params: {
    slug: string;
    lessonSlug: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  let slug = params.slug;
  let lessonSlug = params.lessonSlug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}
  try {
    lessonSlug = decodeURIComponent(params.lessonSlug);
  } catch {}

  const result = await getLessonBySlug(slug, lessonSlug, { publishedOnly: true });
  if (!result) {
    return { title: "الدرس غير موجود" };
  }

  const siteUrl = "https://hussein-ali-english.onrender.com";
  const lessonUrl = `${siteUrl}/courses/${encodeURIComponent(result.course.slug)}/${encodeURIComponent(result.lesson.slug)}`;
  let imageUrl = result.course.thumbnail_url || `${siteUrl}/images/logo.jpg`;
  if (imageUrl.startsWith("/")) {
    imageUrl = `${siteUrl}${imageUrl}`;
  }
  const title = `${result.lesson.title} - ${result.course.title}`;
  const description =
    result.lesson.description ||
    result.course.short_description ||
    "شرح تفاعلي مبسط للدرس مع الأستاذ حسين علي.";

  return {
    title: `${title} | أكاديمية حسين علي`,
    description: description,
    openGraph: {
      title: `${title} | أكاديمية حسين علي`,
      description: description,
      url: lessonUrl,
      siteName: "أكاديمية حسين علي لتعليم اللغة الإنجليزية",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 800,
          height: 800,
          alt: title,
          type: "image/jpeg",
        },
      ],
      locale: "ar_AR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | أكاديمية حسين علي`,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  let slug = params.slug;
  let lessonSlug = params.lessonSlug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}
  try {
    lessonSlug = decodeURIComponent(params.lessonSlug);
  } catch {}

  const [result, settings] = await Promise.all([
    getLessonBySlug(slug, lessonSlug, { publishedOnly: true }),
    getSiteSettings(),
  ]);

  if (!result) {
    notFound();
  }

  const { course, lesson, allLessons } = result;

  return (
    <LessonViewer
      course={course}
      currentLesson={lesson}
      allLessons={allLessons}
      settings={settings}
    />
  );
}
