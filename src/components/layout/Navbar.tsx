"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, BookOpen, User, Layers, Menu, X, Shield } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  settings: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper-50/95 backdrop-blur-sm border-b border-paper-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-ink text-paper-50 flex items-center justify-center font-editorial text-xl font-bold tracking-tight shadow-fine group-hover:bg-accent transition-colors shrink-0">
            HA
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base md:text-lg font-bold text-ink leading-tight tracking-tight">
              {language === "en" ? settings.site_name_en : settings.site_name}
            </span>
            <span className="text-[11px] sm:text-xs text-ink-muted font-latin tracking-wide ltr-text">
              {language === "en" ? settings.site_name : settings.site_name_en}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-ink-soft">
          <Link
            href="/"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/courses"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-ink-muted shrink-0" aria-hidden="true" />
            <span>{t.nav.courses}</span>
          </Link>
          <Link
            href="/#levels"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-ink-muted shrink-0" aria-hidden="true" />
            <span>{t.levels.badge}</span>
          </Link>
          <Link
            href="/#about"
            className="hover:text-ink transition-colors py-1 border-b border-transparent hover:border-accent flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-ink-muted shrink-0" aria-hidden="true" />
            <span>{t.nav.about}</span>
          </Link>
        </nav>

        {/* Actions: Language Switcher + Telegram CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <a
            href={settings.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-sm bg-[#229ED9]/10 text-[#0c72a6] hover:bg-[#229ED9] hover:text-white transition-all duration-200 border border-[#229ED9]/30"
            title="Telegram Channel"
          >
            <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{t.nav.telegram}</span>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm text-ink hover:bg-paper-100 border border-paper-border"
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-paper-50 border-b border-paper-border shadow-lifted z-50 p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-sm hover:bg-paper-100 text-ink flex items-center justify-between"
            >
              <span>{t.nav.home}</span>
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-sm hover:bg-paper-100 text-ink flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                {t.nav.courses}
              </span>
            </Link>
            <Link
              href="/#levels"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-sm hover:bg-paper-100 text-ink flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                {t.levels.badge}
              </span>
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-sm hover:bg-paper-100 text-ink flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                {t.nav.about}
              </span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-sm hover:bg-paper-100 text-ink-muted flex items-center justify-between text-xs border-t border-paper-border mt-2 pt-3"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.nav.admin}
              </span>
            </Link>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={settings.telegram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-sm bg-[#229ED9] text-white"
            >
              <Send className="w-4 h-4" />
              <span>{t.nav.telegram}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
