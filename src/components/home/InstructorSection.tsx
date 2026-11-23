import { SiteSettings } from "@/types/database";
import { Send, CheckCircle, GraduationCap, ArrowUpRight } from "lucide-react";

interface InstructorSectionProps {
  settings: SiteSettings;
}

export default function InstructorSection({ settings }: InstructorSectionProps) {
  return (
    <section id="about" className="py-20 border-b border-paper-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-paper-100 border border-paper-border rounded-sm p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Monogram & Identity */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-5xl font-bold shadow-lifted mb-4 border-2 border-accent">
                HA
              </div>
              <h3 className="text-2xl font-bold text-ink">
                {settings.instructor_name}
              </h3>
              <p className="text-xs text-ink-muted mt-1 font-medium">
                {settings.instructor_title}
              </p>
              <div className="mt-4 pt-4 border-t border-paper-border w-full flex justify-center">
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0c72a6] hover:underline font-latin"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{settings.telegram_channel_name}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Editorial Content & Bio */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase font-latin tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>عن المدرس والمنهجية</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-ink leading-snug">
                التعليم المبني على الإتقان العملي وليس التلقين الجاف
              </h2>

              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                {settings.instructor_bio}
              </p>

              {/* Message block */}
              <div className="p-4 bg-white rounded-sm border-r-4 border-accent text-sm text-ink-soft italic leading-relaxed">
                "{settings.instructor_message}"
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>تفكيك الفروق الدقيقة بين التراكيب المتشابهة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>التركيز على نطق الأصوات والوصل الصوتي الطبيعي</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>مناهج مناسبة للطلاب في كافة المراحل الدراسية والمهنية</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>ردود مباشرة وتوجيهات مستمرة عبر التلغرام</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
