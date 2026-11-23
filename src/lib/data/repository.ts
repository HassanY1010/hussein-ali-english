import fs from "fs";
import path from "path";
import { Category, Level, Course, Lesson, SiteSettings } from "@/types/database";
import {
  defaultCategories,
  defaultLevels,
  defaultCourses,
  defaultLessons,
  defaultSiteSettings,
} from "./default-data";
import { createAdminClient } from "@/lib/supabase/admin";

interface LocalStore {
  categories: Category[];
  levels: Level[];
  courses: Course[];
  lessons: Lesson[];
  settings: SiteSettings;
}

const STORE_PATH = path.join(process.cwd(), "data", "store.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function getLocalStore(): LocalStore {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading local store, falling back to defaults:", err);
  }

  const initialStore: LocalStore = {
    categories: defaultCategories,
    levels: defaultLevels,
    courses: defaultCourses,
    lessons: defaultLessons,
    settings: defaultSiteSettings,
  };

  try {
    ensureDirectoryExistence(STORE_PATH);
    fs.writeFileSync(STORE_PATH, JSON.stringify(initialStore, null, 2), "utf-8");
  } catch (err) {
    console.error("Error initializing local store file:", err);
  }

  return initialStore;
}

function saveLocalStore(store: LocalStore) {
  try {
    ensureDirectoryExistence(STORE_PATH);
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local store:", err);
  }
}

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

// ----------------------------------------------------------------------
// Unified Repository Operations
// ----------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
      if (!error && data) return data as SiteSettings;
    } catch {
      // fallback to store
    }
  }

  const store = getLocalStore();
  return store.settings || defaultSiteSettings;
}

export async function updateSiteSettings(settingsUpdate: Partial<SiteSettings>): Promise<SiteSettings> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const current = await getSiteSettings();
      const { data, error } = await supabase
        .from("site_settings")
        .update({ ...settingsUpdate, updated_at: new Date().toISOString() })
        .eq("id", current.id)
        .select()
        .single();
      if (!error && data) return data as SiteSettings;
    } catch {
      // fallback
    }
  }

  const store = getLocalStore();
  store.settings = {
    ...store.settings,
    ...settingsUpdate,
    updated_at: new Date().toISOString(),
  };
  saveLocalStore(store);
  return store.settings;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    } catch {
      // fallback
    }
  }

  const store = getLocalStore();
  return store.categories.sort((a, b) => a.order_index - b.order_index);
}

export async function getLevels(): Promise<Level[]> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .order("order_index", { ascending: true });
      if (!error && data && data.length > 0) return data as Level[];
    } catch {
      // fallback
    }
  }

  const store = getLocalStore();
  return store.levels.sort((a, b) => a.order_index - b.order_index);
}

export async function getCourses(options?: {
  publishedOnly?: boolean;
  categorySlug?: string;
  levelSlug?: string;
  searchQuery?: string;
}): Promise<Course[]> {
  const categories = await getCategories();
  const levels = await getLevels();
  const store = getLocalStore();

  const supabase = createAdminClient();
  let coursesList: Course[] = [];

  if (supabase && isSupabaseConfigured()) {
    try {
      let query = supabase.from("courses").select("*").order("order_index", { ascending: true });
      if (options?.publishedOnly) {
        query = query.eq("is_published", true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        coursesList = data as Course[];
      } else {
        coursesList = store.courses;
      }
    } catch {
      coursesList = store.courses;
    }
  } else {
    coursesList = store.courses;
  }

  // Attach relational data & count lessons
  let result = coursesList.map((c) => {
    const level = levels.find((l) => l.id === c.level_id);
    const category = categories.find((cat) => cat.id === c.category_id);
    const lessonsCount = store.lessons.filter(
      (l) => l.course_id === c.id && (!options?.publishedOnly || l.is_published)
    ).length;

    return {
      ...c,
      level,
      category,
      lessons_count: lessonsCount,
    };
  });

  if (options?.publishedOnly) {
    result = result.filter((c) => c.is_published);
  }

  if (options?.categorySlug && options.categorySlug !== "all") {
    result = result.filter((c) => c.category?.slug === options.categorySlug);
  }

  if (options?.levelSlug && options.levelSlug !== "all") {
    result = result.filter((c) => c.level?.slug === options.levelSlug);
  }

  if (options?.searchQuery && options.searchQuery.trim() !== "") {
    const q = options.searchQuery.toLowerCase().trim();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.short_description.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => a.order_index - b.order_index);
}

export async function getCourseBySlug(
  slug: string,
  options?: { publishedOnly?: boolean }
): Promise<Course | null> {
  const courses = await getCourses(options);
  const found = courses.find((c) => c.slug === slug);
  return found || null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  const found = courses.find((c) => c.id === id);
  return found || null;
}

export async function getCourseLessons(
  courseId: string,
  options?: { publishedOnly?: boolean }
): Promise<Lesson[]> {
  const store = getLocalStore();
  const supabase = createAdminClient();

  if (supabase && isSupabaseConfigured()) {
    try {
      let query = supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });
      if (options?.publishedOnly) {
        query = query.eq("is_published", true);
      }
      const { data, error } = await query;
      if (!error && data) return data as Lesson[];
    } catch {
      // fallback
    }
  }

  let lessons = store.lessons.filter((l) => l.course_id === courseId);
  if (options?.publishedOnly) {
    lessons = lessons.filter((l) => l.is_published);
  }
  return lessons.sort((a, b) => a.order_index - b.order_index);
}

