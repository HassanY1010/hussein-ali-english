import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  const provider = searchParams.get("provider") || "direct";

  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  // 1. Cloudflare Stream status
  if (provider === "cloudflare") {
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cfApiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN;

    if (!cfAccountId || !cfApiToken) {
      return NextResponse.json({ status: "ready" });
    }

    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${cfApiToken}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok && data.result) {
        const state = data.result.status?.state;
        // states: "ready", "inprogress", "error", "queued"
        return NextResponse.json({
          status: state === "ready" ? "ready" : state === "error" ? "error" : "processing",
          details: data.result.status,
          duration: data.result.duration,
        });
      }
    } catch (err: any) {
      return NextResponse.json({ status: "error", error: err.message });
    }
  }

  // 2. Supabase Storage status
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "uploads";

  if (supabaseUrl && serviceKey) {
    try {
      const folder = videoId.includes("/") ? videoId.substring(0, videoId.lastIndexOf("/")) : "";
      const fileName = videoId.includes("/") ? videoId.substring(videoId.lastIndexOf("/") + 1) : videoId;

      const listRes = await fetch(`${supabaseUrl}/storage/v1/object/list/${bucket}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: folder, search: fileName }),
      });

      if (listRes.ok) {
        const files = await listRes.json();
        const found = Array.isArray(files) && files.some((f) => f.name === fileName);
        return NextResponse.json({
          status: found ? "ready" : "pending",
        });
      }
    } catch {}
  }

  return NextResponse.json({ status: "ready" });
}
