"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Course, Category, Level } from "@/types/database";
import { saveCourseAction } from "@/lib/actions/courses";
import { ArrowLeft, ArrowRight, Save, AlertCircle, Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CourseFormProps {
  course?: Course | null;
  categories: Category[];
  levels: Level[];
}

function SubmitButton({ label, savingLabel }: { label: string; savingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-ink text-paper-50 font-bold text-xs hover:bg-accent transition-colors disabled:opacity-50 shadow-fine"
    >
      <Save className="w-4 h-4" />
      <span>{pending ? savingLabel : label}</span>
    </button>
  );
}

export default function CourseForm({ course, categories, levels }: CourseFormProps) {
  const [state, formAction] = useFormState(saveCourseAction, null);
  const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnail_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { t, language, dir } = useLanguage();
  const cf = t.admin.courseForm;

  const initialObjectives =
    course?.objectives?.map((o) => o.text).join("\n") || "";

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error || (language === "en" ? "Failed to upload image" : "فشل رفع الصورة"));
      } else if (json.url) {
        setThumbnailUrl(json.url);
      }
    } catch {
      setUploadError(language === "en" ? "Error during image upload" : "خطأ أثناء معالجة رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      {course && <input type="hidden" name="id" value={course.id} />}

      {/* Page Title & Subtitle inside the form */}
      <div className="pb-2">
        <h1 className="text-2xl font-black text-ink">
          {course ? cf.editTitle : cf.newTitle}
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          {cf.subtitle}
        </p>
      </div>

      {state?.error && (
        <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="bg-white border border-paper-border rounded-sm p-6 sm:p-8 space-y-6 shadow-fine">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              {cf.titleAr}
            </label>
            <input
              type="text"
              name="title"
              defaultValue={course?.title || ""}
              required
              placeholder={language === "en" ? "e.g., Master Daily English Conversation & Fluency" : "مثال: دورة أسرار المحادثة والطلاقة اليومية"}
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              {cf.slug}
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={course?.slug || ""}
              placeholder={language === "en" ? "Leave blank for auto-generation" : "اتركه فارغاً للتوليد التلقائي"}
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent font-latin ltr-text"
            />
          </div>
        </div>

        {/* Level, Category, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              {cf.level}
            </label>
            <select
              name="level_id"
              defaultValue={course?.level_id || levels[0]?.id || ""}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2.5 text-xs text-ink focus:bg-white focus:border-accent"
            >
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {language === "en" ? `${lvl.name_en} (${lvl.name_ar})` : `${lvl.name_ar} (${lvl.name_en})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              {cf.category}
            </label>
            <select
              name="category_id"
              defaultValue={course?.category_id || categories[0]?.id || ""}
              required
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2.5 text-xs text-ink focus:bg-white focus:border-accent"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {language === "en" ? `${cat.name_en} (${cat.name_ar})` : `${cat.name_ar} (${cat.name_en})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft mb-1.5">
              {cf.durationHours}
            </label>
            <input
              type="number"
              step="0.5"
              name="duration_hours"
              defaultValue={course?.duration_hours || 2}
              className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent font-latin"
            />
          </div>
        </div>

        {/* Thumbnail URL with Direct Supabase Storage Upload */}
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            {cf.thumbnail}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              name="thumbnail_url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
            />

            <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-paper-100 hover:bg-paper-200 border border-paper-border text-xs font-semibold text-ink cursor-pointer shrink-0 transition-colors">
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{cf.uploading}</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-accent" />
                  <span>{cf.uploadThumbnail}</span>
                </>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 mt-1.5">{uploadError}</p>
          )}

          {thumbnailUrl && (
            <div className="mt-2.5 flex items-center gap-3 bg-paper-50 p-2 rounded-sm border border-paper-border max-w-sm">
              <img
                src={thumbnailUrl}
                alt="Preview"
                className="w-16 h-10 object-cover rounded-sm border border-paper-border"
              />
              <span className="text-[11px] text-ink-muted truncate font-latin ltr-text flex-1">
                {thumbnailUrl}
              </span>
            </div>
          )}
        </div>

        {/* Short description */}
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            {cf.shortDesc}
          </label>
          <textarea
            name="short_description"
            defaultValue={course?.short_description || ""}
            rows={2}
            required
            placeholder={language === "en" ? "Write 2-3 concise sentences explaining the core takeaway..." : "اكتب جملتين إلى ثلاث جمل توضح الفكرة الجوهرية للكورس..."}
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
          />
        </div>

        {/* Full description */}
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            {cf.desc}
          </label>
          <textarea
            name="description"
            defaultValue={course?.description || ""}
            rows={5}
            required
            placeholder={language === "en" ? "Detailed explanation of course curriculum, target audience, and methodologies..." : "شرح مفصل لمنهجية الكورس، لمن هذا الكورس، وما يميز هذا الشرح..."}
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
          />
        </div>

        {/* Objectives */}
        <div>
          <label className="block text-xs font-bold text-ink-soft mb-1.5">
            {cf.objectives}
          </label>
          <textarea
            name="objectives"
            defaultValue={initialObjectives}
            rows={4}
            placeholder={cf.objectivesPlaceholder}
            className="w-full bg-paper-50 border border-paper-border rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:bg-white focus:border-accent"
          />
        </div>

        {/* Publishing & Feature toggles */}
        <div className="pt-4 border-t border-paper-border flex flex-wrap items-center gap-8">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={course ? course.is_published : true}
              className="w-4 h-4 text-accent border-paper-border rounded-sm focus:ring-accent"
            />
            <span className="text-xs font-bold text-ink">
              {cf.isPublished}
            </span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={course?.is_featured || false}
              className="w-4 h-4 text-accent border-paper-border rounded-sm focus:ring-accent"
            />
            <span className="text-xs font-bold text-ink">
              {cf.isFeatured}
            </span>
          </label>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/courses"
          className="text-xs text-ink-muted hover:text-ink font-semibold flex items-center gap-1"
        >
          {dir === "rtl" ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{cf.cancel}</span>
        </Link>
        <SubmitButton label={cf.save} savingLabel={cf.saving} />
      </div>
    </form>
  );
}
