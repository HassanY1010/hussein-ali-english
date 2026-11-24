"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Share2,
} from "lucide-react";
import { SiteSettings } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  }

  return (
    <footer className="bg-[#0B1E3F] text-slate-200 mt-20 relative overflow-hidden">
      {/* Decorative top wave/glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Newsletter Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-14 pb-12 text-center border-b border-blue-900/60">
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
          {language === "en" ? "Stay Always Updated" : "ابق على اطلاع دائم"}
        </h3>
        <p className="text-xs sm:text-sm text-blue-200/80 mb-6 max-w-lg mx-auto">
          {language === "en"
            ? "Subscribe to receive latest English lessons, exercises and announcements."
            : "اشترك في نشرتنا البريدية للحصول على أحدث الدروس والعروض الخاصة"}
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex items-center bg-white rounded-full p-1.5 shadow-lg shadow-blue-950/40">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={language === "en" ? "Enter your email..." : "أدخل بريدك الإلكتروني"}
            className="flex-1 px-4 py-2 text-xs text-slate-800 bg-transparent outline-none placeholder-slate-400"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#1A56DB] hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition-colors shrink-0"
          >
            {subscribed ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تم الاشتراك!</span>
              </span>
            ) : (
              <span>{language === "en" ? "Subscribe Now" : "اشترك الآن"}</span>
            )}
          </button>
        </form>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white leading-tight">
                  {language === "en" ? settings.site_name_en : settings.site_name}
                </h4>
                <p className="text-xs text-blue-300 font-medium mt-0.5">
                  تعلّم .. طوّر .. حقق هدفك
                </p>
              </div>
            </div>

            <p className="text-xs text-blue-100/70 leading-relaxed max-w-sm">
              منصة تعليمية متخصصة ومصممة لتمكين المتعلم العربي من استيعاب قواعد وتراكيب ومحادثة اللغة الإنجليزية بمنهجية واضحة ومبسطة.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              روابط سريعة
            </h5>
            <ul className="space-y-2 text-xs text-blue-100/80 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  الدورات المتاحة
                </Link>
              </li>
              <li>
                <Link href="/#levels" className="hover:text-white transition-colors">
                  المستويات التعليمية
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  عن الأستاذ حسين علي
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              المساعدة والتواصل
            </h5>
            <ul className="space-y-2 text-xs text-blue-100/80 font-medium">
              <li>
                <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>قناة المتابعة والتدريب اليومي:</span>
                  <span className="text-blue-300 font-latin font-bold">{settings.telegram_channel_name}</span>
                </a>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  سياسة الخصوصية وشروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-300 transition-colors text-[11px] text-blue-300/80 pt-2 block">
                  لوحة تحكم الإدارة (Admin Login)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-blue-200/60">
          <span>
            © 2026 جميع الحقوق محفوظة — منصة الأستاذ حسين علي لتعليم اللغة الإنجليزية.
          </span>
          <span className="font-latin">
            Hussein Ali English Academy
          </span>
        </div>
      </div>
    </footer>
  );
}
