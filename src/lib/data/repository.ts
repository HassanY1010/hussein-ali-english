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
import { getDbPool } from "@/lib/db";

const IS_PROD = process.env.NODE_ENV === "production";
const STORE_PATH = path.join(process.cwd(), "data", "store.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function getLocalStore() {
  if (IS_PROD && process.env.DATABASE_URL) {
    throw new Error("Local JSON store is disabled in production. PostgreSQL is the sole data source.");
  }

  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading local store:", err);
  }

  return {
    categories: defaultCategories,
    levels: defaultLevels,
    courses: defaultCourses,
    lessons: defaultLessons,
    settings: defaultSiteSettings,
  };
}

function saveLocalStore(store: any) {
  if (IS_PROD && process.env.DATABASE_URL) {
    // Never write local store in production
    return;
  }
  try {
    ensureDirectoryExistence(STORE_PATH);
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local store:", err);
  }
}

// ----------------------------------------------------------------------
// Production-Strict Repository Operations
// ----------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query("SELECT * FROM public.site_settings LIMIT 1");
      if (res.rows.length > 0) return res.rows[0] as SiteSettings;
      if (IS_PROD) throw new Error("Database returned empty site_settings in production.");
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error in getSiteSettings: ${e.message}`);
      console.warn("DB getSiteSettings fallback in dev mode:", e);
    }
  } else if (IS_PROD) {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  const store = getLocalStore();
  return store.settings || defaultSiteSettings;
}

export async function updateSiteSettings(settingsUpdate: Partial<SiteSettings>): Promise<SiteSettings> {
  const pool = getDbPool();
  if (pool) {
    try {
      const current = await getSiteSettings();
      const fields = Object.keys(settingsUpdate);
      const values = Object.values(settingsUpdate);

      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
      const query = `UPDATE public.site_settings SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`;
      const res = await pool.query(query, [...values, current.id]);
      if (res.rows.length > 0) return res.rows[0] as SiteSettings;
      throw new Error("Failed to update site_settings in database.");
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error in updateSiteSettings: ${e.message}`);
      console.warn("DB updateSiteSettings fallback in dev mode:", e);
    }
  } else if (IS_PROD) {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  const store = getLocalStore();
  store.settings = { ...store.settings, ...settingsUpdate, updated_at: new Date().toISOString() };
  saveLocalStore(store);
  return store.settings;
}

export async function getCategories(): Promise<Category[]> {
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query("SELECT * FROM public.categories ORDER BY order_index ASC");
      if (res.rows.length > 0) return res.rows as Category[];
      if (IS_PROD) throw new Error("No categories found in PostgreSQL database.");
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error in getCategories: ${e.message}`);
      console.warn("DB getCategories fallback in dev mode:", e);
    }
  } else if (IS_PROD) {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  const store = getLocalStore();
  return store.categories.sort((a: any, b: any) => a.order_index - b.order_index);
}

export async function getLevels(): Promise<Level[]> {
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query("SELECT * FROM public.levels ORDER BY order_index ASC");
      if (res.rows.length > 0) return res.rows as Level[];
      if (IS_PROD) throw new Error("No levels found in PostgreSQL database.");
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error in getLevels: ${e.message}`);
      console.warn("DB getLevels fallback in dev mode:", e);
    }
  } else if (IS_PROD) {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  const store = getLocalStore();
  return store.levels.sort((a: any, b: any) => a.order_index - b.order_index);
}

