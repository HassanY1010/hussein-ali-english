"use client";

import React from "react";
import { AdminUser } from "@/lib/auth/session";
import { Send, Shield, Menu } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AdminHeaderProps {
  user: AdminUser;
  onToggleMobileDrawer?: () => void;
}

export default function AdminHeader({ user, onToggleMobileDrawer }: AdminHeaderProps) {
  const { t, language } = useLanguage();

  return (
    <header className="bg-white border-b border-paper-border h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        {onToggleMobileDrawer && (
          <button
            type="button"
            onClick={onToggleMobileDrawer}
            className="md:hidden p-2 rounded-sm text-ink hover:bg-paper-100 border border-paper-border"
            aria-label={t.nav.toggleMenu}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-accent-light text-accent text-xs font-bold border border-accent-border">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          <span>{language === "en" ? "Secure Admin Panel" : "منطقة الإدارة الآمنة"}</span>
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 text-xs">
        <LanguageSwitcher />

        <a
          href="https://t.me/gccxic"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1.5 text-[#0c72a6] hover:underline font-semibold"
        >
          <Send className="w-3.5 h-3.5 text-[#229ED9] shrink-0" />
          <span>@gccxic</span>
        </a>

        <div className="flex items-center gap-2 pl-2 border-r border-paper-border">
          <div className="w-7 h-7 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-bold text-xs shrink-0">
            HA
          </div>
          <div className="hidden sm:block text-right">
            <span className="block font-bold text-ink leading-tight text-xs">
              {user.name}
            </span>
            <span className="block text-[10px] text-ink-muted ltr-text font-latin truncate max-w-[120px]">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
