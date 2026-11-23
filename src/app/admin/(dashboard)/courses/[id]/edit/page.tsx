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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink">
          تعديل الكورس: {course.title}
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          تحديث المحتوى، الوصف، المستوى أو تغيير حالة النشر.
        </p>
      </div>

      <CourseForm course={course} categories={categories} levels={levels} />
    </div>
  );
}
