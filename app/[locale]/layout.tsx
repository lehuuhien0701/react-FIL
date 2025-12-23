import React from 'react'

import { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { notFound } from "next/navigation";
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/context/cart-context';
import { FooterProvider } from '@/context/FooterContext';
import { cn } from '@/lib/utils';
import { ViewTransitions } from 'next-view-transitions';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { i18n } from '@/i18n.config'
import { CookieConsent } from '@/components/cookie-consent';
import fetchContentTypeClient from "@/lib/strapi/fetchContentTypeClient";

// use CSS variables so Tailwind can map font-family to var(--font-*)
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});
// Playfair for display text — expose as CSS variable
const display = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700", "900"],
    variable: "--font-display",
});

export async function generateMetadata({
    params,
}: {
    params: { locale: string; slug: string };
}): Promise<Metadata> {
    // ... (hàm generateMetadata không đổi)
    const pageData = await fetchContentType(
        'global',
        {
            filters: { locale: params.locale },
            populate: "seo.metaImage",
        },
        true
    );

    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    return metadata;
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const currentLocale = locale || i18n.defaultLocale;

    // Fetch global data (logo, footer, cookie_consent, etc.)
    const pageData = await fetchContentType('global', { 
        filters: { locale: currentLocale },
        populate: {
            footer: {
                populate: {
                    logo: true,
                    menu_footer: true,
                    social: {
                        populate: ['icon']
                    },
                },
            },
            logo: true,
            seo: true,
            localizations: true, 
            cookie_consent: true, 
            global_highlight_blocks: {
                on: {
                    'dynamic-zone.block-category-single': {
                        populate: ['thumbnail', 'list_details'],
                    },
                },
            },
        },
    }, true);

    // Fetch menu data from Strapi collection-type "menu"
    const menuData = await fetchContentTypeClient('menus', {
        filters: { locale: currentLocale },
        populate: '*',
        pagination: { pageSize: 1000 }
    });


    // Phần code lấy description đã chính xác:
    const cookieTranslations = {
        title: pageData?.cookie_consent?.title || 'Cookies',
        description: pageData?.cookie_consent?.description || '',
        // Sửa tên key cho đúng với Interface của Component
        cookie_accept: pageData?.cookie_consent?.accept || 'Accept', 
        cookie_decline: pageData?.cookie_consent?.decline || 'Decline'
    };
    
    // ... (phần còn lại của component không đổi)
    if (!pageData) {
        console.error('Failed to fetch global data');
        notFound(); // Kích hoạt trang 404
    }

    return (
        <html lang={currentLocale}>
            <ViewTransitions>
                <CartProvider>
                    <body
                        className={cn(
                            display.variable,
                            inter.variable,
                            "bg-white antialiased h-full w-full font-inter"
                        )}
                    >
                        <Navbar 
                            data={menuData?.data || {}} 
                            logo={pageData?.logo || {}}
                            footer={pageData?.footer || {}} 
                            locale={currentLocale} 
                        />
                        <FooterProvider data={pageData?.footer || {}}>
                            {children}
                        </FooterProvider>
                        <Footer 
                            data={pageData?.footer || {}} 
                            locale={currentLocale} 
                        />
                        <CookieConsent translations={cookieTranslations} />
                    </body>
                </CartProvider>
            </ViewTransitions>
        </html>
    );
}