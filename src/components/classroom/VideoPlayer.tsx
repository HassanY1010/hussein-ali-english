"use client";

import { getEmbedUrl } from "@/lib/video";
import { VideoProvider, VideoProcessingStatus } from "@/types/database";
import { AlertCircle, Loader2 } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  provider: VideoProvider;
  title: string;
  processingStatus?: VideoProcessingStatus;
}

export default function VideoPlayer({
  videoUrl,
  provider,
  title,
  processingStatus = "ready",
}: VideoPlayerProps) {
  // If processing
  if (processingStatus === "processing" || processingStatus === "pending") {
    return (
      <div className="w-full aspect-video bg-paper-200 border border-paper-border rounded-sm flex flex-col items-center justify-center p-6 text-center text-ink-muted">
        <Loader2 className="w-10 h-10 mb-3 text-accent animate-spin" />
        <h4 className="text-sm font-bold text-ink mb-1">الفيديو قيد المعالجة السحابية</h4>
        <p className="text-xs text-ink-muted max-w-sm leading-relaxed">
          يتم تجهيز الفيديو وتوليد صيغ البث السريع المتكيفة لتوفير تجربة تشغيل سلسة. يرجى تحديث الصفحة بعد قليل.
        </p>
      </div>
    );
  }

  // If error
  if (processingStatus === "error") {
    return (
      <div className="w-full aspect-video bg-paper-200 border border-red-200 rounded-sm flex flex-col items-center justify-center p-6 text-center text-red-700">
        <AlertCircle className="w-10 h-10 mb-2 text-red-500" />
        <h4 className="text-sm font-bold mb-1">تعذر تشغيل هذا الفيديو</h4>
        <p className="text-xs max-w-sm">
          حدث خطأ أثناء معالجة ملف الفيديو في خدمة التخزين السحابي. يرجى مراجعة لوحة الإدارة وإعادة الرفع.
        </p>
      </div>
    );
  }

  const { type, embedUrl } = getEmbedUrl(videoUrl, provider);

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-paper-200 border border-paper-border rounded-sm flex flex-col items-center justify-center p-6 text-center text-ink-muted">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="text-xs font-semibold">لم يتم توفير رابط فيديو صالح لهذا الدرس</p>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-fine">
        <video
          src={embedUrl}
          controls
          className="w-full h-full object-contain"
          playsInline
          controlsList="nodownload"
        >
          المتصفح لا يدعم تشغيل الفيديو المباشر.
        </video>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-fine">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0 absolute top-0 right-0 left-0 bottom-0"
      />
    </div>
  );
}
