-- ========================================================
-- Schema Migration: Hussein Ali English Academy (حسين علي | تعلم الإنجليزية)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles / Admins Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT 'حسين علي',
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'instructor', 'student')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Levels Table
CREATE TABLE IF NOT EXISTS public.levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL DEFAULT '',
  level_id UUID REFERENCES public.levels(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  instructor_name TEXT NOT NULL DEFAULT 'حسين علي',
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_free BOOLEAN NOT NULL DEFAULT true,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'USD',
  duration_hours DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
  objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL,
  video_provider TEXT NOT NULL DEFAULT 'youtube' CHECK (video_provider IN ('youtube', 'vimeo', 'direct', 'external')),
  duration_minutes INT NOT NULL DEFAULT 0,
  content_notes TEXT,
  resources JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_course_lesson_slug UNIQUE (course_id, slug)
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'حسين علي | تعلم الإنجليزية',
  site_name_en TEXT NOT NULL DEFAULT 'Hussein Ali English Academy',
  instructor_name TEXT NOT NULL DEFAULT 'حسين علي',
  instructor_title TEXT NOT NULL DEFAULT 'مدرس لغة إنجليزية معتمد ومطور محتوى تعليمي',
  instructor_bio TEXT NOT NULL DEFAULT 'مدرس متخصص في تبسيط قواعد ومحادثات اللغة الإنجليزية بطرق عصرية وتطبيقية بعيداً عن التعقيد والحفظ الجاف. أسعى لمساعدة كل متعلم على بناء الثقة والتحدث بطلاقة.',
  instructor_message TEXT NOT NULL DEFAULT 'تعلم اللغة ليس مجرد حفظ كلمات، بل هو فتح باب لعالم وفرص جديدة. خطوتي الأولى معك تبدأ من الأساس وتستمر حتى التمكّن.',
  instructor_avatar TEXT NOT NULL DEFAULT '',
  hero_title TEXT NOT NULL DEFAULT 'تعلّم الإنجليزية بمنهجية حقيقية وفهم عميق',
  hero_subtitle TEXT NOT NULL DEFAULT 'دروس تطبيقية ومناهج واضحة تبدأ معك من الصفر وتأخذك خطوة بخطوة نحو إتقان التحدث والاستماع والقراءة والكتابة.',
  telegram_url TEXT NOT NULL DEFAULT 'https://t.me/gccxic',
  telegram_channel_name TEXT NOT NULL DEFAULT '@gccxic',
  contact_email TEXT NOT NULL DEFAULT 'contact@husseinali-english.com',
  footer_text TEXT NOT NULL DEFAULT 'جميع الحقوق محفوظة © حسين علي لتعليم اللغة الإنجليزية',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Future Expansion Tables: Students, Enrollments, Progress
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  CONSTRAINT unique_student_course UNIQUE (student_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT true,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_student_lesson UNIQUE (student_id, lesson_id)
);

-- Indexes for maximum performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_level ON public.courses(level_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(course_id, order_index);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first so migration is idempotent
DROP POLICY IF EXISTS "Public can view published courses" ON public.courses;
DROP POLICY IF EXISTS "Public can view published lessons of published courses" ON public.lessons;
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view levels" ON public.levels;
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins full access to courses" ON public.courses;
DROP POLICY IF EXISTS "Admins full access to lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admins full access to categories" ON public.categories;
DROP POLICY IF EXISTS "Admins full access to levels" ON public.levels;
DROP POLICY IF EXISTS "Admins full access to settings" ON public.site_settings;

-- Public read access for published courses & lessons
CREATE POLICY "Public can view published courses" ON public.courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view published lessons of published courses" ON public.lessons
  FOR SELECT USING (
    is_published = true AND EXISTS (
      SELECT 1 FROM public.courses WHERE courses.id = lessons.course_id AND courses.is_published = true
    )
  );

CREATE POLICY "Public can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view levels" ON public.levels
  FOR SELECT USING (true);

CREATE POLICY "Public can view site settings" ON public.site_settings
  FOR SELECT USING (true);

-- Admin full access policies based on auth
CREATE POLICY "Admins full access to courses" ON public.courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Admins full access to lessons" ON public.lessons
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Admins full access to categories" ON public.categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Admins full access to levels" ON public.levels
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Admins full access to settings" ON public.site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- ========================================================
-- Performance Indexes
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_order ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON lessons(is_published);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);

