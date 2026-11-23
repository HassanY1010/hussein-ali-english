-- Seed data for Hussein Ali English Academy

-- Insert Categories
INSERT INTO public.categories (id, name_ar, name_en, slug, description, order_index) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'قواعد اللغة', 'Grammar', 'grammar', 'تفكيك القواعد بأسلوب منطقي مبسط دون تعقيد نظري', 1),
  ('a2222222-2222-2222-2222-222222222222', 'المحادثة والطلاقة', 'Speaking', 'speaking', 'تطوير سرعة الاستجابة وبناء الجمل والتحدث بثقة', 2),
  ('a3333333-3333-3333-3333-333333333333', 'المفردات والتراكيب', 'Vocabulary', 'vocabulary', 'بناء قاموس لغوي عملي مستخدم في الحياة اليومية والعمل', 3),
  ('a4444444-4444-4444-4444-444444444444', 'النطق والصوتيات', 'Pronunciation', 'pronunciation', 'إتقان نطق الأصوات وتصحيح اللكنة والوصل الصوتي', 4),
  ('a5555555-5555-5555-5555-555555555555', 'الاستماع والاستيعاب', 'Listening', 'listening', 'تدريب الأذن على فهم المتحدثين الأصليين بمختلف اللهجات', 5),
  ('a6666666-6666-6666-6666-666666666666', 'الكتابة وصياغة النصوص', 'Writing', 'writing', 'مهارات صياغة الإيميلات والفقرات والمقالات المتماسكة', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert Levels
INSERT INTO public.levels (id, name_ar, name_en, slug, description, order_index) VALUES
  ('b1111111-1111-1111-1111-111111111111', 'المستوى المبتدئ', 'Beginner (A1)', 'beginner', 'للراغبين بالبدء من الصفر وبناء اللبنات الأولى للغة', 1),
  ('b2222222-2222-2222-2222-222222222222', 'المستوى الأساسي', 'Elementary (A2)', 'elementary', 'تكوين الجمل البسيطة وفهم العبارات اليومية المباشرة', 2),
  ('b3333333-3333-3333-3333-333333333333', 'المستوى المتوسط', 'Intermediate (B1)', 'intermediate', 'التعامل مع المواقف الحياتية والتعبير عن الآراء والتجارب', 3),
  ('b4444444-4444-4444-4444-444444444444', 'فوق المتوسط', 'Upper Intermediate (B2)', 'upper-intermediate', 'التحدث بطلاقة وتناول موضوعات معقدة وفهم التفاصيل الدقيقة', 4),
  ('b5555555-5555-5555-5555-555555555555', 'المستوى المتقدم', 'Advanced (C1)', 'advanced', 'استخدام اللغة بمرونة واحترافية في السياقات الأكاديمية والمهنية', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert Site Settings
INSERT INTO public.site_settings (
  id,
  site_name,
  site_name_en,
  instructor_name,
  instructor_title,
  instructor_bio,
  instructor_message,
  hero_title,
  hero_subtitle,
  telegram_url,
  telegram_channel_name,
  contact_email,
  footer_text
) VALUES (
  'c1111111-1111-1111-1111-111111111111',
  'حسين علي | تعلم الإنجليزية',
  'Hussein Ali English Academy',
  'حسين علي',
  'أستاذ ومطور محتوى تعليمي للغة الإنجليزية',
  'أهلاً بك، أنا حسين علي، شغفي هو نقل الطالب العربي من مرحلة التردد والخوف من الأخطاء إلى مرحلة الاستيعاب العميق والتحدث التلقائي. بنيت هذه المنصة لتكون مرجعك المنظم بعيداً عن التشتت.',
  'اللغة مهارة مكتسبة وليست موهبة حصرية، حين تفهم التركيب المنطقي للغة وتتدرب عملياً، ستجد تقدمك أسرع بكثير مما تتخيل.',
  'تعلّم الإنجليزية بمنهجية حقيقية وفهم عميق',
  'دروس تطبيقية مبنية بعناية، تبدأ معك من الأساس وتأخذك خطوة بخطوة نحو إتقان القواعد، النطق، والطلاقة اليومية.',
  'https://t.me/gccxic',
  '@gccxic',
  'contact@husseinali-english.com',
  'جميع الحقوق محفوظة © حسين علي | أكاديمية تعلم اللغة الإنجليزية'
) ON CONFLICT (id) DO NOTHING;

-- Insert Courses
INSERT INTO public.courses (
  id,
  title,
  slug,
  short_description,
  description,
  thumbnail_url,
  level_id,
  category_id,
  instructor_name,
  is_published,
  is_featured,
  is_free,
  price,
  duration_hours,
  objectives,
  order_index
) VALUES
  (
    'd1111111-1111-1111-1111-111111111111',
    'المنهج الشامل لإتقان قواعد وأزمنة الإنجليزية',
    'mastering-english-tenses',
    'دليلك العملي لفهم أزمنة الفعل واستخدامها بعفوية دون تردد أو تفكير مسبق.',
    'في هذا الكورس، سنلغي فكرة الحفظ الجاف لجداول الأزمنة. سنركز على السبب المنطقي وراء اختيار زمن معين، والفروقات الجوهرية بين الماضي البسيط والماضي المستمر، والمضارع التام وتطبيقاته اليومية. بنهاية الكورس ستكون قادراً على تركيب أي زمن بدقة وتلقائية.',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    'b2222222-2222-2222-2222-222222222222',
    'a1111111-1111-1111-1111-111111111111',
    'حسين علي',
    true,
    true,
    true,
    0.00,
    3.5,
    '[
      {"text": "فهم فلسفة الزمن في اللغة الإنجليزية واستيعاب متى ولماذا نستخدم كل زمن"},
      {"text": "التمييز الدقيق بين Past Simple و Present Perfect في سياقات الكلام اليومية"},
      {"text": "التدريب على تركيب الجمل النفي والاستفهام بسلاسة تامة"},
      {"text": "تجنب الأخطاء الشائعة التي يقع فيها المتعلمون العرب"}
    ]'::jsonb,
    1
  ),
  (
    'd2222222-2222-2222-2222-222222222222',
    'أسرار المحادثة اليومية والطلاقة التلقائية',
    'everyday-english-fluency',
    'تعلم التحدث دون ترجمة في رأسك، مع أهم التراكيب والعبارات المستخدمة في الحياة الواقعية.',
    'صُمم هذا الكورس خصيصاً لمساعدتك على التغلب على حاجز الخوف من الحديث. نناقش فيه مواقف الحياة اليومية: في المطار، المطعم، العمل، وكيف تعبر عن رأيك وتبدأ حواراً مستمراً بأريحية.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    'b2222222-2222-2222-2222-222222222222',
    'a2222222-2222-2222-2222-222222222222',
    'حسين علي',
    true,
    false,
    true,
    0.00,
    4.0,
    '[
      {"text": "التخلص من الترجمة الحرفية من العربية إلى الإنجليزية أثناء الحديث"},
      {"text": "اكتساب أكثر من 150 عبارة محادثة طبيعية بدلاً من الإنجليزية المترجمة"},
      {"text": "إدارة الحوار وطرح الأسئلة ومتابعة النقاش بذكاء"},
      {"text": "بناء الثقة بالنفس عند التحدث مع متحدثين آخرين"}
    ]'::jsonb,
    2
  ),
  (
    'd3333333-3333-3333-3333-333333333333',
    'دورة النطق الصوتي وتصحيح اللكنة',
    'phonetics-and-accent-mastery',
    'تعلم ميكانيكا إخراج الأصوات، التشديد الصوتي، والوصل الذي يجعل كلامك مفهوماً كالأصليين.',
    'الكثير من الصعوبة في فهم المتحدثين بالإنجليزية نابعة من عدم معرفة قواعد الوصل (Connected Speech) والتشديد (Word Stress). هنا سنتعلم كيف تنطق بشكل واضح وصحيح لتفهم وتُفهم بسهولة.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'b1111111-1111-1111-1111-111111111111',
    'a4444444-4444-4444-4444-444444444444',
    'حسين علي',
    true,
    false,
    true,
    0.00,
    2.5,
    '[
      {"text": "معرفة الأصوات الإنجليزية الصامتة والمتحركة غير الموجودة بالعربية"},
      {"text": "تطبيق قواعد الوصل الصوتي Connected Speech"},
      {"text": "إتقان الـ Word Stress وموسيقى الجملة Intonation"},
      {"text": "تطوير مهارة الاستماع من خلال فهم كيف تُنطق الكلمات عملياً"}
    ]'::jsonb,
    3
  ),
  (
    'd4444444-4444-4444-4444-444444444444',
    'بناء القاموس الذكي: المتلازمات والتعابير الاصطلاحية',
    'smart-vocabulary-and-collocations',
    'لا تحفظ كلمات مفردة بعد اليوم! تعلم كيف تحفظ الكلمات في سياقاتها الصحيحة وبمتلازماتها.',
    'الفرق بين المتحدث المتوسط والمتقدم ليس عدد الكلمات، بل معرفته بالمتلازمات (Collocations) مثل Make a decision بدلاً من Do a decision. كورس عملي ينقل لغتك لمستوى راقٍ.',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    'b3333333-3333-3333-3333-333333333333',
    'a3333333-3333-3333-3333-333333333333',
    'حسين علي',
    true,
    false,
    true,
    0.00,
    3.0,
    '[
      {"text": "تعلم منهجية Collocations لربط الكلمات كما يتحدث أهل اللغة"},
      {"text": "إتقان أكثر من 200 تعبير اصطلاحي Idioms مستخدمة بكثرة"},
      {"text": "التمييز بين اللغة الرسمية Formal وغير الرسمية Informal"},
      {"text": "أساليب عملية لحفظ المفردات طويلة المدى دون نسيان"}
    ]'::jsonb,
    4
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert Lessons for Course 1 (Mastering Tenses)
INSERT INTO public.lessons (
  id,
  course_id,
  title,
  slug,
  description,
  video_url,
  video_provider,
  duration_minutes,
  content_notes,
  resources,
  is_published,
  order_index
) VALUES
  (
    'e1111111-1111-1111-1111-111111111111',
    'd1111111-1111-1111-1111-111111111111',
    'الدرس 1: فلسفة الأزمنة والمضارع البسيط (Present Simple)',
    'present-simple-fundamentals',
    'فهم البنية الأساسية للزمن، متى نستخدمه للحقائق والعادات، والتعامل مع s المفرد والنفي.',
    'https://www.youtube.com/watch?v=L9AWrJnhsRI',
    'youtube',
    18,
    '## ملخص درس المضارع البسيط
- **الاستخدام الرئيسي**: الحقائق العامة، العادات المتكررة، والجداول الثابتة.
- **القاعدة الأساسية**:
  - مع الفاعل الجمع (I, You, We, They) نستخدم الفعل المجرد: *I work here*.
  - مع المفرد الغائب (He, She, It) نضيف s أو es للفعل: *He works here*.
- **السؤال والنفي**:
  - نستخدم *Do / Does* كأفعال مساعدة.
  - السؤال: *Do you speak English?*
  - النفي: *He does not (doesn''t) live in London.*
- **تنبيه مهم من الأستاذ حسين**: لا تضع s مع الفعل إذا سبقه does أو doesn''t.',
    '[{"title": "ملخص الدرس بصيغة PDF", "url": "https://example.com/notes-lesson1.pdf", "type": "pdf"}]'::jsonb,
    true,
    1
  ),
  (
    'e2222222-2222-2222-2222-222222222222',
    'الدرس 2: الماضي البسيط (Past Simple) والأفعال الشاذة',
    'past-simple-and-irregular-verbs',
    'كيف تسرد أحداث الماضي بدقة، سر حفظ الأفعال الشاذة، وصيغ النفي والتساؤل مع Did.',
    'https://www.youtube.com/watch?v=mWh_5nO0Wj4',
    'youtube',
    22,
    '## ملخص درس الماضي البسيط
- **الاستخدام**: لحدث وقع وانتهى تماماً في وقت محدد في الماضي.
- **الأفعال المنتظمة**: يضاف لها ed مثل *watched, played, worked*.
- **الأفعال غير المنتظمة (Irregular)**: لا تتبع قاعدة ويجب فهمها في مجموعات صوتية (مثل: buy-bought, think-thought, bring-brought).
- **النفي والسؤال**:
  - نستخدم *did / didn''t* لجميع الضمائر.
  - بمجرد استخدام did يعود الفعل الرئيسي لمصدره الأصلي مجرداً: *Did you see him?* (وليس Did you saw him).',
    '[{"title": "قائمة أهم 50 فعل شاذ مع أمثلة", "url": "https://example.com/irregular-verbs.pdf", "type": "pdf"}]'::jsonb,
    true,
    2
  ),
  (
    'e3333333-3333-3333-3333-333333333333',
    'الدرس 3: اللغز الأكبر: المضارع التام (Present Perfect)',
    'present-perfect-explained-simply',
    'أسهل طريقة لفهم متى تستخدم Have/Has + P.P ولماذا هو جسر بين الماضي والحاضر.',
    'https://www.youtube.com/watch?v=XWk3_X_D1B8',
    'youtube',
    25,
    '## لماذا يسبب المضارع التام ارتباكاً؟
لأن اللغة العربية لا تحتوي على زمن موازٍ مباشر له.
المضارع التام هو **حدث ماضٍ له أثر أو صلة مباشرة باللحظة الحالية**.
- قارن بين:
  - *I lost my keys.* (الماضي البسيط: ضاعت في الماضي وربما وجدتها الآن).
  - *I have lost my keys.* (المضارع التام: ضاعت وما زالت مفقودة ولا أستطيع دخول المنزل الآن).
- الكلمات المفتاحية الذكية: *Already, Yet, Just, Ever, Never, Since, For*.',
    '[]'::jsonb,
    true,
    3
  ),
  (
    'e4444444-4444-4444-4444-444444444444',
    'الدرس 4: التعبير عن المستقبل (Will vs Going to vs Continuous)',
    'future-forms-in-english',
    'متى تختار will ومتى تختار going to؟ الفروق الدقيقة في الخطط والقرارات اللحظية.',
    'https://www.youtube.com/watch?v=7uV8YwVf7Y0',
    'youtube',
    19,
    '## أدوات المستقبل
1. **Will**: للقرارات اللحظية المفاجئة، الوعود، والتنبؤات بدون دليل قاطع. (*The phone is ringing, I will answer it*).
2. **Going to**: للخطط والنوايا المسبقة، أو تنبؤ يستند لدليل تراه أمامك الآن (*Look at those black clouds! It is going to rain*).
3. **Present Continuous للمستقبل**: للترتيبات المؤكدة مع موعد محدد (*I am meeting Ali tomorrow at 5 PM*).',
    '[]'::jsonb,
    true,
    4
  )
