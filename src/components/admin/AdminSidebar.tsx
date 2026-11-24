"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Layers,
  Settings,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { logoutAdminAction } from "@/lib/actions/auth";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const navItems = [
    { label: t.admin.dashboard, href: "/admin", icon: LayoutDashboard },
    { label: t.admin.courses, href: "/admin/courses", icon: BookOpen },
    { label: t.admin.newCourse, href: "/admin/courses/new", icon: PlusCircle },
    { label: t.admin.taxonomies, href: "/admin/taxonomies", icon: Layers },
    { label: t.admin.settings, href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-full min-h-screen bg-ink text-paper-100 flex flex-col justify-between shrink-0 border-l border-ink-light shadow-lifted md:shadow-none">
      <div>
        {/* Brand & Mobile Close */}
        <div className="p-5 sm:p-6 border-b border-ink-soft/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-accent/40 shadow-sm shrink-0 bg-ink">
              <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-paper-50 leading-tight">
                {t.admin.portalTitle}
              </h2>
              <span className="text-[11px] text-paper-300 font-latin">
                Teacher Administration
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden text-paper-300 hover:text-white p-1"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-paper-300 hover:text-white hover:bg-ink-light"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-ink-soft/30 space-y-2">
        <a
          href="https://hussein-ali-english.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-paper-300 hover:text-white transition-colors rounded-sm hover:bg-ink-light"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{language === "en" ? "Live Site" : "معاينة المنصة الحية"}</span>
          </span>
          <span className="text-[10px] text-accent font-latin">onrender.com</span>
        </a>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-sm transition-colors text-right"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.admin.logout}</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
