"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSlugContext } from "@/app/context/SlugContext";
import { BlurImage } from "./blur-image";
import { i18n } from "@/i18n.config";

type LocaleSwitcherProps = {
  currentLocale: string;
  variant?: "dropdown" | "inline";
};

export function LocaleSwitcher({
  currentLocale,
  variant = "dropdown",
}: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname(); // Current path
  const segments = pathname.split("/"); // Split path into segments

  // Generate localized path for each locale
  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`; // Default to root path for the locale

    if (
      Object.keys(localizedSlugs).length > 0 &&
      localizedSlugs[locale] &&
      segments.length === 2
    ) {
      return locale === i18n.defaultLocale
        ? `/${localizedSlugs[locale]}`
        : `/${locale}/${localizedSlugs[locale]}`;
    }
    
    // Blog detail page: /[locale]/blog/[slug] or /blog/[slug]
    const isBlogDetail =
      (segments[1] === "blog" && segments.length === 3) || // /blog/[slug]
      (i18n.locales.includes(segments[1] as any) && segments[2] === "blog" && segments.length === 4); // /[locale]/blog/[slug]

    if (isBlogDetail) {
      // Fallback: nếu không có localizedSlugs[locale], dùng slug của defaultLocale hoặc currentLocale
      const fallbackSlug =
        localizedSlugs[locale] ||
        localizedSlugs[i18n.defaultLocale] ||
        localizedSlugs[currentLocale] ||
        segments[segments.length - 1]; // fallback cuối cùng là slug hiện tại

      return locale === i18n.defaultLocale
        ? `/blog/${fallbackSlug}`
        : `/${locale}/blog/${fallbackSlug}`;
    }

    // Special handling for /blog route (blog index)
    if (pathname === '/blog' || segments[2] === 'blog') {
      return locale === i18n.defaultLocale ? '/blog' : `/${locale}/blog`;
    }

    // Handle homepage (e.g., "/en" -> "/fr")
    if (segments.length <= 2) {
      return locale === i18n.defaultLocale ? '/' : `/${locale}`;
    }

    // Handle dynamic paths (e.g., "/en/[something]")
    if (localizedSlugs[locale]) {
      segments[1] = locale; // Replace the locale
      segments[segments.length - 1] = localizedSlugs[locale]; // Replace slug if available
      return segments.join("/");
    }

    // Fallback to replace only the locale
    segments[1] = locale;
    return segments.join("/");
  };

  if (variant === "inline") {
    // Định nghĩa các ngôn ngữ được hỗ trợ
    const supportedLocales = pathname.includes('/blog') 
      ? i18n.locales // Lấy danh sách ngôn ngữ từ config
      : Object.keys(localizedSlugs).length > 0 
        ? Object.keys(localizedSlugs) 
        : i18n.locales;

    return (
      <div className="flex gap-4">
        {supportedLocales.map((locale) => (
          <Link
            key={locale}
            href={generateLocalizedPath(locale)}
            className={locale === currentLocale ? "opacity-50" : ""}
          >
            <div className="flex items-center justify-center">
              <BlurImage
                src={`/images/${locale}.svg`}
                alt={locale}
                width={30}
                height={30}
                className=""
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex gap-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center">
          <BlurImage
            src={`/images/${currentLocale}.svg`}
            alt={currentLocale}
            width={30}
            height={30}
            className=""
          />
        </div>
      </div>

      {isOpen && !pathname.includes("/products/") && (
        <div className="absolute top-full left-0 z-10 pt-3 flex flex-col gap-3">
          {(pathname.includes('/blog') 
            ? i18n.locales 
            : Object.keys(localizedSlugs).length > 0 
              ? Object.keys(localizedSlugs) 
              : i18n.locales
          )
            .filter((locale) => locale !== currentLocale)
            .map((locale) => (
              <Link
                key={locale}
                href={generateLocalizedPath(locale)}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center">
                  <BlurImage
                    src={`/images/${locale}.svg`}
                    alt={locale}
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
