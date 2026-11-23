const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: DATABASE_URL environment variable is missing.");
  process.exit(1);
}

async function runMigration() {
  console.log("Connecting to Supabase PostgreSQL database...");
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✓ Connected successfully to Supabase PostgreSQL!");

    // 1. Run Schema
    const schemaPath = path.join(__dirname, "..", "supabase", "migrations", "20261123_init_schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    console.log("Applying schema...");
    await client.query(schemaSql);
    console.log("✓ Schema applied.");

    // 2. Run Seed (Essential taxonomies and settings only — zero demo courses/lessons)
    const seedStatements = [
      // Categories
      `INSERT INTO public.categories (id, name_ar, name_en, slug, description, order_index) VALUES
        ('a1111111-1111-1111-1111-111111111111', 'قواعد اللغة', 'Grammar', 'grammar', 'تفكيك القواعد بأسلوب منطقي مبسط دون تعقيد نظري', 1),
        ('a2222222-2222-2222-2222-222222222222', 'المحادثة والطلاقة', 'Speaking', 'speaking', 'تطوير سرعة الاستجابة وبناء الجمل والتحدث بثقة', 2),
        ('a3333333-3333-3333-3333-333333333333', 'المفردات والتراكيب', 'Vocabulary', 'vocabulary', 'بناء قاموس لغوي عملي مستخدم في الحياة اليومية والعمل', 3),
        ('a4444444-4444-4444-4444-444444444444', 'النطق والصوتيات', 'Pronunciation', 'pronunciation', 'إتقان نطق الأصوات وتصحيح اللكنة والوصل الصوتي', 4),
        ('a5555555-5555-5555-5555-555555555555', 'الاستماع والاستيعاب', 'Listening', 'listening', 'تدريب الأذن على فهم المتحدثين الأصليين بمختلف اللهجات', 5),
        ('a6666666-6666-6666-6666-666666666666', 'الكتابة وصياغة النصوص', 'Writing', 'writing', 'مهارات صياغة الإيميلات والفقرات والمقالات المتماسكة', 6)
      ON CONFLICT (slug) DO NOTHING;`,

      // Levels
      `INSERT INTO public.levels (id, name_ar, name_en, slug, description, order_index) VALUES
        ('b1111111-1111-1111-1111-111111111111', 'المستوى المبتدئ', 'Beginner (A1)', 'beginner', 'للراغبين بالبدء من الصفر وبناء اللبنات الأولى للغة', 1),
        ('b2222222-2222-2222-2222-222222222222', 'المستوى الأساسي', 'Elementary (A2)', 'elementary', 'تكوين الجمل البسيطة وفهم العبارات اليومية المباشرة', 2),
        ('b3333333-3333-3333-3333-333333333333', 'المستوى المتوسط', 'Intermediate (B1)', 'intermediate', 'التعامل مع المواقف الحياتية والتعبير عن الآراء والتجارب', 3),
        ('b4444444-4444-4444-4444-444444444444', 'فوق المتوسط', 'Upper Intermediate (B2)', 'upper-intermediate', 'التحدث بطلاقة وتناول موضوعات معقدة وفهم التفاصيل الدقيقة', 4),
        ('b5555555-5555-5555-5555-555555555555', 'المستوى المتقدم', 'Advanced (C1)', 'advanced', 'استخدام اللغة بمرونة واحترافية في السياقات الأكاديمية والمهنية', 5)
      ON CONFLICT (slug) DO NOTHING;`,

      // Settings
      `INSERT INTO public.site_settings (
        id, site_name, site_name_en, instructor_name, instructor_title, instructor_bio,
        instructor_message, hero_title, hero_subtitle, telegram_url, telegram_channel_name,
        contact_email, footer_text
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
      ) ON CONFLICT (id) DO NOTHING;`
    ];

    for (const stmt of seedStatements) {
      await client.query(stmt);
    }
    console.log("✓ Seed data inserted successfully!");

    // Verify
    const resCourses = await client.query("SELECT COUNT(*) FROM public.courses");
    const resLessons = await client.query("SELECT COUNT(*) FROM public.lessons");
    console.log(`✓ Verification on live Supabase:`);
    console.log(`  - Courses count: ${resCourses.rows[0].count}`);
    console.log(`  - Lessons count: ${resLessons.rows[0].count}`);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