export async function getLessonBySlug(
  courseSlug: string,
  lessonSlug: string,
  options?: { publishedOnly?: boolean }
): Promise<{ course: Course; lesson: Lesson; allLessons: Lesson[] } | null> {
  const course = await getCourseBySlug(courseSlug, options);
  if (!course) return null;

  const allLessons = await getCourseLessons(course.id, options);
  const lesson = allLessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;

  return { course, lesson, allLessons };
}

// ----------------------------------------------------------------------
// Course CRUD (Admin)
// ----------------------------------------------------------------------

export async function createCourse(
  input: Omit<Course, "id" | "created_at" | "updated_at">
): Promise<Course> {
  const newCourse: Course = {
    ...input,
    id: `course_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("courses").insert(newCourse).select().single();
      if (!error && data) return data as Course;
    } catch (e) {
      console.warn("Supabase insert course failed, falling back to store:", e);
    }
  }

  const store = getLocalStore();
  store.courses.push(newCourse);
  saveLocalStore(store);
  return newCourse;
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("courses")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return data as Course;
    } catch (e) {
      console.warn("Supabase update course failed:", e);
    }
  }

  const store = getLocalStore();
  const index = store.courses.findIndex((c) => c.id === id);
  if (index === -1) return null;

  store.courses[index] = {
    ...store.courses[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveLocalStore(store);
  return store.courses[index];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("courses").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase delete course failed:", e);
    }
  }

  const store = getLocalStore();
  store.courses = store.courses.filter((c) => c.id !== id);
  store.lessons = store.lessons.filter((l) => l.course_id !== id);
  saveLocalStore(store);
  return true;
}

// ----------------------------------------------------------------------
// Lesson CRUD (Admin)
// ----------------------------------------------------------------------

export async function createLesson(
  input: Omit<Lesson, "id" | "created_at" | "updated_at">
): Promise<Lesson> {
  const newLesson: Lesson = {
    ...input,
    id: `lesson_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("lessons").insert(newLesson).select().single();
      if (!error && data) return data as Lesson;
    } catch (e) {
      console.warn("Supabase insert lesson failed:", e);
    }
  }

  const store = getLocalStore();
  store.lessons.push(newLesson);
  saveLocalStore(store);
  return newLesson;
}

export async function updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson | null> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("lessons")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return data as Lesson;
    } catch (e) {
      console.warn("Supabase update lesson failed:", e);
    }
  }

  const store = getLocalStore();
  const index = store.lessons.findIndex((l) => l.id === id);
  if (index === -1) return null;

  store.lessons[index] = {
    ...store.lessons[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveLocalStore(store);
  return store.lessons[index];
}

export async function deleteLesson(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("lessons").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase delete lesson failed:", e);
    }
  }

  const store = getLocalStore();
  store.lessons = store.lessons.filter((l) => l.id !== id);
  saveLocalStore(store);
  return true;
}

export async function reorderLessons(courseId: string, orderedLessonIds: string[]): Promise<boolean> {
  const store = getLocalStore();
  orderedLessonIds.forEach((id, index) => {
    const l = store.lessons.find((item) => item.id === id && item.course_id === courseId);
    if (l) {
      l.order_index = index + 1;
      l.updated_at = new Date().toISOString();
    }
  });
  saveLocalStore(store);

  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      for (let i = 0; i < orderedLessonIds.length; i++) {
        await supabase
          .from("lessons")
          .update({ order_index: i + 1 })
          .eq("id", orderedLessonIds[i]);
      }
    } catch (e) {
      console.warn("Supabase reorder lessons failed:", e);
    }
  }

  return true;
}

// ----------------------------------------------------------------------
// Category & Level Management
// ----------------------------------------------------------------------

export async function createCategory(input: {
  name_ar: string;
  name_en: string;
  slug: string;
  description?: string;
}): Promise<Category> {
  const store = getLocalStore();
  const newCat: Category = {
    id: `cat_${Date.now()}`,
    name_ar: input.name_ar,
    name_en: input.name_en,
    slug: input.slug,
    description: input.description,
    order_index: store.categories.length + 1,
    created_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from("categories").insert(newCat).select().single();
      if (data) return data as Category;
    } catch {}
  }

  store.categories.push(newCat);
  saveLocalStore(store);
  return newCat;
}

export async function createLevel(input: {
  name_ar: string;
  name_en: string;
  slug: string;
  description?: string;
}): Promise<Level> {
  const store = getLocalStore();
  const newLevel: Level = {
    id: `level_${Date.now()}`,
    name_ar: input.name_ar,
    name_en: input.name_en,
    slug: input.slug,
    description: input.description,
    order_index: store.levels.length + 1,
    created_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from("levels").insert(newLevel).select().single();
      if (data) return data as Level;
    } catch {}
  }

  store.levels.push(newLevel);
  saveLocalStore(store);
  return newLevel;
}

// ----------------------------------------------------------------------
// Admin Dashboard Metrics
// ----------------------------------------------------------------------

export async function getAdminStats() {
  const courses = await getCourses();
  const store = getLocalStore();
  const publishedCourses = courses.filter((c) => c.is_published).length;
  const draftCourses = courses.length - publishedCourses;
  const totalLessons = store.lessons.length;
  const categories = await getCategories();
  const levels = await getLevels();

  return {
    totalCourses: courses.length,
    publishedCourses,
    draftCourses,
    totalLessons,
    totalCategories: categories.length,
    totalLevels: levels.length,
  };
}
