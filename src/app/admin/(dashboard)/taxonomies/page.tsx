import { getCategories, getLevels } from "@/lib/data/repository";
import TaxonomyManager from "@/components/admin/TaxonomyManager";

export const dynamic = "force-dynamic";

export default async function AdminTaxonomiesPage() {
  const [categories, levels] = await Promise.all([
    getCategories(),
    getLevels(),
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <TaxonomyManager categories={categories} levels={levels} />
    </div>
  );
}
