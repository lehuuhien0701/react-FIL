"use client";
import Image from 'next/image';
import React, { useState } from "react";

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
  // ----------------------------------------------------------------------
  // ✅ FIX: Đã di chuyển tất cả các Hooks lên trên cùng, trước mọi điều kiện.
  // ----------------------------------------------------------------------
  
  // Newsletter state & logic (MOVED TO TOP)
  const [newsletter, setNewsletter] = useState({
    email: '',
    agreement: true // Luôn checked
  });
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');

  // ----------------------------------------------------------------------
  // Logic điều kiện và Early Return được đặt sau khi gọi Hooks
  // ----------------------------------------------------------------------

  const pathname = usePathname();
  const href = locale === i18n.defaultLocale ? '/' : `/${locale || ''}`;
  const isThankYouPage = pathname?.includes('/thank-you');

  if (isThankYouPage) {
    return null;
  }
    

  // Lấy dữ liệu tĩnh và social
  const copyright = data?.copyright ?? "";
  const designed_developed_by = data?.designed_developed_by ?? ""; 
  const email = data?.email ?? "";
  const phone = data?.phone ?? "";
  const address = data?.address ?? "";
  const logo = data?.logo; 

  // lấy dữ liệu tĩnh newsletter
  const title_newsletter = data?.title_newsletter ?? "";
  const placeholder_newsletter = data?.placeholder_newsletter ?? "";
  const checking_newsletter = data?.checking_newsletter ?? "";

  // LẤY DỮ LIỆU MENU FOOTER ĐỘNG
  // Giả sử menu_footer là một Repeatable Component (Link)
  const menu_footer: FooterLinkItem[] = data?.menu_footer || [];

  //console.log("logo :", data); 
  //console.log("menu_footer :", menu_footer); 

  const validateNewsletter = () => {
    if (!newsletter.email.trim()) {
      return 'Please enter your email.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.email)) {
      return 'Invalid email format.';
    }
    if (!newsletter.agreement) {
      return 'You must agree to the terms.';
    }
    return '';
  };

  const handleNewsletterChange = (field: string, value: string | boolean) => {
    setNewsletter(prev => ({ ...prev, [field]: value }));
    setNewsletterError('');
    setNewsletterSuccess('');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validateNewsletter();
    if (errorMsg) {
      setNewsletterError(errorMsg);
      return;
    }
    setNewsletterLoading(true);
    setNewsletterError('');
    setNewsletterSuccess('');
    try {
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify(newsletter) });
      setNewsletterSuccess('Thank you for subscribing!');
      setNewsletter({ email: '', agreement: true }); // Reset email, giữ agreement là true
    } catch {
      setNewsletterError('Subscription failed. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return ( 
    <footer className="bg-white px-5 lg:px-20 py-10 lg:py-20">
      <div className="lg:flex flex-col gap-24 max-w-[1440px] m-auto w-full">
        <div className="mb-10 lg:mb-0 lg:flex justify-between">
          <div className="md:w-[215px] lg:w-[315px] flex flex-col gap-[19px] mb-5">
            {/* Logo */}
            <Link href={href} aria-label="Go to home" className="m-auto md:m-0 text-[#2F324A] flex items-center gap-2">
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
            <div className="mb-14 md:mb-0 flex flex-col gap-2 text-center md:text-left">
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
                <div className='mb-10 md:mb-0 text-center md:text-left'>
                  <p className="text-navy text-sm leading-5">{parse(address)}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-[292px] flex flex-col gap-10">
              <form className="flex flex-col gap-[14px]" onSubmit={handleNewsletterSubmit}>
                <p className="text-navy text-sm leading-5">{parse(title_newsletter)}{" "}</p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder={placeholder_newsletter}
                    className="w-full h-[35px] px-[15px] rounded-[5px] border border-navy text-navy text-sm placeholder:text-navy"
                    value={newsletter.email}
                    onChange={e => handleNewsletterChange('email', e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-[7px] right-[10px]"
                    aria-label="Subscribe"
                    disabled={newsletterLoading}
                  >
                    <svg width="20" height="21" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0.558594C23.0081 0.558594 29.5 7.05046 29.5 15.0586C29.5 23.0667 23.0081 29.5586 15 29.5586C6.99187 29.5586 0.5 23.0667 0.5 15.0586C0.5 7.05046 6.99187 0.558594 15 0.558594Z" stroke="#0A2540" />
                      <path d="M11 15.0586H19M19 15.0586L15.5 11.0586M19 15.0586L15.5 19.0586" stroke="#0A2540" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {/* Checkbox and agreement */}
                <div className="flex items-center gap-2.5">
                  <input
                    id="emailOptIn2"
                    type="checkbox"
                    className="w-4 h-4 rounded border border-navy/60 peer2 hidden"
                    checked={true} // Luôn checked
                    readOnly // Không cho phép thay đổi
                  />
                  
                  <label htmlFor="emailOptIn2" className="custom-checkbox-button2 mr-[10px] relative flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.69471 0.292787C8.88218 0.480314 8.9875 0.734622 8.9875 0.999786C8.9875 1.26495 8.88218 1.51926 8.69471 1.70679L3.69471 6.70679C3.50718 6.89426 3.25288 6.99957 2.98771 6.99957C2.72255 6.99957 2.46824 6.89426 2.28071 6.70679L0.280712 4.70679C0.0985537 4.51818 -0.00224062 4.26558 3.78026e-05 4.00339C0.00231622 3.74119 0.107485 3.49038 0.292893 3.30497C0.478301 3.11956 0.729114 3.01439 0.99131 3.01211C1.25351 3.00983 1.50611 3.11063 1.69471 3.29279L2.98771 4.58579L7.28071 0.292787C7.46824 0.105316 7.72255 0 7.98771 0C8.25288 0 8.50718 0.105316 8.69471 0.292787Z" fill="#0a254099"/>
                    </svg>
                  </label>
                  <label htmlFor="emailOptIn2" className="text-navy text-xs leading-[14px] opacity-60 cursor-pointer select-none">
                    {parse(checking_newsletter)}
                  </label>
                   
                </div>
                {/* Error and Success Messages */}
                {newsletterError && (
                  <span className="text-red-500 text-xs">{newsletterError}</span>
                )}
                {newsletterSuccess && (
                  <span className="text-green-600 text-xs">{newsletterSuccess}</span>
                )}
              </form>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="lg:flex justify-between items-center pt-5 border-t border-navy">
          <p className="text-center md:text-left text-navy text-sm leading-5">
            {parse(copyright)}{" "}
          </p>
          {/* Hiển thị ở home page và các trang home locale (/, /en, /fr, ...) */}
          {pathname === '/' || /^\/[a-z]{2}\/?$/.test(pathname) ? (
            <div className="justify-center md:justify-start mt-[10px] md:mt-0 text-center md:text-left flex items-center gap-2.5">
              <span className="justify-center md:justify-start flex gap-2 text-navy text-sm">{parse(designed_developed_by)}{" "}</span>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};