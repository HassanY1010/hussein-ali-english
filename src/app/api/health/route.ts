import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      platform: settings.site_name,
      teacher: settings.instructor_name,
      database: "connected",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error?.message || "Health check failed",
      },
      { status: 500 }
    );
  }
}
