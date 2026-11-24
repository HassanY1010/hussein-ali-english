"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/session";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  createLesson,
  updateLesson,
  deleteLesson,
  reorderLessons,
  updateSiteSettings,
  createCategory,
  createLevel,
} from "@/lib/data/repository";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-ء-ي]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// -----------------------------------------------------------
// Course Actions
// -----------------------------------------------------------

export async function saveCourseAction(prevState: any, formData: FormData) {
  const admin = await getAdminSession();
  if (!admin) {
    return { error: "غير مصرح لك بالقيام بهذا الإجراء." };
  }

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  const shortDescription = (formData.get("short_description") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const thumbnailUrl = (formData.get("thumbnail_url") as string)?.trim() || "";
  const levelId = (formData.get("level_id") as string)?.trim();
  const categoryId = (formData.get("category_id") as string)?.trim();
  const isPublished = formData.get("is_published") === "true" || formData.get("is_published") === "on";
  const isFeatured = formData.get("is_featured") === "true" || formData.get("is_featured") === "on";
  const durationHours = parseFloat((formData.get("duration_hours") as string) || "0") || 0;
  const rawObjectives = (formData.get("objectives") as string) || "";

  if (!title || !shortDescription || !description || !levelId || !categoryId) {
    return { error: "يرجى ملء جميع الحقول الإلزامية." };
  }

  if (!slug) {
    slug = generateSlug(title);
  }

  const objectives = rawObjectives
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => ({ text: line.replace(/^[•\-\*]\s*/, "") }));

  try {
    if (id) {
      await updateCourse(id, {
        title,
        slug,
        short_description: shortDescription,
        description,
        thumbnail_url: thumbnailUrl,
        level_id: levelId,
        category_id: categoryId,
        is_published: isPublished,
        is_featured: isFeatured,
        duration_hours: durationHours,
        objectives,
      });
    } else {
      await createCourse({
        title,
        slug,
        short_description: shortDescription,
        description,
        thumbnail_url: thumbnailUrl,
        level_id: levelId,
        category_id: categoryId,
        instructor_name: "حسين علي",
        is_published: isPublished,
        is_featured: isFeatured,
        is_free: true,
        price: 0,
        currency: "USD",
        duration_hours: durationHours,
        objectives,
        order_index: 99,
      });
    }

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    return { success: true, message: "تم حفظ الكورس بنجاح!" };
  } catch (err: any) {
    return { error: err.message || "حدث خطأ أثناء حفظ الكورس." };
  }
}

export async function deleteCourseAction(courseId: string) {
  const admin = await getAdminSession();
  if (!admin) {
    throw new Error("غير مصرح لك بحذف هذا الكورس.");
  }

  await deleteCourse(courseId);
  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
  return { success: true };
}

export async function toggleCoursePublishAction(courseId: string, currentStatus: boolean) {
  const admin = await getAdminSession();
  if (!admin) {
    throw new Error("غير مصرح لك.");
  }

  await updateCourse(courseId, { is_published: !currentStatus });
  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
  return { success: true };
}

// -----------------------------------------------------------
// Lesson Actions
// -----------------------------------------------------------

export async function saveLessonAction(prevState: any, formData: FormData) {
  const admin = await getAdminSession();
  if (!admin) {
    return { error: "غير مصرح لك." };
  }

  const id = formData.get("id") as string | null;
  const courseId = (formData.get("course_id") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";
  const videoUrl = (formData.get("video_url") as string)?.trim();
  const durationMinutes = parseInt((formData.get("duration_minutes") as string) || "0", 10) || 0;
  const contentNotes = (formData.get("content_notes") as string)?.trim() || "";
  const isPublished = formData.get("is_published") === "true" || formData.get("is_published") === "on";

  if (!courseId || !title || !videoUrl) {
    return { error: "يرجى إدخال عنوان الدرس ورابط الفيديو." };
  }

  if (!slug) {
    slug = generateSlug(title);
  }

  // Detect video provider & source type
  const videoSourceType = (formData.get("video_source_type") as string) === "upload" ? "upload" : "url";
  const videoId = (formData.get("video_id") as string)?.trim() || "";
  const customProvider = (formData.get("video_provider") as string)?.trim();
  const processingStatus = (formData.get("processing_status") as any) || "ready";

  if (isPublished && !videoUrl) {
    return { error: "لا يمكن نشر الدرس بدون اكتمال إضافة أو رفع الفيديو الخاص به." };
  }

  let videoProvider: "youtube" | "vimeo" | "direct" | "external" | "cloudflare" | "upload" = "youtube";
  if (customProvider === "cloudflare" || videoUrl.includes("videodelivery.net") || videoUrl.includes("cloudflarestream.com")) {
    videoProvider = "cloudflare";
  } else if (videoUrl.includes("vimeo.com")) {
    videoProvider = "vimeo";
  } else if (videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm") || videoUrl.endsWith(".mov") || videoSourceType === "upload") {
    videoProvider = "direct";
  } else if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
    videoProvider = "external";
  }

  try {
    if (id) {
      await updateLesson(id, {
        title,
        slug,
        description,
        video_url: videoUrl,
        video_provider: videoProvider,
        video_source_type: videoSourceType,
        video_id: videoId,
        processing_status: processingStatus,
        duration_minutes: durationMinutes,
        content_notes: contentNotes,
        is_published: isPublished,
      });
    } else {
      await createLesson({
        course_id: courseId,
        title,
        slug,
        description,
        video_url: videoUrl,
        video_provider: videoProvider,
        video_source_type: videoSourceType,
        video_id: videoId,
        processing_status: processingStatus,
        duration_minutes: durationMinutes,
        content_notes: contentNotes,
        resources: [],
        is_published: isPublished,
        order_index: 99,
      });
    }

    revalidatePath(`/courses`);
    revalidatePath(`/admin/courses/${courseId}/lessons`);
    return { success: true, message: "تم حفظ الدرس بنجاح!" };
  } catch (err: any) {
    return { error: err.message || "حدث خطأ أثناء حفظ الدرس." };
  }
}

