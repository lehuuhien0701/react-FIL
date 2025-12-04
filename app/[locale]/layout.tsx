import React from 'react'

import { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

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
    const pageData = await fetchContentType(
        'global',
        {
            filters: { locale: params.locale },
            populate: "seo.metaImage", // đúng
        },
        true
    );

    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    
    return {
        ...metadata,
        icons: {
            icon: [
                { url: '/favicon.ico' },
                { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
                { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
                { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
                { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            ],
            apple: [
                { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            ],
        },
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const currentLocale = locale || i18n.defaultLocale;

    // Fetch global data (logo, footer, etc.)
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
        seo: true,             // nếu seo là component/relation
        localizations: true,   // nếu bạn cần danh sách bản dịch
        global_highlight_blocks: {
        on: {
            'dynamic-zone.block-category-single': {
            populate: ['thumbnail', 'list_details'],
            },
        },
        },
    },
    }, true);

    

    // Log to check structure of pageData and logo
   //console.log("layout.tsx pageData:", pageData);
    // console.log("layout.tsx logo:", pageData?.logo);
    

    // Fetch menu data from Strapi collection-type "menu"
    const menuData = await fetchContentTypeClient('menus', {
        filters: { locale: currentLocale },
        populate: '*'
    });

    //console.log('Menu Data:', menuData);

    const cookieTranslations = {
        title: pageData?.cookie_consent?.title || 'Cookies',
        description: pageData?.cookie_consent?.description || 'We use cookies to improve your experience.',
        accept: pageData?.cookie_consent?.accept_button || 'Accept',
        decline: pageData?.cookie_consent?.decline_button || 'Decline'
    };

    if (!pageData) {
        console.error('Failed to fetch global data');
    }

    return (
        <html lang={currentLocale}>
            <ViewTransitions>
                <CartProvider>
                    <body
                        className={cn(
                            // include both className and variable so next/font and Tailwind variable mapping both work
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