ON CONFLICT (course_id, slug) DO NOTHING;

-- Insert Lessons for Course 2 (Everyday Fluency)
INSERT INTO public.lessons (
  id,
  course_id,
  title,
  slug,
  description,
  video_url,
  video_provider,
  duration_minutes,
  content_notes,
  resources,
  is_published,
  order_index
) VALUES
  (
    'f1111111-1111-1111-1111-111111111111',
    'd2222222-2222-2222-2222-222222222222',
    'الدرس 1: كسر الجمود وبدء محادثة أولى باحترافية (Small Talk)',
    'small-talk-and-conversation-starters',
    'كيف تفتح حديثاً مع أي شخص بالإنجليزية دون إحراج مع عبارات طبيعية.',
    'https://www.youtube.com/watch?v=4T8r4VqT9vQ',
    'youtube',
    16,
    '## فن الـ Small Talk
- بدلاً من السؤال التقليدي المكرر *How are you?* جرب:
  - *How''s your day going so far?*
  - *Working on anything interesting lately?*
  - *Have you been here before?*
- قاعدة الـ 3 ثوانٍ للرد: لا تترجم حرفياً في رأسك، استجب بـ Re-statement ثم أضف معلومة جديدة.',
    '[]'::jsonb,
    true,
    1
  ),
  (
    'f2222222-2222-2222-2222-222222222222',
    'الدرس 2: التعبير عن الرأي والموافقة والاعتراض بأسلوب مهذب',
    'expressing-opinions-and-disagreeing-politely',
    'تجنب الحدة أو الركاكة عند نقاش وجهات النظر واستخدم مفاتيح الحوار الدبلوماسية.',
    'https://www.youtube.com/watch?v=5rG44m9gYp0',
    'youtube',
    20,
    '## التعبير المهذب عن عدم الاتفاق
- لا تقل مباشرة *You are wrong*.
- بل قل:
  - *I see your point, but don''t you think...?*
  - *I''m not entirely sure about that because...*
  - *From my experience, it tends to be a bit different.*',
    '[]'::jsonb,
    true,
    2
  )
ON CONFLICT (course_id, slug) DO NOTHING;
