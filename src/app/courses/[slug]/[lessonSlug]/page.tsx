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
  const result = await getLessonBySlug(params.slug, params.lessonSlug, { publishedOnly: true });
  if (!result) {
    return { title: "الدرس غير موجود" };
  }
  return {
    title: `${result.lesson.title} | ${result.course.title}`,
    description: result.lesson.description || result.course.short_description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const [result, settings] = await Promise.all([
    getLessonBySlug(params.slug, params.lessonSlug, { publishedOnly: true }),
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
