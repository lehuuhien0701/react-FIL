"use client";
import React, { useState, useEffect } from "react";
import { Container } from "../container";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const BannerHome = ({
  title = "",
  subtitle = "",
  description = "",
  icon_label = "",
  icon = null,
  background = null,
  
  primary_button = null,
  second_button = null
  
}: {
  title?: string;
  subtitle?: string;
  description?: string; 
  icon_label?: string;
  // accept string URL or Strapi media object/array
  icon?: any | null;
  background?: any | null; 
  // accept string URL or Strapi media object/array
  primary_button?: { id?: string, text?: string; URL?: string; target?: string } | null;
  second_button?: { id?: string, text?: string; URL?: string; target?: string } | null;
  
}) => {

  // helper to safely get strapi image url or fallback
  const safeImageSrc = (media: any, fallback: string) => {
    try {
      const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return strapiImage(url) ?? fallback;
    } catch {
      return fallback;
    }
  };

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  // Dynamically load Typeform script when popup is shown
  useEffect(() => {
    if (showPopup) {
      const script = document.createElement("script");
      script.src = "//embed.typeform.com/next/embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showPopup]);

  return (
    
    <section className="bg-navy">
        <Container className='flex flex-col-reverse lg:flex-row'>
        <div className="lg:w-[50%] flex-1 px-5 lg:px-20 py-10 lg:py-[120px] flex flex-col gap-[60px]">
          <div className="flex flex-col gap-[18px]">
            {/* check existing */ }
            {subtitle && (
            <div className="inline-flex items-center gap-2.5 px-[18px] py-2 rounded-[50px] border border-white w-fit">
              <span className="text-white text-[11.1px] leading-[14.4px]">{subtitle}</span>
            </div>
            )}
            <div className="flex flex-col gap-[60px]">
              <div className="flex flex-col gap-5">
                <h1 className="font-display text-[40px] leading-[40px] lg:text-[60px] lg:leading-[60px] font-bold text-white block [&>span]:text-gold">
                    {title ? parse(title) : null}
                </h1>
                <p className="text-white text-[15px] leading-[26px]"> 
                  {description ? parse(description) : null}
                </p>
              </div>
              <div className="flex items-center gap-[25px]">
                {/* {primary_button?.text && (
                  <Link
                    className="flex items-center justify-center gap-2.5 px-5 h-10 rounded-full border border-beige/20 bg-navy text-white text-sm leading-[14px]"
                    href={primary_button?.URL ?? "#"}
                  >
                    {primary_button.text}
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.19727 12.6203L9.0006 8.81703C9.44977 8.36787 9.44977 7.63287 9.0006 7.1837L5.19727 3.38037" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                )} */}

                {primary_button?.text && (
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2.5 px-5 h-10 rounded-full border border-beige/20 bg-navy text-white text-sm leading-[14px]"
                    onClick={() => setShowPopup(true)}
                  >
                    {primary_button.text}
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.19727 12.6203L9.0006 8.81703C9.44977 8.36787 9.44977 7.63287 9.0006 7.1837L5.19727 3.38037" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}    



                {second_button?.text && (
                  <Link
                    className="flex items-center gap-2.5 text-[#BBA25A] text-sm leading-[14px]"
                    href={second_button?.URL ?? "#"}
                  >
                    {second_button.text}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12.0001L12.6667 3.3335M12.6667 3.3335V11.6535M12.6667 3.3335H4.34667" stroke="#BBA25A" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0 pr-5">
              <div className="">
                {icon && (
                  <Image width={100} height={100} alt={icon?.alternativeText ?? icon_label ?? "icon"} src={safeImageSrc(icon, "/icon-fil01.png")} className="" />
                )} 
              </div>
            </div>
            <span className="text-white text-[13.7px] leading-[21px] font-normal">{icon_label}</span>
          </div>
        </div>
        <div className="lg:w-[50%] h-[450px] lg:h-auto w-full relative">
          

          {background && (
            <Image width={1000} height={1000} alt={background?.alternativeText ?? "background"} src={safeImageSrc(background, "https://api.builder.io/api/v1/image/assets/TEMP/08378f817f8f1732f87f7ed1c864d751af8e3088?width=1440")} className="absolute inset-0 w-full h-full object-cover" />
          )}
          
        </div>
        </Container>      
      {/* Popup/modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-white hover:text-white z-10"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            >
              &times;
            </button> 
            <div>
              <div data-tf-live={`${primary_button?.URL ?? ""}`}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
