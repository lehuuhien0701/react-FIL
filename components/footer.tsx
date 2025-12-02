"use client";
import Image from 'next/image';
import React from "react";
import parse from "html-react-parser";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n.config";
import { log } from 'util';


// Định nghĩa kiểu dữ liệu cho một mục menu (Link Component trong Strapi)
interface FooterLinkItem {
  id: number;
  text: string;
  URL: string;
  target?: '_self' | '_blank'; // Thêm trường target, mặc định là '_self'
}
 

export const Footer = ({ data, locale }: { data: any, locale: string }) => {
  const pathname = usePathname();
  const href = locale === i18n.defaultLocale ? '/' : `/${locale || ''}`;
  const isThankYouPage = pathname?.includes('/thank-you');

  if (isThankYouPage) {
    return null;
  }
   

  // Lấy dữ liệu tĩnh và social
  const copyright = data?.copyright ?? "Copyright © Fédération Immobilière du Luxembourg 2025";
  const designed_developed_by = data?.designed_developed_by ?? "Designed by";

  const email = data?.email ?? "hello@example.com";
  const phone = data?.phone ?? "(123) 555-1234";
  const address = data?.address ?? "Luxembourg 1234";
  const logo = data?.logo; 

  // LẤY DỮ LIỆU MENU FOOTER ĐỘNG
  // Giả sử menu_footer là một Repeatable Component (Link)
  const menu_footer: FooterLinkItem[] = data?.menu_footer || [];

  //console.log("logo :", data); 
  //console.log("menu_footer :", menu_footer); 

  return ( 
    <footer className="bg-white px-5 lg:px-20 py-10 lg:py-20">
      <div className="lg:flex flex-col gap-24 max-w-[1440px] m-auto w-full">
        <div className="mb-10 lg:mb-0 lg:flex justify-between">
          <div className="md:w-[215px] lg:w-[315px] flex flex-col gap-[19px] mb-5">
            {/* Logo */}
            <Link href={href} aria-label="Go to home" className="m-auto md:m-0 text-[#2F324A] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#CCAB80] flex items-center gap-2">
              {logo?.url ? (
                <Image
                  src={strapiImage(logo.url)}
                  alt={logo?.alternativeText || "Logo"}
                  width={logo?.width || 30}
                  height={logo?.height || 27}
                  className="inline-block"
                />
              ) : (
                <span className="font-bold text-xl">FIL</span>
              )}
            </Link>

            {/* Social Icons */}
            <div className="flex gap-2.5 justify-center md:justify-start">
              {Array.isArray(data.social) && data.social.length > 0 && (
                data.social.map((s: any, i: number) => {
                  const iconUrl = s.icon?.url ? strapiImage(s.icon.url) : undefined;
                  const link = s.link ?? s.url ?? "#";
                  return (
                    <a
                      key={`social-${i}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mr-3"
                    >
                      {iconUrl && (
                        <Image src={iconUrl} alt={s.icon?.name ?? `social-${i}`} width={34} height={34} />
                      )}
                    </a>
                  );
                })
              )}
            </div>
          </div>

          <div className="w-full lg:w-[calc(100%-315px)] md:flex justify-between lg:justify-end gap-10 xl:gap-24">
            
            {/* DYNAMIC FOOTER MENU */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              {menu_footer.map((item) => (
                <Link
                  key={item.id}
                  href={item.URL || '#'} // Fallback URL là '#'
                  target={item.target || '_self'} // Fallback target là '_self'
                  className="text-navy text-sm leading-5 hover:text-[#CCAB80] transition-colors"
                >
                  {item.text}
                </Link>
              ))}
              {/* Giữ lại menu tĩnh 'Privacy Policy' nếu nó không nằm trong Strapi Content Type */}
              {/* <a href="#" className="text-navy text-sm leading-5">Privacy Policy</a> */}
            </div>
            
            {/* THÔNG TIN LIÊN HỆ & FORM (Giữ nguyên) */}
            <div className="flex flex-col gap-[60px]">
              <div className="flex flex-col gap-[29px]">
                <div className='text-center md:text-left'>
                  <p className="text-navy text-sm leading-5"><a href={`mailto:${parse(email)}`}>{parse(email)}{" "}</a></p>
                  <p className="text-navy text-sm leading-5"><a href={`tel:${parse(phone)}`}>{parse(phone)}{" "}</a></p>
                </div>
                <div className='text-center md:text-left'>
                  <p className="text-navy text-sm leading-5">{parse(address)}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[292px] flex flex-col gap-10">
              <div className="flex flex-col gap-[14px]">
                <p className="text-navy text-sm leading-5">Subscribe to receive our news, analyses, and invitations.</p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-[35px] px-[15px] rounded-[5px] border border-navy text-navy text-sm placeholder:text-navy"
                  />
                  <button className="absolute top-[7px] right-[10px]" aria-label="Subscribe">
                    <svg width="20" height="21" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0.558594C23.0081 0.558594 29.5 7.05046 29.5 15.0586C29.5 23.0667 23.0081 29.5586 15 29.5586C6.99187 29.5586 0.5 23.0667 0.5 15.0586C0.5 7.05046 6.99187 0.558594 15 0.558594Z" stroke="#0A2540" />
                      <path d="M11 15.0586H19M19 15.0586L15.5 11.0586M19 15.0586L15.5 19.0586" stroke="#0A2540" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2.5">
                  <input type="checkbox" className="w-4 h-4 rounded border border-navy/60" />
                  <span className="flex-1 text-navy text-xs leading-[14px] opacity-60">
                    Checking this box and submitting the form means I agree my personal data is used only to contact me about my request here. No other use of my info.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="lg:flex justify-between items-center pt-5 border-t border-navy">
          <p className="text-center md:text-left text-navy text-sm leading-5">
            {parse(copyright)}{" "}
          </p>
          <div className="justify-center md:justify-start mt-[10px] md:mt-0 text-center md:text-left flex items-center gap-2.5">
            <span className="justify-center md:justify-start flex gap-2 text-navy text-sm">{parse(designed_developed_by)}{" "}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};