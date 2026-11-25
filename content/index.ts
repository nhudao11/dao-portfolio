import { en } from "./en";
import { vi } from "./vi";
import type { Locale, SiteContent } from "./types";

export const dictionaries: Record<Locale, SiteContent> = { en, vi };
export const locales: Locale[] = ["en", "vi"];
export const defaultLocale: Locale = "en";
