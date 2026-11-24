import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

// Allowed formats: MP4, WebM, QuickTime (MOV)
const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
];

// Default max video file size: 500 MB (can be configured via MAX_VIDEO_SIZE_MB env)
const MAX_VIDEO_SIZE_MB = parseInt(process.env.MAX_VIDEO_SIZE_MB || "500", 10) || 500;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

export async function POST(request: NextRequest) {
  // 1. Authenticate Admin
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json(
      { error: "غير مصرح لك بطلب رابط رفع الفيديو (يجب تسجيل الدخول كمسؤول)." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { fileName, fileType, fileSize } = body;

    let resolvedType = (fileType || "").toLowerCase();
    if (!resolvedType && fileName) {
      const ext = fileName.split(".").pop()?.toLowerCase();
      if (ext === "mp4") resolvedType = "video/mp4";
      else if (ext === "webm") resolvedType = "video/webm";
      else if (ext === "mov") resolvedType = "video/quicktime";
      else if (ext === "m4v") resolvedType = "video/x-m4v";
    }

    if (!fileName || !resolvedType) {
      return NextResponse.json(
        { error: "بيانات الملف غير مكتملة (يرجى تحديد اسم وصيغة الفيديو)." },
        { status: 400 }
      );
    }

    // 2. Validate MIME Type
    if (!ALLOWED_VIDEO_MIME_TYPES.includes(resolvedType)) {
      return NextResponse.json(
        {
          error: `صيغة الفيديو (${fileType || fileName}) غير مدعومة. الصيغ المدعومة هي: MP4, WebM, MOV.`,
        },
        { status: 400 }
      );
    }

    // 3. Validate File Size
    if (fileSize && fileSize > MAX_VIDEO_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `حجم الفيديو يتجاوز الحد الأقصى المسموح (${MAX_VIDEO_SIZE_MB} ميجابايت). يرجى ضغط الفيديو أو تقليله.`,
        },
        { status: 400 }
      );
    }

    // Clean extension
    const ext = fileName.split(".").pop()?.toLowerCase() || "mp4";
    const safeName = `video_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;

    // 4. Check if Cloudflare Stream is configured
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cfApiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN;

    if (cfAccountId && cfApiToken) {
      // Cloudflare Stream Direct Creator Upload
      try {
        const cfRes = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream/direct_upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${cfApiToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              maxDurationSeconds: 14400, // 4 hours max per lesson
              meta: { name: fileName },
            }),
          }
        );

        const cfData = await cfRes.json();
        if (cfRes.ok && cfData.success && cfData.result) {
          const videoId = cfData.result.uid;
          const uploadUrl = cfData.result.uploadURL;
          const playbackUrl = `https://iframe.videodelivery.net/${videoId}`;

          return NextResponse.json({
            success: true,
            provider: "cloudflare",
            uploadUrl,
            method: "POST",
            videoId,
            playbackUrl,
            maxSizeBytes: MAX_VIDEO_SIZE_BYTES,
            maxSizeMB: MAX_VIDEO_SIZE_MB,
          });
        }
      } catch (cfErr) {
        console.error("Cloudflare Stream direct upload error, falling back to storage:", cfErr);
      }
    }

    // 5. Fallback: Supabase Storage Signed Direct Upload URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "uploads";

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "خدمة التخزين السحابي غير مهيأة. يرجى مراجعة إعدادات الخادم." },
        { status: 500 }
      );
    }

    const objectPath = `videos/${safeName}`;
    const signRes = await fetch(
      `${supabaseUrl}/storage/v1/object/upload/sign/${bucket}/${objectPath}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upsert: true }),
      }
    );

    if (!signRes.ok) {
      const errText = await signRes.text();
      console.error("Supabase Storage sign error:", signRes.status, errText);
      return NextResponse.json(
        { error: "فشل استخراج رابط الرفع المباشر المؤقت من خدمة التخزين." },
        { status: 500 }
      );
    }

    const signData = await signRes.json();
    const directUploadUrl = `${supabaseUrl}/storage/v1${signData.url}`;
    const publicPlaybackUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

    return NextResponse.json({
      success: true,
      provider: "direct",
      uploadUrl: directUploadUrl,
      method: "PUT",
      videoId: objectPath,
      playbackUrl: publicPlaybackUrl,
      maxSizeBytes: MAX_VIDEO_SIZE_BYTES,
      maxSizeMB: MAX_VIDEO_SIZE_MB,
    });
  } catch (err: any) {
    console.error("Upload-url endpoint error:", err);
    return NextResponse.json(
      { error: err.message || "حدث خطأ غير متوقع أثناء معالجة طلب الرفع." },
      { status: 500 }
    );
  }
}
