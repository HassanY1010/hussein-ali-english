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
    "أهلاً بك، أنا حسين علي، شغفي هو نقل المتعلم العربي من مرحلة التردد والخوف من الأخطاء إلى مرحلة الاستيعاب الحقيقي والتحدث التلقائي. بنيت هذه المنصة لتكون مرجعك المنظم بعيداً عن العشوائية والتشتت.",
  instructor_message:
    "تعلم اللغة مهارة عملية تتطلب فقط المنهج الواضح والاستمرار. حين تفهم التركيب المنطقي للغة، ستجد أنك قادر على التعبير بطلاقة وثقة دون تعقيد.",
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

export const defaultCourses: Course[] = [
  {
    id: "d1111111-1111-1111-1111-111111111111",
    title: "المنهج الشامل لإتقان قواعد وأزمنة الإنجليزية",
    slug: "mastering-english-tenses",
    short_description:
      "دليلك العملي لفهم أزمنة الفعل واستخدامها بعفوية دون تردد أو تفكير مسبق.",
    description:
      "في هذا الكورس، سنلغي فكرة الحفظ الجاف لجداول الأزمنة. سنركز على السبب المنطقي وراء اختيار زمن معين، والفروقات الجوهرية بين الماضي البسيط والماضي المستمر، والمضارع التام وتطبيقاته اليومية. بنهاية الكورس ستكون قادراً على تركيب أي زمن بدقة وتلقائية.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    level_id: "b2222222-2222-2222-2222-222222222222",
    category_id: "a1111111-1111-1111-1111-111111111111",
    instructor_name: "حسين علي",
    is_published: true,
    is_featured: true,
    is_free: true,
    price: 0,
    currency: "USD",
    duration_hours: 3.5,
    objectives: [
      { text: "فهم فلسفة الزمن في اللغة الإنجليزية واستيعاب متى ولماذا نستخدم كل زمن" },
      { text: "التمييز الدقيق بين Past Simple و Present Perfect في سياقات الكلام اليومية" },
      { text: "التدريب على تركيب جمل النفي والاستفهام بسلاسة تامة" },
      { text: "تجنب الأخطاء الشائعة التي يقع فيها المتعلمون العرب" },
    ],
    order_index: 1,
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "d2222222-2222-2222-2222-222222222222",
    title: "أسرار المحادثة اليومية والطلاقة التلقائية",
    slug: "everyday-english-fluency",
    short_description:
      "تعلم التحدث دون ترجمة في رأسك، مع أهم التراكيب والعبارات المستخدمة في الحياة الواقعية.",
    description:
      "صُمم هذا الكورس خصيصاً لمساعدتك على التغلب على حاجز الخوف من الحديث. نناقش فيه مواقف الحياة اليومية: في المطار، المطعم، العمل، وكيف تعبر عن رأيك وتبدأ حواراً مستمراً بأريحية تامة.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    level_id: "b2222222-2222-2222-2222-222222222222",
    category_id: "a2222222-2222-2222-2222-222222222222",
    instructor_name: "حسين علي",
    is_published: true,
    is_featured: false,
    is_free: true,
    price: 0,
    currency: "USD",
    duration_hours: 4.0,
    objectives: [
      { text: "التخلص من الترجمة الحرفية من العربية إلى الإنجليزية أثناء الحديث" },
      { text: "اكتساب أكثر من 150 عبارة محادثة طبيعية بدلاً من الإنجليزية المترجمة" },
      { text: "إدارة الحوار وطرح الأسئلة ومتابعة النقاش بذكاء" },
      { text: "بناء الثقة بالنفس عند التحدث مع متحدثين آخرين" },
    ],
    order_index: 2,
    created_at: "2026-01-15T12:00:00Z",
    updated_at: "2026-01-15T12:00:00Z",
  },
  {
    id: "d3333333-3333-3333-3333-333333333333",
    title: "دورة النطق الصوتي وتصحيح اللكنة",
    slug: "phonetics-and-accent-mastery",
    short_description:
      "تعلم ميكانيكا إخراج الأصوات، التشديد الصوتي، والوصل الذي يجعل كلامك مفهوماً كالأصليين.",
    description:
      "الكثير من الصعوبة في فهم المتحدثين بالإنجليزية نابعة من عدم معرفة قواعد الوصل (Connected Speech) والتشديد (Word Stress). هنا سنتعلم كيف تنطق بشكل واضح وصحيح لتفهم وتُفهم بسهولة.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    level_id: "b1111111-1111-1111-1111-111111111111",
    category_id: "a4444444-4444-4444-4444-444444444444",
    instructor_name: "حسين علي",
    is_published: true,
    is_featured: false,
    is_free: true,
    price: 0,
    currency: "USD",
    duration_hours: 2.5,
    objectives: [
      { text: "معرفة الأصوات الإنجليزية الصامتة والمتحركة غير الموجودة بالعربية" },
      { text: "تطبيق قواعد الوصل الصوتي Connected Speech" },
      { text: "إتقان الـ Word Stress وموسيقى الجملة Intonation" },
      { text: "تطوير مهارة الاستماع من خلال فهم كيف تُنطق الكلمات عملياً" },
    ],
    order_index: 3,
    created_at: "2026-01-20T14:00:00Z",
    updated_at: "2026-01-20T14:00:00Z",
  },
  {
    id: "d4444444-4444-4444-4444-444444444444",
    title: "بناء القاموس الذكي: المتلازمات والتعابير الاصطلاحية",
    slug: "smart-vocabulary-and-collocations",
    short_description:
      "لا تحفظ كلمات مفردة بعد اليوم! تعلم كيف تحفظ الكلمات في سياقاتها الصحيحة وبمتلازماتها.",
    description:
      "الفرق بين المتحدث المتوسط والمتقدم ليس عدد الكلمات، بل معرفته بالمتلازمات (Collocations) مثل Make a decision بدلاً من Do a decision. كورس عملي ينقل لغتك لمستوى راقٍ.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    level_id: "b3333333-3333-3333-3333-333333333333",
    category_id: "a3333333-3333-3333-3333-333333333333",
    instructor_name: "حسين علي",
    is_published: true,
    is_featured: false,
    is_free: true,
    price: 0,
    currency: "USD",
    duration_hours: 3.0,
    objectives: [
      { text: "تعلم منهجية Collocations لربط الكلمات كما يتحدث أهل اللغة" },
      { text: "إتقان أكثر من 200 تعبير اصطلاحي Idioms مستخدمة بكثرة" },
      { text: "التمييز بين اللغة الرسمية Formal وغير الرسمية Informal" },
      { text: "أساليب عملية لحفظ المفردات طويلة المدى دون نسيان" },
    ],
    order_index: 4,
    created_at: "2026-01-25T16:00:00Z",
    updated_at: "2026-01-25T16:00:00Z",
  },
];

