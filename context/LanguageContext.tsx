"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

type Translations = typeof en;

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  t: (key: string) => any;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { en, pt };

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "pt") {
      setLanguage("pt");
    } else {
      setLanguage("en");
    }
  }, []);

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key missing in current language
        let fallbackValue: any = translations["en"];
        for (const fk of keys) {
             if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
                 fallbackValue = fallbackValue[fk];
             } else {
                 return key; // Return the key itself as last resort
             }
        }
        return fallbackValue;
      }
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
