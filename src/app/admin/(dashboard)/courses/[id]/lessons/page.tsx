import { notFound } from "next/navigation";
import { getCourseById, getCourseLessons } from "@/lib/data/repository";
import LessonManager from "@/components/admin/LessonManager";

export const dynamic = "force-dynamic";

interface CourseLessonsPageProps {
  params: {
    id: string;
  };
}

export default async function CourseLessonsPage({ params }: CourseLessonsPageProps) {
  const [course, lessons] = await Promise.all([
    getCourseById(params.id),
    getCourseLessons(params.id),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <LessonManager course={course} initialLessons={lessons} />
    </div>
  );
}
