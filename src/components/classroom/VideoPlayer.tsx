"use client";

import { getEmbedUrl } from "@/lib/video";
import { AlertCircle } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  provider: "youtube" | "vimeo" | "direct" | "external";
  title: string;
}

export default function VideoPlayer({ videoUrl, provider, title }: VideoPlayerProps) {
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
