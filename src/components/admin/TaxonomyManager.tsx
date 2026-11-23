"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Category, Level } from "@/types/database";
import { addCategoryAction, addLevelAction } from "@/lib/actions/courses";
import { Layers, Plus, CheckCircle2, AlertCircle } from "lucide-react";

interface TaxonomyManagerProps {
  categories: Category[];
  levels: Level[];
}

function CategorySubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-ink text-white font-bold text-xs rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
    >
      {pending ? "جاري الإضافة..." : "إضافة التصنيف"}
    </button>
  );
}

function LevelSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-ink text-white font-bold text-xs rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
    >
      {pending ? "جاري الإضافة..." : "إضافة المستوى"}
    </button>
  );
}

export default function TaxonomyManager({ categories, levels }: TaxonomyManagerProps) {
  const [catState, catAction] = useFormState(addCategoryAction, null);
  const [lvlState, lvlAction] = useFormState(addLevelAction, null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Categories */}
      <div className="space-y-6">
        <div className="bg-white border border-paper-border rounded-sm p-6 shadow-fine">
          <h2 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <span>تصنيفات الكورسات ({categories.length})</span>
          </h2>
          <p className="text-xs text-ink-muted mb-4">
            التصنيفات المتاحة لتنظيم مجالات اللغة (Grammar, Speaking, etc.)
          </p>

          <div className="divide-y divide-paper-border mb-6">
            {categories.map((cat) => (
              <div key={cat.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-ink">{cat.name_ar}</span>
                  <span className="text-ink-muted font-latin ml-2 ltr-text">({cat.name_en})</span>
                </div>
                <span className="font-latin text-[11px] text-accent font-mono bg-paper-100 px-2 py-0.5 rounded-sm">
                  {cat.slug}
                </span>
              </div>
            ))}
          </div>

          {/* Add Category Form */}
          <div className="border-t border-paper-border pt-4">
            <h3 className="text-xs font-bold text-ink mb-3">إضافة تصنيف جديد</h3>
            {catState?.error && (
              <p className="text-xs text-red-600 mb-2">{catState.error}</p>
            )}
            {catState?.success && (
              <p className="text-xs text-green-600 mb-2">{catState.message}</p>
            )}
            <form action={catAction} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="name_ar"
                  required
                  placeholder="الاسم بالعربية (مثال: محادثة متقدمة)"
                  className="bg-paper-50 border border-paper-border rounded-sm px-3 py-1.5 text-xs text-ink"
                />
                <input
                  type="text"
                  name="name_en"
                  required
                  placeholder="English Name"
                  className="bg-paper-50 border border-paper-border rounded-sm px-3 py-1.5 text-xs text-ink font-latin ltr-text"
                />
              </div>
              <input
                type="text"
                name="description"
                placeholder="وصف مختصر للتصنيف..."
                className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-1.5 text-xs text-ink"
              />
              <div className="flex justify-end">
                <CategorySubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-6">
        <div className="bg-white border border-paper-border rounded-sm p-6 shadow-fine">
          <h2 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <span>مستويات اللغة ({levels.length})</span>
          </h2>
          <p className="text-xs text-ink-muted mb-4">
            المستويات المعتمدة للتقسيم التعليمي (Beginner إلى Advanced)
          </p>

          <div className="divide-y divide-paper-border mb-6">
            {levels.map((lvl) => (
              <div key={lvl.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-ink">{lvl.name_ar}</span>
                  <span className="text-ink-muted font-latin ml-2 ltr-text">({lvl.name_en})</span>
                </div>
                <span className="font-latin text-[11px] text-ink-muted font-mono bg-paper-100 px-2 py-0.5 rounded-sm">
                  {lvl.slug}
                </span>
              </div>
            ))}
          </div>

          {/* Add Level Form */}
          <div className="border-t border-paper-border pt-4">
            <h3 className="text-xs font-bold text-ink mb-3">إضافة مستوى تعليمي جديد</h3>
            {lvlState?.error && (
              <p className="text-xs text-red-600 mb-2">{lvlState.error}</p>
            )}
            {lvlState?.success && (
              <p className="text-xs text-green-600 mb-2">{lvlState.message}</p>
            )}
            <form action={lvlAction} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="name_ar"
                  required
                  placeholder="المستوى بالعربية"
                  className="bg-paper-50 border border-paper-border rounded-sm px-3 py-1.5 text-xs text-ink"
                />
                <input
                  type="text"
                  name="name_en"
                  required
                  placeholder="Level in English"
                  className="bg-paper-50 border border-paper-border rounded-sm px-3 py-1.5 text-xs text-ink font-latin ltr-text"
                />
              </div>
              <input
                type="text"
                name="description"
                placeholder="وصف مرحلة التعلم..."
                className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-1.5 text-xs text-ink"
              />
              <div className="flex justify-end">
                <LevelSubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
