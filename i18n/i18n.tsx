"use client";
import turkish from "@/i18n/tr.json";
import english from "@/i18n/en.json";
import chinese from "@/i18n/ch.json";
import japanese from "@/i18n/jp.json";
import azerbaijan from "@/i18n/az.json";
import russian from "@/i18n/ru.json";
import italian from "@/i18n/it.json";
import espanol from "@/i18n/es.json";
import franchise from "@/i18n/fr.json";

interface Translations {
  [key: string]: string | object;
}
interface LanguageResources {
  tr: Translations;
  "en-US": Translations;
  ch: Translations;
  jp: Translations;
  az: Translations;
  ru: Translations;
  it: Translations;
  es: Translations;
  fr: Translations;
}
export const langs = [
  { name: "Turkish", key: "tr" },
  { name: "English", key: "en-US" },
  { name: "Chinese", key: "ch" },
  { name: "Japanese", key: "jp" },
  { name: "Azerbaijan", key: "az" },
  { name: "Russian", key: "ru" },
  { name: "Italian", key: "it" },
  { name: "Espanol", key: "es" },
  { name: "Franchise", key: "fr" },
];
export const languages: LanguageResources = {
  tr: turkish,
  "en-US": english,
  ch: chinese,
  jp: japanese,
  az: azerbaijan,
  ru: russian,
  it: italian,
  es: espanol,
  fr: franchise,
};
export default class i18n {
  static init() {
    const ilng =
      (typeof window !== "undefined" && window.localStorage.getItem("lang")) ||
      "en-US";
    typeof window !== "undefined" && window.localStorage.setItem("lang", ilng);
  }
  static setLanguage(lang: string | any) {
    typeof window !== "undefined" && window.localStorage.setItem("lang", lang);
    window.location.reload();
  }
}
export function t(key: string, value?: string): any {
  const currentLang =
    (typeof window !== "undefined" && window.localStorage.getItem("lang")) ||
    "en-US";
  const translations = languages[currentLang as keyof LanguageResources];
  let result: any = translations;
  const keys = key.split(".");
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      return "*" + key;
    }
  }
  if (typeof value === "string" && value !== "") {
    return typeof result === "string"
      ? String(result).replace("{text}", value)
      : "*" + key;
  } else {
    return typeof result === "string" ? String(result) : "*" + key;
  }
}
