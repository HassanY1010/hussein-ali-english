import Link from "next/link";
import { Send, BookOpen, User, Layers } from "lucide-react";
import { SiteSettings } from "@/types/database";

interface NavbarProps {
  settings: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-paper-50/95 backdrop-blur-sm border-b border-paper-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="group flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-xl font-bold tracking-tight shadow-fine group-hover:bg-accent transition-colors">
            HA
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-ink leading-tight tracking-tight">
              {settings.site_name}
            </span>
            <span className="text-xs text-ink-muted font-latin tracking-wide ltr-text">
              {settings.site_name_en}
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
          <Link
            href="/"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent"
          >
            الرئيسية
          </Link>
          <Link
            href="/courses"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-ink-muted" />
            الكورسات والدروس
          </Link>
          <Link
            href="/#levels"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-ink-muted" />
            مستويات التعلم
          </Link>
          <Link
            href="/#about"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-ink-muted" />
            عن المدرس
          </Link>
        </nav>

        {/* CTA & Telegram */}
        <div className="flex items-center gap-3">
          <a
            href={settings.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm bg-[#229ED9]/10 text-[#0c72a6] hover:bg-[#229ED9] hover:text-white transition-all duration-200 border border-[#229ED9]/30"
            title="انضم لقناة التلغرام الرسمية"
          >
            <Send className="w-3.5 h-3.5" />
            <span>قناة Telegram</span>
          </a>

          <Link
            href="/courses"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm bg-ink text-paper-50 hover:bg-accent transition-colors"
          >
            <span>تصفح الكورسات</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
