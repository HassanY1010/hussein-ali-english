"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "minimal" | "dropdown";
}

export default function LanguageSwitcher({ className = "", variant = "pill" }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      title={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-paper-border text-xs font-bold transition-all ${
        variant === "pill"
          ? "bg-paper-100 hover:bg-paper-200 text-ink shadow-fine hover:border-accent"
          : "hover:text-accent"
      } ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
      <span className="font-latin tracking-wide">
        {language === "ar" ? "English 🇺🇸" : "العربية 🇸🇦"}
      </span>
    </button>
  );
}
