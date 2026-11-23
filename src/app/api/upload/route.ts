import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  // 1. Authenticate admin
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "uploads";

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Storage service is not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف غير مدعوم. يرجى رفع صورة بصيغة (JPG, PNG, WebP)" },
        { status: 400 }
      );
    }

    // 3. Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "حجم الصورة يتجاوز الحد المسموح (أقصى حد هو 5 ميجابايت)" },
        { status: 400 }
      );
    }

    // 4. Generate clean safe filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `thumbnail_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload to Supabase Storage via REST
    const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${filename}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("Storage upload failed:", uploadRes.status, errText);
      return NextResponse.json({ error: "فشل رفع الصورة إلى وحدة التخزين السحابية" }, { status: 500 });
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json({ error: err.message || "حدث خطأ أثناء معالجة الملف" }, { status: 500 });
  }
}
