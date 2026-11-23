import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  getSiteSettings,
  getCourseBySlug,
  getCourseLessons,
} from "@/lib/data/repository";
import {
  Clock,
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
  User,
  Send,
  BookOpen,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface CourseDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CourseDetailsPageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug, { publishedOnly: true });
  if (!course) {
    return { title: "الدورة غير موجودة | Course Not Found" };
  }
  return {
    title: course.title,
    description: course.short_description,
    openGraph: {
      title: `${course.title} | أكاديمية حسين علي`,
      description: course.short_description,
      images: course.thumbnail_url ? [course.thumbnail_url] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.short_description,
    },
  };
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const [settings, course] = await Promise.all([
    getSiteSettings(),
    getCourseBySlug(params.slug, { publishedOnly: true }),
  ]);

  if (!course) {
    notFound();
  }

  const lessons = await getCourseLessons(course.id, { publishedOnly: true });
  const firstLesson = lessons[0];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.short_description || course.description,
    provider: {
      "@type": "Organization",
      name: "Hussein Ali English Academy",
      sameAs: "https://hussein-ali-english.onrender.com",
    },
    instructor: {
      "@type": "Person",
      name: course.instructor_name || "حسين علي",
    },
    isAccessibleForFree: course.is_free,
    inLanguage: ["ar", "en"],
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Navbar settings={settings} />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <Link href="/" className="hover:text-ink">
              الرئيسية / Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-ink">
              الدورات / Courses
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-md">
              {course.title}
            </span>
          </nav>

          {/* Course Hero Editorial Grid */}
          <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-8 md:p-10 mb-10 shadow-fine">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Metadata & Narrative */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {course.level && (
                    <span className="px-2.5 py-0.5 rounded-sm bg-paper-100 text-ink-soft border border-paper-border font-medium">
                      {course.level.name_ar}
                    </span>
                  )}
                  {course.category && (
                    <span className="px-2.5 py-0.5 rounded-sm bg-accent-light text-accent border border-accent-border font-medium">
                      {course.category.name_ar}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-sm bg-ink text-paper-50 font-semibold font-latin">
                    متاح مجاناً / Free
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-ink leading-tight">
                  {course.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-ink-soft leading-relaxed">
                  {course.description}
                </p>

                {/* Course Facts */}
                <div className="pt-4 border-t border-paper-border grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-ink-muted">
                  <div>
                    <span className="block text-ink-soft font-bold mb-0.5">المدرس:</span>
                    <span className="text-ink font-semibold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent" />
                      {course.instructor_name}
                    </span>
                  </div>
                  <div>
                    <span className="block text-ink-soft font-bold mb-0.5">عدد الدروس:</span>
                    <span className="text-ink font-semibold font-latin flex items-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5 text-accent" />
                      {lessons.length} دروس تعليمية
                    </span>
                  </div>
                  <div>
                    <span className="block text-ink-soft font-bold mb-0.5">المدة الإجمالية:</span>
                    <span className="text-ink font-semibold font-latin flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {course.duration_hours > 0 ? `${course.duration_hours} ساعات` : "محتوى شامل"}
                    </span>
                  </div>
                </div>

                {/* Start Learning Action */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {firstLesson ? (
                    <Link
                      href={`/courses/${course.slug}/${firstLesson.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-ink text-paper-50 font-bold text-xs sm:text-sm hover:bg-accent transition-all duration-200 shadow-fine"
                    >
                      <PlayCircle className="w-4 h-4 shrink-0" />
                      <span>بدء دراسة الدورة (الدرس الأول)</span>
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-paper-100 text-ink-muted text-xs sm:text-sm font-semibold border border-paper-border">
                      <span>قريباً: رفع ونشر الدروس</span>
                    </div>
                  )}

                  <a
                    href={settings.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-[#229ED9]/10 text-[#0c72a6] hover:bg-[#229ED9] hover:text-white text-xs font-semibold transition-colors border border-[#229ED9]/30"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span>مجموعة النقاش على Telegram</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Thumbnail */}
              <div className="lg:col-span-5">
                <div className="rounded-sm overflow-hidden border border-paper-border bg-paper-200 aspect-[16/11]">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-muted">
                      <BookOpen className="w-14 h-14 stroke-[1.2]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Two-column layout: Objectives & Curriculum */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Lessons Curriculum List */}
            <div className="lg:col-span-8 space-y-5">
              <div className="border-b border-paper-border pb-3">
                <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-accent" />
                  <span>منهج وخطة الدروس ({lessons.length} دروس)</span>
                </h2>
              </div>

              {lessons.length > 0 ? (
                <div className="divide-y divide-paper-border border border-paper-border bg-white rounded-sm">
                  {lessons.map((lesson, idx) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.slug}/${lesson.slug}`}
                      className="group p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-paper-50 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-8 h-8 rounded-sm bg-paper-100 text-ink font-bold text-xs flex items-center justify-center font-latin shrink-0 border border-paper-border group-hover:bg-accent group-hover:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm md:text-base font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                            {lesson.title}
                          </h3>
                          {lesson.description && (
                            <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-xs text-ink-muted font-latin">
                        {lesson.duration_minutes > 0 && (
                          <span className="hidden sm:inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration_minutes} دقيقة</span>
                          </span>
                        )}
                        <span className="px-2.5 py-1 bg-paper-100 group-hover:bg-accent group-hover:text-white text-ink-soft rounded-sm text-xs font-semibold transition-colors">
                          مشاهدة
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-paper-border rounded-sm p-6 text-xs text-ink-muted">
                  لا توجد دروس منشورة في هذه الدورة بعد. ترقبوا رفع الدروس قريباً.
                </div>
              )}
            </div>

            {/* Sidebar: Objectives & Preparation */}
            <div className="lg:col-span-4 space-y-6">
              {course.objectives && course.objectives.length > 0 && (
                <div className="bg-white border border-paper-border rounded-sm p-5 sm:p-6 shadow-fine">
                  <h3 className="text-base font-bold text-ink mb-4 pb-2 border-b border-paper-border flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>ماذا ستكتسب بنهاية هذه الدورة؟</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
                    {course.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{obj.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Study advice card */}
              <div className="bg-paper-100 border border-paper-border rounded-sm p-5 space-y-3 text-xs text-ink-soft">
                <h4 className="font-bold text-ink text-sm">
                  نصيحة الأستاذ حسين للدراسة:
                </h4>
                <p className="leading-relaxed">
                  احرص على تدوين الجمل بيدك وترديدها بصوت عالٍ. لا تكتفِ بالمشاهدة الصامتة، فتعلم اللغة يتطلب تدريب اللسان وعضلات النطق.
                </p>
                <div className="pt-2">
                  <a
                    href={settings.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0c72a6] hover:underline inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                    <span>انضم لقناة التلغرام لتبادل التطبيقات</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
