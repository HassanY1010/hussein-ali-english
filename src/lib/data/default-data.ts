import { Category, Level, Course, Lesson, SiteSettings } from "@/types/database";

export const defaultCategories: Category[] = [
  {
    id: "a1111111-1111-1111-1111-111111111111",
    name_ar: "قواعد اللغة",
    name_en: "Grammar",
    slug: "grammar",
    description: "تفكيك القواعد بأسلوب منطقي مبسط دون تعقيد نظري",
    order_index: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "a2222222-2222-2222-2222-222222222222",
    name_ar: "المحادثة والطلاقة",
    name_en: "Speaking",
    slug: "speaking",
    description: "تطوير سرعة الاستجابة وبناء الجمل والتحدث بثقة",
    order_index: 2,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "a3333333-3333-3333-3333-333333333333",
    name_ar: "المفردات والتراكيب",
    name_en: "Vocabulary",
    slug: "vocabulary",
    description: "بناء قاموس لغوي عملي مستخدم في الحياة اليومية والعمل",
    order_index: 3,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "a4444444-4444-4444-4444-444444444444",
    name_ar: "النطق والصوتيات",
    name_en: "Pronunciation",
    slug: "pronunciation",
    description: "إتقان نطق الأصوات وتصحيح اللكنة والوصل الصوتي",
    order_index: 4,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "a5555555-5555-5555-5555-555555555555",
    name_ar: "الاستماع والاستيعاب",
    name_en: "Listening",
    slug: "listening",
    description: "تدريب الأذن على فهم المتحدثين الأصليين بمختلف اللهجات",
    order_index: 5,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "a6666666-6666-6666-6666-666666666666",
    name_ar: "الكتابة وصياغة النصوص",
    name_en: "Writing",
    slug: "writing",
    description: "مهارات صياغة الإيميلات والفقرات والمقالات المتماسكة",
    order_index: 6,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const defaultLevels: Level[] = [
  {
    id: "b1111111-1111-1111-1111-111111111111",
    name_ar: "المستوى المبتدئ",
    name_en: "Beginner (A1)",
    slug: "beginner",
    description: "للراغبين بالبدء من الصفر وبناء اللبنات الأولى للغة",
    order_index: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "b2222222-2222-2222-2222-222222222222",
    name_ar: "المستوى الأساسي",
    name_en: "Elementary (A2)",
    slug: "elementary",
    description: "تكوين الجمل البسيطة وفهم العبارات اليومية المباشرة",
    order_index: 2,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "b3333333-3333-3333-3333-333333333333",
    name_ar: "المستوى المتوسط",
    name_en: "Intermediate (B1)",
    slug: "intermediate",
    description: "التعامل مع المواقف الحياتية والتعبير عن الآراء والتجارب",
    order_index: 3,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "b4444444-4444-4444-4444-444444444444",
    name_ar: "فوق المتوسط",
    name_en: "Upper Intermediate (B2)",
    slug: "upper-intermediate",
    description: "التحدث بطلاقة وتناول موضوعات معقدة وفهم التفاصيل الدقيقة",
    order_index: 4,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "b5555555-5555-5555-5555-555555555555",
    name_ar: "المستوى المتقدم",
    name_en: "Advanced (C1)",
    slug: "advanced",
    description: "استخدام اللغة بمرونة واحترافية في السياقات الأكاديمية والمهنية",
    order_index: 5,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const defaultSiteSettings: SiteSettings = {
  id: "c1111111-1111-1111-1111-111111111111",
  site_name: "حسين علي | تعلم الإنجليزية",
  site_name_en: "Hussein Ali English Academy",
  instructor_name: "حسين علي",
  instructor_title: "أستاذ ومطور محتوى تعليمي للغة الإنجليزية",
  instructor_bio:
    "أهلاً بك، أنا حسين علي، شغفي هو نقل الطالب العربي من مرحلة التردد والخوف من الأخطاء إلى مرحلة الاستيعاب العميق والتحدث التلقائي. بنيت هذه المنصة لتكون مرجعك المنظم بعيداً عن التشتت.",
  instructor_message:
    "اللغة مهارة مكتسبة وليست موهبة حصرية، حين تفهم التركيب المنطقي للغة وتتدرب عملياً، ستجد تقدمك أسرع بكثير مما تتخيل.",
  instructor_avatar: "",
  hero_title: "تعلّم الإنجليزية بمنهجية حقيقية وفهم عميق",
  hero_subtitle:
    "دروس تطبيقية مبنية بعناية، تبدأ معك من الأساس وتأخذك خطوة بخطوة نحو إتقان القواعد، النطق، والطلاقة في المحادثة.",
  telegram_url: "https://t.me/gccxic",
  telegram_channel_name: "@gccxic",
  contact_email: "contact@husseinali-english.com",
  footer_text: "جميع الحقوق محفوظة © حسين علي | أكاديمية تعلم اللغة الإنجليزية",
  updated_at: new Date().toISOString(),
};

// Clean slate: Zero demo courses or lessons
export const defaultCourses: Course[] = [];
export const defaultLessons: Lesson[] = [];
