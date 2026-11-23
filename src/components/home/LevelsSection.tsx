import Link from "next/link";
import { Level } from "@/types/database";
import { ArrowLeft, Check, Layers } from "lucide-react";

interface LevelsSectionProps {
  levels: Level[];
}

export default function LevelsSection({ levels }: LevelsSectionProps) {
  return (
    <section id="levels" className="py-20 border-b border-paper-border bg-paper-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase font-latin tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>المسار التعليمي المتدرج</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              مستويات تعليم اللغة الإنجليزية
            </h2>
            <p className="text-sm text-ink-muted mt-2 max-w-xl">
              تم تنظيم المناهج وفق المعايير الدولية للإطار الأوروبي (CEFR) لنضمن لك تطوراً تراكمياً ثابتاً من الأساس وحتى الطلاقة.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-ink hover:text-accent transition-colors shrink-0"
          >
            <span>استعراض كافة الكورسات حسب المستوى</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {levels.map((level, idx) => (
            <div
              key={level.id}
              className="bg-white border border-paper-border rounded-sm p-5 flex flex-col justify-between hover:border-accent transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-accent font-latin">
                    Level 0{idx + 1}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-paper-100 text-ink-soft text-xs font-bold flex items-center justify-center font-latin">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="font-bold text-ink text-base mb-1 group-hover:text-accent transition-colors">
                  {level.name_ar}
                </h3>
                <span className="block text-xs text-ink-muted font-latin mb-3 ltr-text">
                  {level.name_en}
                </span>

                <p className="text-xs text-ink-soft leading-relaxed">
                  {level.description || "بناء المهارات اللغوية المخصصة لهذه المرحلة."}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-paper-border">
                <Link
                  href={`/courses?level=${level.slug}`}
                  className="text-xs font-semibold text-ink group-hover:text-accent inline-flex items-center gap-1 transition-colors"
                >
                  <span>كورسات هذا المستوى</span>
                  <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
