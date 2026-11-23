import { getSiteSettings } from "@/lib/data/repository";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink">
          إعدادات المنصة والمحتوى العام
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          تعديل نبذة المدرس، العناوين الرئيسية، ورابط قناة التلغرام ومعلومات التواصل.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