export const defaultLessons: Lesson[] = [
  {
    id: "e1111111-1111-1111-1111-111111111111",
    course_id: "d1111111-1111-1111-1111-111111111111",
    title: "الدرس 1: فلسفة الأزمنة والمضارع البسيط (Present Simple)",
    slug: "present-simple-fundamentals",
    description:
      "فهم البنية الأساسية للزمن، متى نستخدمه للحقائق والعادات، والتعامل مع s المفرد والنفي.",
    video_url: "https://www.youtube.com/watch?v=L9AWrJnhsRI",
    video_provider: "youtube",
    duration_minutes: 18,
    content_notes: `## ملخص درس المضارع البسيط
- **الاستخدام الرئيسي**: الحقائق العامة، العادات المتكررة، والجداول الثابتة.
- **القاعدة الأساسية**:
  - مع الفاعل الجمع (I, You, We, They) نستخدم الفعل المجرد: *I work here*.
  - مع المفرد الغائب (He, She, It) نضيف s أو es للفعل: *He works here*.
- **السؤال والنفي**:
  - نستخدم *Do / Does* كأفعال مساعدة.
  - السؤال: *Do you speak English?*
  - النفي: *He does not (doesn't) live in London.*
- **تنبيه مهم من الأستاذ حسين**: لا تضع s مع الفعل إذا سبقه does أو doesn't.`,
    resources: [
      { title: "ملخص الدرس بصيغة PDF", url: "https://example.com/notes-lesson1.pdf", type: "pdf" },
    ],
    is_published: true,
    order_index: 1,
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "e2222222-2222-2222-2222-222222222222",
    course_id: "d1111111-1111-1111-1111-111111111111",
    title: "الدرس 2: الماضي البسيط (Past Simple) والأفعال الشاذة",
    slug: "past-simple-and-irregular-verbs",
    description:
      "كيف تسرد أحداث الماضي بدقة، سر حفظ الأفعال الشاذة، وصيغ النفي والتساؤل مع Did.",
    video_url: "https://www.youtube.com/watch?v=mWh_5nO0Wj4",
    video_provider: "youtube",
    duration_minutes: 22,
    content_notes: `## ملخص درس الماضي البسيط
- **الاستخدام**: لحدث وقع وانتهى تماماً في وقت محدد في الماضي.
- **الأفعال المنتظمة**: يضاف لها ed مثل *watched, played, worked*.
- **الأفعال غير المنتظمة (Irregular)**: لا تتبع قاعدة ويجب فهمها في مجموعات صوتية (مثل: buy-bought, think-thought).
- **النفي والسؤال**:
  - نستخدم *did / didn't* لجميع الضمائر.
  - بمجرد استخدام did يعود الفعل الرئيسي لمصدره الأصلي: *Did you see him?*`,
    resources: [
      { title: "قائمة أهم 50 فعل شاذ مع أمثلة", url: "https://example.com/irregular-verbs.pdf", type: "pdf" },
    ],
    is_published: true,
    order_index: 2,
    created_at: "2026-01-10T11:00:00Z",
    updated_at: "2026-01-10T11:00:00Z",
  },
  {
    id: "e3333333-3333-3333-3333-333333333333",
    course_id: "d1111111-1111-1111-1111-111111111111",
    title: "الدرس 3: اللغز الأكبر: المضارع التام (Present Perfect)",
    slug: "present-perfect-explained-simply",
    description:
      "أسهل طريقة لفهم متى تستخدم Have/Has + P.P ولماذا هو جسر بين الماضي والحاضر.",
    video_url: "https://www.youtube.com/watch?v=XWk3_X_D1B8",
    video_provider: "youtube",
    duration_minutes: 25,
    content_notes: `## لماذا يسبب المضارع التام ارتباكاً؟
المضارع التام هو **حدث ماضٍ له أثر أو صلة مباشرة باللحظة الحالية**.
- قارن بين:
  - *I lost my keys.* (الماضي البسيط: ضاعت في الماضي وربما وجدتها الآن).
  - *I have lost my keys.* (المضارع التام: ضاعت وما زالت مفقودة ولا أستطيع دخول المنزل الآن).
- الكلمات المفتاحية الذكية: *Already, Yet, Just, Ever, Never, Since, For*.`,
    resources: [],
    is_published: true,
    order_index: 3,
    created_at: "2026-01-10T12:00:00Z",
    updated_at: "2026-01-10T12:00:00Z",
  },
  {
    id: "e4444444-4444-4444-4444-444444444444",
    course_id: "d1111111-1111-1111-1111-111111111111",
    title: "الدرس 4: التعبير عن المستقبل (Will vs Going to vs Continuous)",
    slug: "future-forms-in-english",
    description:
      "متى تختار will ومتى تختار going to؟ الفروق الدقيقة في الخطط والقرارات اللحظية.",
    video_url: "https://www.youtube.com/watch?v=7uV8YwVf7Y0",
    video_provider: "youtube",
    duration_minutes: 19,
    content_notes: `## أدوات المستقبل
1. **Will**: للقرارات اللحظية المفاجئة، الوعود، والتنبؤات بدون دليل قاطع (*I will help you*).
2. **Going to**: للخطط والنوايا المسبقة، أو تنبؤ يستند لدليل تراه أمامك الآن (*Look at those clouds! It is going to rain*).
3. **Present Continuous للمستقبل**: للترتيبات المؤكدة مع موعد محدد (*I am meeting Ali tomorrow at 5 PM*).`,
    resources: [],
    is_published: true,
    order_index: 4,
    created_at: "2026-01-10T13:00:00Z",
    updated_at: "2026-01-10T13:00:00Z",
  },
  {
    id: "f1111111-1111-1111-1111-111111111111",
    course_id: "d2222222-2222-2222-2222-222222222222",
    title: "الدرس 1: كسر الجمود وبدء محادثة أولى باحترافية (Small Talk)",
    slug: "small-talk-and-conversation-starters",
    description:
      "كيف تفتح حديثاً مع أي شخص بالإنجليزية دون إحراج مع عبارات طبيعية.",
    video_url: "https://www.youtube.com/watch?v=4T8r4VqT9vQ",
    video_provider: "youtube",
    duration_minutes: 16,
    content_notes: `## فن الـ Small Talk
- بدلاً من السؤال التقليدي المكرر *How are you?* جرب:
  - *How's your day going so far?*
  - *Working on anything interesting lately?*
  - *Have you been here before?*
- قاعدة الـ 3 ثوانٍ للرد: لا تترجم حرفياً في رأسك، استجب بـ Re-statement ثم أضف معلومة جديدة.`,
    resources: [],
    is_published: true,
    order_index: 1,
    created_at: "2026-01-15T12:00:00Z",
    updated_at: "2026-01-15T12:00:00Z",
  },
  {
    id: "f2222222-2222-2222-2222-222222222222",
    course_id: "d2222222-2222-2222-2222-222222222222",
    title: "الدرس 2: التعبير عن الرأي والموافقة والاعتراض بأسلوب مهذب",
    slug: "expressing-opinions-and-disagreeing-politely",
    description:
      "تجنب الحدة أو الركاكة عند نقاش وجهات النظر واستخدم مفاتيح الحوار الدبلوماسية.",
    video_url: "https://www.youtube.com/watch?v=5rG44m9gYp0",
    video_provider: "youtube",
    duration_minutes: 20,
    content_notes: `## التعبير المهذب عن عدم الاتفاق
- لا تقل مباشرة *You are wrong*.
- بل قل:
  - *I see your point, but don't you think...?*
  - *I'm not entirely sure about that because...*
  - *From my experience, it tends to be a bit different.*`,
    resources: [],
    is_published: true,
    order_index: 2,
    created_at: "2026-01-15T13:00:00Z",
    updated_at: "2026-01-15T13:00:00Z",
  },
];
