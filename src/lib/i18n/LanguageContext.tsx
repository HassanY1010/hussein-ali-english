"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationDictionary, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  dir: "rtl" | "ltr";
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: translations.ar,
  dir: "rtl",
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    // 1. Check saved language from localStorage or cookie
    try {
      const saved = localStorage.getItem("preferred_lang") as Language | null;
      if (saved && (saved === "ar" || saved === "en")) {
        setLanguageState(saved);
        updateDocument(saved);
        return;
      }
    } catch {}

    // Default to ar
    updateDocument("ar");
  }, []);

  const updateDocument = (lang: Language) => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000;SameSite=Lax`;
      localStorage.setItem("preferred_lang", lang);
    } catch {}
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    updateDocument(lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "ar" ? "en" : "ar";
    setLanguage(nextLang);
  };

  const dir: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";
  const t = translations[language] || translations.ar;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