export async function getCourses(options?: {
  publishedOnly?: boolean;
  categorySlug?: string;
  levelSlug?: string;
  searchQuery?: string;
}): Promise<Course[]> {
  const categories = await getCategories();
  const levels = await getLevels();
  const pool = getDbPool();
  let coursesList: Course[] = [];

  if (pool) {
    try {
      let sql = "SELECT * FROM public.courses";
      const params: any[] = [];
      if (options?.publishedOnly) {
        sql += " WHERE is_published = true";
      }
      sql += " ORDER BY order_index ASC";
      const res = await pool.query(sql, params);
      coursesList = res.rows as Course[];
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error in getCourses: ${e.message}`);
      console.warn("DB getCourses fallback in dev mode:", e);
    }
  } else if (IS_PROD) {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  if (coursesList.length === 0 && !IS_PROD) {
    const store = getLocalStore();
    coursesList = store.courses;
  }

  // Count lessons for each course
  let lessonCounts: Record<string, number> = {};
  if (pool) {
    try {
      const lRes = await pool.query(
        "SELECT course_id, COUNT(*) as count FROM public.lessons" +
          (options?.publishedOnly ? " WHERE is_published = true" : "") +
          " GROUP BY course_id"
      );
      lRes.rows.forEach((r) => {
        lessonCounts[r.course_id] = parseInt(r.count, 10);
      });
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error counting lessons: ${e.message}`);
    }
  } else if (!IS_PROD) {
    const store = getLocalStore();
    store.lessons.forEach((l: any) => {
      if (!options?.publishedOnly || l.is_published) {
        lessonCounts[l.course_id] = (lessonCounts[l.course_id] || 0) + 1;
      }
    });
  }

  let result = coursesList.map((c) => {
    const level = levels.find((l) => l.id === c.level_id);
    const category = categories.find((cat) => cat.id === c.category_id);
    return {
      ...c,
      level,
      category,
      lessons_count: lessonCounts[c.id] || 0,
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
  return courses.find((c) => c.slug === slug) || null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id) || null;
}

export async function getCourseLessons(
  courseId: string,
  options?: { publishedOnly?: boolean }
): Promise<Lesson[]> {
  const pool = getDbPool();
  if (pool) {
    try {
      let sql = "SELECT * FROM public.lessons WHERE course_id = $1";
      const params: any[] = [courseId];
      if (options?.publishedOnly) {
        sql += " AND is_published = true";
      }
      sql += " ORDER BY order_index ASC";
      const res = await pool.query(sql, params);
      return res.rows as Lesson[];
    } catch (e: any) {
      if (IS_PROD) throw new Error(`Database error in getCourseLessons: ${e.message}`);
      console.warn("DB getCourseLessons fallback in dev mode:", e);
    }
  } else if (IS_PROD) {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  const store = getLocalStore();
  let lessons = store.lessons.filter((l: any) => l.course_id === courseId);
  if (options?.publishedOnly) {
    lessons = lessons.filter((l: any) => l.is_published);
  }
  return lessons.sort((a: any, b: any) => a.order_index - b.order_index);
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
// Course CRUD (Strictly PostgreSQL in Production)
// ----------------------------------------------------------------------

export async function createCourse(
  input: Omit<Course, "id" | "created_at" | "updated_at">
): Promise<Course> {
  const pool = getDbPool();
  if (pool) {
    const res = await pool.query(
      `INSERT INTO public.courses (
        title, slug, short_description, description, thumbnail_url,
        level_id, category_id, instructor_name, is_published, is_featured,
        is_free, price, duration_hours, objectives, order_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        input.title,
        input.slug,
        input.short_description,
        input.description,
        input.thumbnail_url,
        input.level_id,
        input.category_id,
        input.instructor_name || "حسين علي",
        input.is_published,
        input.is_featured,
        input.is_free,
        input.price || 0,
        input.duration_hours || 0,
        JSON.stringify(input.objectives || []),
        input.order_index || 99,
      ]
    );
    if (res.rows.length > 0) return res.rows[0] as Course;
    throw new Error("Failed to create course in PostgreSQL database.");
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  const newCourse: Course = {
    ...input,
    id: `course_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.courses.push(newCourse);
  saveLocalStore(store);
  return newCourse;
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  const pool = getDbPool();
  if (pool) {
    const fields = Object.keys(updates).filter((k) => k !== "id" && k !== "level" && k !== "category" && k !== "lessons_count");
    const values = fields.map((k) => {
      const val = (updates as any)[k];
      return typeof val === "object" && val !== null ? JSON.stringify(val) : val;
    });

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const query = `UPDATE public.courses SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`;
    const res = await pool.query(query, [...values, id]);
    if (res.rows.length > 0) return res.rows[0] as Course;
    return null;
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  const idx = store.courses.findIndex((c: any) => c.id === id);
  if (idx === -1) return null;
  store.courses[idx] = { ...store.courses[idx], ...updates, updated_at: new Date().toISOString() };
  saveLocalStore(store);
  return store.courses[idx];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const pool = getDbPool();
  if (pool) {
    await pool.query("DELETE FROM public.courses WHERE id = $1", [id]);
    return true;
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  store.courses = store.courses.filter((c: any) => c.id !== id);
  store.lessons = store.lessons.filter((l: any) => l.course_id !== id);
  saveLocalStore(store);
  return true;
}

// ----------------------------------------------------------------------
// Lesson CRUD (Strictly PostgreSQL in Production)
// ----------------------------------------------------------------------

export async function createLesson(
  input: Omit<Lesson, "id" | "created_at" | "updated_at">
): Promise<Lesson> {
  const pool = getDbPool();
  if (pool) {
    const res = await pool.query(
      `INSERT INTO public.lessons (
        course_id, title, slug, description, video_url, video_provider,
        video_source_type, video_id, processing_status,
        duration_minutes, content_notes, resources, is_published, order_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        input.course_id,
        input.title,
        input.slug,
        input.description || "",
        input.video_url,
        input.video_provider || "youtube",
        input.video_source_type || "url",
        input.video_id || "",
        input.processing_status || "ready",
        input.duration_minutes || 0,
        input.content_notes || "",
        JSON.stringify(input.resources || []),
        input.is_published,
        input.order_index || 99,
      ]
    );
    if (res.rows.length > 0) return res.rows[0] as Lesson;
    throw new Error("Failed to create lesson in PostgreSQL database.");
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  const newLesson: Lesson = {
    ...input,
    id: `lesson_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.lessons.push(newLesson);
  saveLocalStore(store);
  return newLesson;
}

export async function updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson | null> {
  const pool = getDbPool();
  if (pool) {
    const fields = Object.keys(updates).filter((k) => k !== "id");
    const values = fields.map((k) => {
      const val = (updates as any)[k];
      return typeof val === "object" && val !== null ? JSON.stringify(val) : val;
    });

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const query = `UPDATE public.lessons SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`;
    const res = await pool.query(query, [...values, id]);
    if (res.rows.length > 0) return res.rows[0] as Lesson;
    return null;
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  const idx = store.lessons.findIndex((l: any) => l.id === id);
  if (idx === -1) return null;
  store.lessons[idx] = { ...store.lessons[idx], ...updates, updated_at: new Date().toISOString() };
  saveLocalStore(store);
  return store.lessons[idx];
}

export async function deleteLesson(id: string): Promise<boolean> {
  const pool = getDbPool();
  if (pool) {
    await pool.query("DELETE FROM public.lessons WHERE id = $1", [id]);
    return true;
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  store.lessons = store.lessons.filter((l: any) => l.id !== id);
  saveLocalStore(store);
  return true;
}

export async function reorderLessons(courseId: string, orderedLessonIds: string[]): Promise<boolean> {
  const pool = getDbPool();
  if (pool) {
    for (let i = 0; i < orderedLessonIds.length; i++) {
      await pool.query("UPDATE public.lessons SET order_index = $1, updated_at = NOW() WHERE id = $2 AND course_id = $3", [
        i + 1,
        orderedLessonIds[i],
        courseId,
      ]);
    }
    return true;
  }

  if (IS_PROD) {
    throw new Error("DATABASE_URL is required in production.");
  }

  const store = getLocalStore();
  orderedLessonIds.forEach((id, index) => {
    const l = store.lessons.find((item: any) => item.id === id && item.course_id === courseId);
    if (l) l.order_index = index + 1;
  });
  saveLocalStore(store);
  return true;
}

// ----------------------------------------------------------------------
// Taxonomies
// ----------------------------------------------------------------------

export async function createCategory(input: {
  name_ar: string;
  name_en: string;
  slug: string;
  description?: string;
}): Promise<Category> {
  const pool = getDbPool();
  if (pool) {
    const res = await pool.query(
      "INSERT INTO public.categories (name_ar, name_en, slug, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [input.name_ar, input.name_en, input.slug, input.description || ""]
    );
    if (res.rows.length > 0) return res.rows[0] as Category;
    throw new Error("Failed to create category in database.");
  }

  if (IS_PROD) throw new Error("DATABASE_URL is required in production.");
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
  const pool = getDbPool();
  if (pool) {
    const res = await pool.query(
      "INSERT INTO public.levels (name_ar, name_en, slug, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [input.name_ar, input.name_en, input.slug, input.description || ""]
    );
    if (res.rows.length > 0) return res.rows[0] as Level;
    throw new Error("Failed to create level in database.");
  }

  if (IS_PROD) throw new Error("DATABASE_URL is required in production.");
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
  store.levels.push(newLevel);
  saveLocalStore(store);
  return newLevel;
}

// ----------------------------------------------------------------------
// Admin Stats
// ----------------------------------------------------------------------

export async function getAdminStats() {
  const pool = getDbPool();
  if (pool) {
    const [cRes, lRes, catRes, lvlRes] = await Promise.all([
      pool.query("SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE is_published = true) as published FROM public.courses"),
      pool.query("SELECT COUNT(*) as total FROM public.lessons"),
      pool.query("SELECT COUNT(*) as total FROM public.categories"),
      pool.query("SELECT COUNT(*) as total FROM public.levels"),
    ]);

    const totalCourses = parseInt(cRes.rows[0].total, 10) || 0;
    const publishedCourses = parseInt(cRes.rows[0].published, 10) || 0;
    const draftCourses = totalCourses - publishedCourses;
    const totalLessons = parseInt(lRes.rows[0].total, 10) || 0;
    const totalCategories = parseInt(catRes.rows[0].total, 10) || 0;
    const totalLevels = parseInt(lvlRes.rows[0].total, 10) || 0;

    return {
      totalCourses,
      publishedCourses,
      draftCourses,
      totalLessons,
      totalCategories,
      totalLevels,
    };
  }

  if (IS_PROD) throw new Error("DATABASE_URL is required in production.");
  const store = getLocalStore();
  const totalCourses = store.courses.length;
  const publishedCourses = store.courses.filter((c: any) => c.is_published).length;
  return {
    totalCourses,
    publishedCourses,
    draftCourses: totalCourses - publishedCourses,
    totalLessons: store.lessons.length,
    totalCategories: store.categories.length,
    totalLevels: store.levels.length,
  };
}
