"use client";

import React from "react";
import Link from "next/link";
import { Send, Mail, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-ink text-paper-100 border-t border-ink-light pt-16 pb-12 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-ink-soft/30">
          {/* Brand & Editorial Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-accent/40 shadow-sm shrink-0 bg-ink">
                <img
                  src="/images/logo.jpg"
                  alt={language === "en" ? settings.site_name_en : settings.site_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-paper-50 leading-tight">
                  {language === "en" ? settings.site_name_en : settings.site_name}
                </h3>
                <p className="text-xs text-paper-300 font-latin ltr-text">
                  {language === "en" ? settings.site_name : settings.site_name_en}
                </p>
              </div>
            </div>
            <p className="text-sm text-paper-300 leading-relaxed max-w-md">
              {language === "en"
                ? "A dedicated educational platform designed to empower learners with practical English grammar, phonetics, and conversational fluency."
                : "منصة تعليمية متخصصة ومصممة لتمكين المتعلم العربي من استيعاب قواعد وتراكيب ومحادثة اللغة الإنجليزية بمنهجية تدريجية بعيدة عن الحفظ التلقيني."}
            </p>
            <div className="pt-2">
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-white transition-colors"
              >
                <span>{language === "en" ? "Official Telegram Channel:" : "القناة الرسمية على Telegram:"} {settings.telegram_channel_name}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider font-latin">
              {language === "en" ? "Navigation" : "روابط المنصة"}
            </h4>
            <ul className="space-y-2 text-sm text-paper-300">
              <li>
                <Link href="/" className="hover:text-paper-50 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-paper-50 transition-colors">
                  {t.nav.courses}
                </Link>
              </li>
              <li>
                <Link href="/#levels" className="hover:text-paper-50 transition-colors">
                  {t.levels.badge}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-paper-50 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider font-latin">
              {language === "en" ? "Contact & Inquiries" : "التواصل والدعم"}
            </h4>
            <p className="text-sm text-paper-300">
              {language === "en"
                ? "For academic inquiries or joining practice sessions:"
                : "للأسئلة والاستفسارات التعليمية أو الانضمام إلى حلقات التدريب:"}
            </p>
            <div className="space-y-2 pt-1 text-sm text-paper-200">
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Send className="w-4 h-4 text-[#229ED9] shrink-0" aria-hidden="true" />
                <span className="ltr-text">{settings.telegram_url}</span>
              </a>
              {settings.contact_email && (
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-paper-300 shrink-0" aria-hidden="true" />
                  <span className="ltr-text">{settings.contact_email}</span>
                </a>
              )}
            </div>
            <div className="pt-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-paper-300 hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.nav.admin}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-paper-300 gap-4">
          <p>{t.common.allRightsReserved}</p>
          <div className="flex items-center gap-3">
            <a
              href="https://hussein-ali-english.onrender.com"
              className="font-latin ltr-text text-accent hover:underline font-semibold"
            >
              https://hussein-ali-english.onrender.com
            </a>
            <span>•</span>
            <span className="font-latin ltr-text text-paper-300/80">
              Hussein Ali English Academy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
