"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category, Level } from "@/types/database";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FilterBarProps {
  categories: Category[];
  levels: Level[];
  initialCategory?: string;
  initialLevel?: string;
  initialSearch?: string;
}

export default function CoursesFilterBar({
  categories,
  levels,
  initialCategory = "all",
  initialLevel = "all",
  initialSearch = "",
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { t, language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);

  function applyFilters(newCategory?: string, newLevel?: string, newSearch?: string) {
    const cat = newCategory !== undefined ? newCategory : selectedCategory;
    const lvl = newLevel !== undefined ? newLevel : selectedLevel;
    const q = newSearch !== undefined ? newSearch : searchTerm;

    const params = new URLSearchParams();
    if (cat && cat !== "all") params.set("category", cat);
    if (lvl && lvl !== "all") params.set("level", lvl);
    if (q && q.trim() !== "") params.set("q", q.trim());

    startTransition(() => {
      router.push(`/courses?${params.toString()}`);
    });
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyFilters(undefined, undefined, searchTerm);
  }

  function clearAll() {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    startTransition(() => {
      router.push("/courses");
    });
  }

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== "all") ||
    (selectedLevel && selectedLevel !== "all") ||
    searchTerm.trim() !== "";

  return (
    <div className="bg-white border border-paper-border rounded-sm p-4 sm:p-6 mb-8 space-y-4 shadow-fine">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.courses.searchPlaceholder}
          className="w-full bg-paper-50 border border-paper-border rounded-sm pr-10 pl-24 py-2.5 sm:py-3 text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:bg-white focus:border-accent transition-colors"
        />
        <Search className="w-4 h-4 text-ink-muted absolute right-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
        <button
          type="submit"
          disabled={isPending}
          className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-paper-50 text-xs font-semibold rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
        >
          {isPending ? "..." : (language === "en" ? "Search" : "بحث")}
        </button>
      </form>

      {/* Categories & Levels Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 pt-2 border-t border-paper-border">
        {/* Category selector */}
        <div className="lg:col-span-6 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ink-soft">
            {language === "en" ? "Category:" : "تصنيف الكورس:"}
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSelectedCategory("all");
                applyFilters("all", undefined, undefined);
              }}
              className={`px-2.5 py-1 text-xs rounded-sm transition-colors border ${
                selectedCategory === "all"
                  ? "bg-ink text-paper-50 border-ink font-semibold"
                  : "bg-paper-50 text-ink-soft border-paper-border hover:bg-paper-100"
              }`}
            >
              {t.courses.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  applyFilters(cat.slug, undefined, undefined);
                }}
                className={`px-2.5 py-1 text-xs rounded-sm transition-colors border ${
                  selectedCategory === cat.slug
                    ? "bg-accent text-paper-50 border-accent font-semibold"
                    : "bg-paper-50 text-ink-soft border-paper-border hover:bg-paper-100"
                }`}
              >
                {language === "en" ? cat.name_en : cat.name_ar}
              </button>
            ))}
          </div>
        </div>

        {/* Level selector */}
        <div className="lg:col-span-6 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ink-soft">
            {language === "en" ? "Level:" : "المستوى اللغوي:"}
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSelectedLevel("all");
                applyFilters(undefined, "all", undefined);
              }}
              className={`px-2.5 py-1 text-xs rounded-sm transition-colors border ${
                selectedLevel === "all"
                  ? "bg-ink text-paper-50 border-ink font-semibold"
                  : "bg-paper-50 text-ink-soft border-paper-border hover:bg-paper-100"
              }`}
            >
              {t.courses.allLevels}
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => {
                  setSelectedLevel(lvl.slug);
                  applyFilters(undefined, lvl.slug, undefined);
                }}
                className={`px-2.5 py-1 text-xs rounded-sm transition-colors border ${
                  selectedLevel === lvl.slug
                    ? "bg-ink text-paper-50 border-ink font-semibold"
                    : "bg-paper-50 text-ink-soft border-paper-border hover:bg-paper-100"
                }`}
              >
                {language === "en" ? lvl.name_en : lvl.name_ar}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-2 flex items-center justify-between text-xs text-ink-muted border-t border-paper-border">
          <span>{language === "en" ? "Active filters applied" : "يتم تطبيق التصفية المخصصة..."}</span>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t.courses.resetFilters}</span>
          </button>
        </div>
      )}
    </div>
  );
}
