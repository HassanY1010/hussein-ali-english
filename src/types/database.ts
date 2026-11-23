export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description?: string | null;
  order_index: number;
  created_at: string;
}

export interface Level {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description?: string | null;
  order_index: number;
  created_at: string;
}

export interface CourseObjective {
  id?: string;
  text: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  thumbnail_url: string;
  level_id: string;
  category_id: string;
  instructor_name: string;
  is_published: boolean;
  is_featured: boolean;
  is_free: boolean;
  price: number;
  currency: string;
  duration_hours: number;
  objectives: CourseObjective[];
  order_index: number;
  created_at: string;
  updated_at: string;
  // joined relations
  level?: Level;
  category?: Category;
  lessons_count?: number;
}

export interface LessonResource {
  title: string;
  url: string;
  type?: "pdf" | "link" | "doc";
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  description: string;
  video_url: string;
  video_provider: "youtube" | "vimeo" | "direct" | "external";
  duration_minutes: number;
  content_notes?: string | null;
  resources: LessonResource[];
  is_published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  site_name_en: string;
  instructor_name: string;
  instructor_title: string;
  instructor_bio: string;
  instructor_message: string;
  instructor_avatar: string;
  hero_title: string;
  hero_subtitle: string;
  telegram_url: string;
  telegram_channel_name: string;
  contact_email: string;
  footer_text: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
}
