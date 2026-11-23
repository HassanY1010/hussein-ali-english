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
  GraduationCap,
} from "lucide-react";
import { logoutAdminAction } from "@/lib/actions/auth";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "لوحة التحكم الرئيسية", href: "/admin", icon: LayoutDashboard },
    { label: "إدارة الكورسات والدروس", href: "/admin/courses", icon: BookOpen },
    { label: "إضافة كورس جديد", href: "/admin/courses/new", icon: PlusCircle },
    { label: "التصنيفات والمستويات", href: "/admin/taxonomies", icon: Layers },
    { label: "إعدادات المنصة والمدرس", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-ink text-paper-100 flex flex-col justify-between shrink-0 border-l border-ink-light">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-ink-soft/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-accent text-paper-50 flex items-center justify-center font-editorial text-lg font-bold">
            HA
          </div>
          <div>
            <h2 className="text-sm font-bold text-paper-50 leading-tight">
              إدارة المنصة
            </h2>
            <span className="text-[11px] text-paper-300 font-latin">
              Teacher Administration
            </span>
          </div>
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
            <span>معاينة المنصة الحية</span>
          </span>
          <span className="text-[10px] text-accent font-latin">onrender.com</span>
        </a>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-sm transition-colors text-right"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
