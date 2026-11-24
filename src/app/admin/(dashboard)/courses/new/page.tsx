import { getCategories, getLevels } from "@/lib/data/repository";
import CourseForm from "@/components/admin/CourseForm";

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  const [categories, levels] = await Promise.all([
    getCategories(),
    getLevels(),
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <CourseForm categories={categories} levels={levels} />
    </div>
  );
}
