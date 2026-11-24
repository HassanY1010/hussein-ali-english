"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  BookOpen,
  User,
  Layers,
  Menu,
  X,
  Search,
  Shield,
  Moon,
} from "lucide-react";
import { SiteSettings } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  settings: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Right side (RTL): Brand identity with Blue Book Icon */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black text-[#0F2942] leading-tight group-hover:text-blue-600 transition-colors">
              {language === "en" ? settings.site_name_en : settings.site_name}
            </span>
            <span className="text-[11px] text-blue-600 font-semibold tracking-wide">
              {language === "en" ? "Interactive English Academy" : "منصة الكورسات التعليمية"}
            </span>
          </div>
        </Link>

        {/* Center: Search pill & Navigation links */}
        <div className="hidden lg:flex items-center gap-6 flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative w-full max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن كورس..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
              title="بحث"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <nav className="flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/courses" className="hover:text-blue-600 transition-colors">
              {t.nav.courses}
            </Link>
            <Link href="/#levels" className="hover:text-blue-600 transition-colors">
              {t.levels.badge}
            </Link>
            <Link href="/#about" className="hover:text-blue-600 transition-colors">
              {t.nav.about}
            </Link>
            <a
              href={settings.telegram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              اتصل بنا
            </a>
          </nav>
        </div>

        {/* Left side (RTL): Login Pill Button + Telegram + Language + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A56DB] hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition-all duration-200"
          >
            <User className="w-3.5 h-3.5" />
            <span>تسجيل الدخول</span>
          </Link>

          <LanguageSwitcher />

          {/* Telegram shortcut */}
          <a
            href={settings.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors border border-blue-100"
            title="قناة التليغرام"
          >
            <Send className="w-4 h-4" />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full text-slate-700 hover:bg-slate-100 border border-slate-200"
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-white border-b border-blue-100 shadow-xl z-50 p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن كورس..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-700 outline-none"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <nav className="flex flex-col gap-1 text-sm font-bold text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
            >
              <span>{t.nav.home}</span>
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{t.nav.courses}</span>
            </Link>
            <Link
              href="/#levels"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{t.levels.badge}</span>
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>{t.nav.about}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 border-t border-slate-100 mt-2 pt-3 text-blue-600 font-bold"
            >
              <Shield className="w-4 h-4" />
              <span>تسجيل دخول الإدارة (Admin)</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
