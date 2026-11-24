import { notFound } from "next/navigation";
import { getCourseById, getCategories, getLevels } from "@/lib/data/repository";
import CourseForm from "@/components/admin/CourseForm";

export const dynamic = "force-dynamic";

interface EditCoursePageProps {
  params: {
    id: string;
  };
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const [course, categories, levels] = await Promise.all([
    getCourseById(params.id),
    getCategories(),
    getLevels(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CourseForm course={course} categories={categories} levels={levels} />
    </div>
  );
}
