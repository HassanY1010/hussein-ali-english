import { getCategories, getLevels } from "@/lib/data/repository";
import CourseForm from "@/components/admin/CourseForm";

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  const [categories, levels] = await Promise.all([
    getCategories(),
    getLevels(),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink">
          إضافة كورس تعليمي جديد
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          أدخل بيانات الكورس الجديد، المستوى والتصنيف. ستتمكن من إضافة الدروس والفيديوهات بعد إنشاء الكورس.
        </p>
      </div>

      <CourseForm categories={categories} levels={levels} />
    </div>
  );
}