export async function deleteLessonAction(lessonId: string, courseId: string) {
  const admin = await getAdminSession();
  if (!admin) {
    throw new Error("غير مصرح لك.");
  }

  await deleteLesson(lessonId);
  revalidatePath(`/courses`);
  revalidatePath(`/admin/courses/${courseId}/lessons`);
  return { success: true };
}

export async function reorderLessonsAction(courseId: string, orderedIds: string[]) {
  const admin = await getAdminSession();
  if (!admin) {
    throw new Error("غير مصرح لك.");
  }

  await reorderLessons(courseId, orderedIds);
  revalidatePath(`/admin/courses/${courseId}/lessons`);
  return { success: true };
}

// -----------------------------------------------------------
// Settings Actions
// -----------------------------------------------------------

export async function saveSiteSettingsAction(prevState: any, formData: FormData) {
  const admin = await getAdminSession();
  if (!admin) {
    return { error: "غير مصرح لك." };
  }

  const siteName = (formData.get("site_name") as string)?.trim();
  const siteNameEn = (formData.get("site_name_en") as string)?.trim();
  const instructorName = (formData.get("instructor_name") as string)?.trim();
  const instructorTitle = (formData.get("instructor_title") as string)?.trim();
  const instructorBio = (formData.get("instructor_bio") as string)?.trim();
  const instructorMessage = (formData.get("instructor_message") as string)?.trim();
  const instructorAvatar = (formData.get("instructor_avatar") as string)?.trim() || "";
  const heroTitle = (formData.get("hero_title") as string)?.trim();
  const heroSubtitle = (formData.get("hero_subtitle") as string)?.trim();
  const telegramUrl = (formData.get("telegram_url") as string)?.trim() || "https://t.me/gccxic";
  const telegramChannelName = (formData.get("telegram_channel_name") as string)?.trim() || "@gccxic";
  const contactEmail = (formData.get("contact_email") as string)?.trim();
  const footerText = (formData.get("footer_text") as string)?.trim();

  try {
    await updateSiteSettings({
      site_name: siteName,
      site_name_en: siteNameEn,
      instructor_name: instructorName,
      instructor_title: instructorTitle,
      instructor_bio: instructorBio,
      instructor_message: instructorMessage,
      instructor_avatar: instructorAvatar,
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      telegram_url: telegramUrl,
      telegram_channel_name: telegramChannelName,
      contact_email: contactEmail,
      footer_text: footerText,
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, message: "تم تحديث إعدادات المنصة بنجاح!" };
  } catch (err: any) {
    return { error: err.message || "حدث خطأ أثناء تحديث الإعدادات." };
  }
}

// -----------------------------------------------------------
// Taxonomy Actions
// -----------------------------------------------------------

export async function addCategoryAction(prevState: any, formData: FormData) {
  const admin = await getAdminSession();
  if (!admin) return { error: "غير مصرح لك." };

  const nameAr = (formData.get("name_ar") as string)?.trim();
  const nameEn = (formData.get("name_en") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim() || generateSlug(nameEn || nameAr);
  const description = (formData.get("description") as string)?.trim();

  if (!nameAr || !nameEn) {
    return { error: "يرجى إدخال الاسم بالعربية والإنجليزية." };
  }

  await createCategory({ name_ar: nameAr, name_en: nameEn, slug, description });
  revalidatePath("/admin/taxonomies");
  revalidatePath("/courses");
  return { success: true, message: "تمت إضافة التصنيف بنجاح!" };
}

export async function addLevelAction(prevState: any, formData: FormData) {
  const admin = await getAdminSession();
  if (!admin) return { error: "غير مصرح لك." };

  const nameAr = (formData.get("name_ar") as string)?.trim();
  const nameEn = (formData.get("name_en") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim() || generateSlug(nameEn || nameAr);
  const description = (formData.get("description") as string)?.trim();

  if (!nameAr || !nameEn) {
    return { error: "يرجى إدخال اسم المستوى بالعربية والإنجليزية." };
  }

  await createLevel({ name_ar: nameAr, name_en: nameEn, slug, description });
  revalidatePath("/admin/taxonomies");
  revalidatePath("/courses");
  return { success: true, message: "تمت إضافة المستوى بنجاح!" };
}
