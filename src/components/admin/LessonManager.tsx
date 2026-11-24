"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Course, Lesson } from "@/types/database";
import {
  saveLessonAction,
  deleteLessonAction,
  reorderLessonsAction,
} from "@/lib/actions/courses";
import {
  Plus,
  PlayCircle,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Eye,
  Clock,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Link as LinkIcon,
  FileVideo,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface LessonManagerProps {
  course: Course;
  initialLessons: Lesson[];
}

type VideoMode = "url" | "upload";
type UploadState = "idle" | "requesting" | "uploading" | "success" | "error" | "cancelled";

const ALLOWED_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];
const ALLOWED_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
];

export default function LessonManager({ course, initialLessons }: LessonManagerProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Video Mode & Upload State
  const [videoMode, setVideoMode] = useState<VideoMode>("url");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [videoProvider, setVideoProvider] = useState<string>("youtube");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [maxSizeMB, setMaxSizeMB] = useState<number>(500);

  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state when opening edit / add form
  useEffect(() => {
    if (editingLesson) {
      const isUpload =
        editingLesson.video_source_type === "upload" ||
        editingLesson.video_provider === "cloudflare" ||
        editingLesson.video_url.includes("/storage/v1/object/public/") ||
        editingLesson.video_url.includes("videodelivery.net");

      setVideoMode(isUpload ? "upload" : "url");
      setVideoUrl(editingLesson.video_url || "");
      setVideoId(editingLesson.video_id || "");
      setVideoProvider(editingLesson.video_provider || "youtube");
      setSelectedFile(null);
      setUploadState(isUpload && editingLesson.video_url ? "success" : "idle");
      setUploadProgress(isUpload && editingLesson.video_url ? 100 : 0);
      setUploadError(null);
    } else if (isAddingNew) {
      setVideoMode("url");
      setVideoUrl("");
      setVideoId("");
      setVideoProvider("youtube");
      setSelectedFile(null);
      setUploadState("idle");
      setUploadProgress(0);
      setUploadError(null);
    }
  }, [editingLesson, isAddingNew]);

  // Clean up ongoing XHR on unmount
  useEffect(() => {
    return () => {
      if (xhrRef.current) {
        xhrRef.current.abort();
      }
    };
  }, []);

  // Format bytes helper
  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 بايت";
    const k = 1024;
    const sizes = ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  // Handle File Selection
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate extension
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() || "");
    const mime = file.type.toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext) && !ALLOWED_MIME_TYPES.includes(mime)) {
      setUploadError(`صيغة الملف (${ext}) غير مدعومة. يرجى اختيار فيديو بصيغة MP4 أو WebM أو MOV.`);
      setSelectedFile(null);
      return;
    }

    // Validate size (default max 500MB)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError(`حجم الفيديو (${formatBytes(file.size)}) يتجاوز الحد الأقصى المسموح (${maxSizeMB} ميجابايت).`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setUploadError(null);
    setUploadState("idle");
    setUploadProgress(0);
  }

  // Execute Upload directly to Cloudflare Stream or Supabase Storage
  async function startUpload() {
    if (!selectedFile) return;

    setUploadState("requesting");
    setUploadProgress(0);
    setUploadError(null);

    // Normalize MIME type
    let mimeType = selectedFile.type;
    if (!mimeType) {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase();
      if (ext === "mp4") mimeType = "video/mp4";
      else if (ext === "webm") mimeType = "video/webm";
      else if (ext === "mov") mimeType = "video/quicktime";
      else if (ext === "m4v") mimeType = "video/x-m4v";
      else mimeType = "video/mp4";
    }

    try {
      // 1. Request signed temporary upload URL from Backend
      const res = await fetch("/api/video/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: mimeType,
          fileSize: selectedFile.size,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل الحصول على رابط الرفع المؤقت من الخادم.");
      }

      if (data.maxSizeMB) {
        setMaxSizeMB(data.maxSizeMB);
      }

      // 2. Direct upload to storage using XMLHttpRequest for accurate progress
      setUploadState("uploading");

      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadState("success");
          setUploadProgress(100);
          setVideoUrl(data.playbackUrl);
          setVideoId(data.videoId || "");
          setVideoProvider(data.provider || "direct");
          setUploadError(null);
        } else {
          setUploadState("error");
          setUploadError(`فشل رفع الفيديو إلى خدمة التخزين السحابية (رمز الخطأ: ${xhr.status}).`);
        }
      };

      xhr.onerror = () => {
        setUploadState("error");
        setUploadError("انقطع الاتصال بخدمة التخزين أثناء الرفع. يرجى التحقق من الشبكة والمحاولة ثانية.");
      };

      xhr.onabort = () => {
        setUploadState("cancelled");
        setUploadError("تم إلغاء عملية الرفع.");
      };

      xhr.open(data.method || "PUT", data.uploadUrl);

      if (data.method === "POST") {
        // Cloudflare Stream Direct Upload via FormData
        const formData = new FormData();
        formData.append("file", selectedFile);
        xhr.send(formData);
      } else {
        // Supabase Storage Direct Upload via PUT binary
        xhr.setRequestHeader("Content-Type", mimeType);
        xhr.send(selectedFile);
      }
    } catch (err: any) {
      setUploadState("error");
      setUploadError(err.message || "حدث خطأ غير متوقع أثناء بدء الرفع.");
    }
  }

  // Cancel Upload
  function cancelUpload() {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    setUploadState("cancelled");
  }

  // Reorder: Move Up / Down
  function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lessons.length) return;

    const reordered = [...lessons];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setLessons(reordered);

    startTransition(async () => {
      const ids = reordered.map((l) => l.id);
      await reorderLessonsAction(course.id, ids);
      setStatusMessage({ type: "success", text: "تم تحديث ترتيب الدروس بنجاح." });
      setTimeout(() => setStatusMessage(null), 3000);
    });
  }

  // Delete Lesson
  function handleDeleteLesson(lessonId: string) {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا الدرس نهائياً؟")) {
      startTransition(async () => {
        await deleteLessonAction(lessonId, course.id);
        setLessons((prev) => prev.filter((l) => l.id !== lessonId));
        setStatusMessage({ type: "success", text: "تم حذف الدرس بنجاح." });
        setTimeout(() => setStatusMessage(null), 3000);
      });
    }
  }

  // Handle Form Submit
  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Guard: Video presence validation
    if (videoMode === "upload") {
      if (uploadState === "uploading" || uploadState === "requesting") {
        alert("يرجى الانتظار حتى يكتمل رفع ملف الفيديو قبل حفظ الدرس.");
        return;
      }
      if (!videoUrl) {
        alert("يرجى اختيار ملف الفيديو ورفعه أولاً بنجاح قبل حفظ الدرس.");
        return;
      }
    } else {
      if (!videoUrl.trim()) {
        alert("يرجى إدخال رابط الفيديو الخاص بالدرس.");
        return;
      }
    }

    const formData = new FormData(e.currentTarget);
    formData.set("course_id", course.id);
    if (editingLesson) {
      formData.set("id", editingLesson.id);
    }

    // Explicit video metadata fields
    formData.set("video_url", videoUrl);
    formData.set("video_source_type", videoMode);
    formData.set("video_id", videoId);
    formData.set("video_provider", videoProvider);
    formData.set("processing_status", "ready");

    startTransition(async () => {
      const res = await saveLessonAction(null, formData);
      if (res?.error) {
        setStatusMessage({ type: "error", text: res.error });
      } else {
        setStatusMessage({ type: "success", text: "تم حفظ الدرس بنجاح!" });
        setIsAddingNew(false);
        setEditingLesson(null);
        window.location.reload();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Link href="/admin/courses" className="hover:text-ink">
              الكورسات
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">{course.title}</span>
          </div>
          <h1 className="text-2xl font-black text-ink mt-1">
            إدارة دروس الكورس ({lessons.length} دروس)
          </h1>
        </div>

        <button
          onClick={() => {
            setEditingLesson(null);
            setIsAddingNew(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink hover:bg-accent text-white font-bold text-xs transition-colors shadow-fine shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة درس جديد</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-sm text-xs flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Add / Edit Lesson Modal / Form */}
      {(isAddingNew || editingLesson) && (
        <div className="bg-white border-2 border-accent rounded-sm p-5 sm:p-6 shadow-lifted">
          <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-4">
            <h3 className="text-base font-bold text-ink flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-accent" />
              <span>{editingLesson ? "تعديل بيانات الدرس" : "إضافة درس جديد للكورس"}</span>
            </h3>
            <button
              onClick={() => {
                cancelUpload();
                setIsAddingNew(false);
                setEditingLesson(null);
              }}
              className="p-1 text-ink-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-5">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  عنوان الدرس *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingLesson?.title || ""}
                  required
                  placeholder="مثال: الدرس 1: أساسيات المضارع البسيط واستخدامات s المفرد"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  المعرّف بالرابط (Slug)
                </label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={editingLesson?.slug || ""}
                  placeholder="تلقائي إن تركته فارغاً"
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-latin ltr-text"
                />
              </div>
            </div>

            {/* Video Mode Selection Card */}
            <div className="p-4 bg-paper-50 border border-paper-border rounded-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-bold text-ink">
                  طريقة إضافة الفيديو *
                </label>
                <div className="inline-flex rounded-sm p-1 bg-white border border-paper-border text-xs">
                  <button
                    type="button"
                    onClick={() => setVideoMode("url")}
                    className={`px-3 py-1.5 rounded-sm font-semibold flex items-center gap-1.5 transition-colors ${
                      videoMode === "url"
                        ? "bg-ink text-white shadow-fine"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>رابط فيديو خارجي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoMode("upload")}
                    className={`px-3 py-1.5 rounded-sm font-semibold flex items-center gap-1.5 transition-colors ${
                      videoMode === "upload"
                        ? "bg-accent text-white shadow-fine"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>رفع فيديو من جهازي</span>
                  </button>
                </div>
              </div>

              {/* Mode A: URL input */}
              {videoMode === "url" && (
                <div className="space-y-1.5 pt-1">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    required={videoMode === "url"}
                    placeholder="https://www.youtube.com/watch?v=... أو Vimeo أو رابط MP4 مباشر"
                    className="w-full bg-white border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:border-accent font-latin ltr-text"
                  />
                  <p className="text-[11px] text-ink-muted">
                    يدعم روابط فيديوهات YouTube وVimeo وروابط MP4 / WebM المباشرة بدون أي تعديل.
                  </p>
                </div>
              )}

              {/* Mode B: Direct Video Upload */}
              {videoMode === "upload" && (
                <div className="space-y-3 pt-1">
                  {/* File picker drop area */}
                  <div className="border-2 border-dashed border-paper-border hover:border-accent/60 bg-white rounded-sm p-4 text-center transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".mp4,.webm,.mov,.m4v,video/mp4,video/webm,video/quicktime,video/x-m4v"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-file-picker"
                    />

                    <label
                      htmlFor="video-file-picker"
                      className="cursor-pointer inline-flex flex-col items-center justify-center gap-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-accent hover:underline">
                          اضغط لاختيار ملف فيديو من جهازك
                        </span>
                        <p className="text-[11px] text-ink-muted mt-0.5">
                          الصيغ المدعومة: MP4, WebM, MOV • الحد الأقصى: {maxSizeMB} ميجابايت
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Selected File Details & Upload Action */}
                  {selectedFile && uploadState !== "success" && (
                    <div className="bg-white border border-paper-border p-3 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileVideo className="w-5 h-5 text-accent shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-ink truncate" title={selectedFile.name}>
                            {selectedFile.name}
                          </p>
                          <p className="text-[11px] text-ink-muted font-latin">
                            {formatBytes(selectedFile.size)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {uploadState === "uploading" || uploadState === "requesting" ? (
                          <button
                            type="button"
                            onClick={cancelUpload}
                            className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-sm"
                          >
                            إلغاء الرفع
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={startUpload}
                            className="px-4 py-1.5 text-xs font-bold bg-accent hover:bg-accent/90 text-white rounded-sm flex items-center gap-1.5 shadow-fine"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>بدء رفع الفيديو الآن</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Progress Bar during Upload */}
                  {(uploadState === "uploading" || uploadState === "requesting") && (
                    <div className="bg-white border border-paper-border p-3 rounded-sm space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-ink flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                          <span>
                            {uploadState === "requesting"
                              ? "جاري تجهيز رابط الرفع المباشر..."
                              : "جاري رفع الفيديو مباشرة إلى السحابة..."}
                          </span>
                        </span>
                        <span className="font-bold text-accent font-latin">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-paper-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-accent h-2 transition-all duration-200 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Success State */}
                  {uploadState === "success" && videoUrl && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-green-900">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold">تم رفع الفيديو بنجاح وجاهز للعرض</p>
                          <p className="text-[11px] text-green-700 font-latin truncate max-w-md mt-0.5">
                            {videoUrl}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setUploadState("idle");
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="px-3 py-1 text-xs font-semibold text-green-800 hover:bg-green-100 rounded-sm border border-green-300 self-start sm:self-auto shrink-0 flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>تغيير الفيديو</span>
                      </button>
                    </div>
                  )}

                  {/* Error State */}
                  {uploadError && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-sm text-xs text-red-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-bold">فشل في رفع الفيديو</p>
                        <p className="mt-0.5">{uploadError}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Duration */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  مدة الدرس التقريبية (بالدقائق)
                </label>
                <input
                  type="number"
                  name="duration_minutes"
                  defaultValue={editingLesson?.duration_minutes || 15}
                  min={0}
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-latin"
                />
              </div>

              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-ink-soft mb-1">
                  نبذة سريعة عن الدرس
                </label>
                <input
                  type="text"
                  name="description"
                  defaultValue={editingLesson?.description || ""}
                  placeholder="شرح موجز لأهم النقاط التي سيتعلمها الطالب في هذا الدرس..."
                  className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent"
                />
              </div>
            </div>

            {/* Lesson Notes */}
            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1">
                ملاحظات الشرح وقواعد الدرس (تظهر تحت الفيديو للطالب)
              </label>
              <textarea
                name="content_notes"
                defaultValue={editingLesson?.content_notes || ""}
                rows={6}
                placeholder="اكتب هنا ملخص القواعد، الأمثلة التوضيحية، وتنبيهات الأستاذ حسين..."
                className="w-full bg-paper-50 border border-paper-border rounded-sm px-3 py-2 text-xs text-ink focus:bg-white focus:border-accent font-sans"
              />
            </div>

            {/* Publishing & Submit buttons */}
            <div className="pt-3 border-t border-paper-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingLesson ? editingLesson.is_published : true}
                  className="w-4 h-4 text-accent border-paper-border rounded-sm focus:ring-accent"
                />
                <span className="text-xs font-bold text-ink">نشر الدرس للطلاب على الموقع فور الحفظ</span>
              </label>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    cancelUpload();
                    setIsAddingNew(false);
                    setEditingLesson(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-paper-100 rounded-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isPending || uploadState === "uploading" || uploadState === "requesting"}
                  className="px-5 py-2 text-xs font-bold bg-ink hover:bg-accent text-white rounded-sm flex items-center gap-1.5 shadow-fine disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>
                    {isPending
                      ? "جاري الحفظ..."
                      : uploadState === "uploading"
                      ? "انتظار اكتمال الرفع..."
                      : "حفظ الدرس"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Lessons List */}
      <div className="bg-white border border-paper-border rounded-sm shadow-fine divide-y divide-paper-border">
        {lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-paper-50/50 transition-colors"
          >
            <div className="flex items-start sm:items-center gap-3">
              {/* Reorder controls */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0 || isPending}
                  className="p-1 rounded-sm hover:bg-paper-200 text-ink-soft disabled:opacity-30"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === lessons.length - 1 || isPending}
                  className="p-1 rounded-sm hover:bg-paper-200 text-ink-soft disabled:opacity-30"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Order number */}
              <span className="w-7 h-7 rounded-sm bg-paper-100 text-ink font-bold text-xs flex items-center justify-center font-latin border border-paper-border shrink-0">
                {idx + 1}
              </span>

              {/* Title & info */}
              <div>
                <h4 className="font-bold text-ink text-sm sm:text-base leading-snug">
                  {lesson.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-ink-muted mt-1">
                  {/* Provider Badge */}
                  <span
                    className={`px-1.5 py-0.5 rounded-xs font-semibold text-[10px] ${
                      lesson.video_provider === "cloudflare"
                        ? "bg-orange-50 text-orange-700 border border-orange-200"
                        : lesson.video_provider === "youtube"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : lesson.video_provider === "vimeo"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {lesson.video_provider === "cloudflare"
                      ? "Cloudflare Stream"
                      : lesson.video_provider === "youtube"
                      ? "YouTube"
                      : lesson.video_provider === "vimeo"
                      ? "Vimeo"
                      : lesson.video_source_type === "upload"
                      ? "فيديو مرفوع"
                      : "فيديو مباشر"}
                  </span>

                  <span className="font-latin text-accent font-mono truncate max-w-[200px] sm:max-w-xs">
                    {lesson.video_url}
                  </span>

                  {lesson.duration_minutes > 0 && (
                    <span className="flex items-center gap-1 font-latin">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration_minutes}m</span>
                    </span>
                  )}

                  <span>•</span>

                  {lesson.is_published ? (
                    <span className="text-[#1f5c3f] font-semibold">منشور</span>
                  ) : (
                    <span className="text-amber-700 font-semibold">مسودة</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                href={`/courses/${course.slug}/${lesson.slug}`}
                target="_blank"
                className="p-2 text-ink-muted hover:text-ink hover:bg-paper-100 rounded-sm transition-colors text-xs flex items-center gap-1"
                title="معاينة في مشغل الفيديو"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة</span>
              </Link>

              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingLesson(lesson);
                }}
                className="p-2 text-ink-muted hover:text-ink hover:bg-paper-100 rounded-sm transition-colors text-xs flex items-center gap-1"
                title="تعديل"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>

              <button
                onClick={() => handleDeleteLesson(lesson.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                title="حذف الدرس"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {lessons.length === 0 && (
          <div className="text-center py-16 p-6 text-xs text-ink-muted">
            <PlayCircle className="w-12 h-12 stroke-[1.2] mx-auto mb-2 text-ink-muted/50" />
            <p className="font-semibold text-ink">لا توجد دروس في هذا الكورس بعد</p>
            <p className="mt-1">
              اضغط على "إضافة درس جديد" لإرفاق أول درس وفيديو تعليمي عبر الرابط أو رفعه مباشرة من جهازك.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
