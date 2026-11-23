import { getCategories, getLevels } from "@/lib/data/repository";
import TaxonomyManager from "@/components/admin/TaxonomyManager";

export const dynamic = "force-dynamic";

export default async function AdminTaxonomiesPage() {
  const [categories, levels] = await Promise.all([
    getCategories(),
    getLevels(),
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink">
          إدارة التصنيفات ومستويات اللغة
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          تنظيم مجالات اللغة ومستويات الإطار الأوروبي وتخصيص مسارات الطلاب.
        </p>
      </div>

      <TaxonomyManager categories={categories} levels={levels} />
    </div>
  );
}
