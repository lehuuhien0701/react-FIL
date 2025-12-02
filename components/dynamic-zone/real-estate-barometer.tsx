"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";

// small arrow icon used in the banner
const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5.19727 12.6203L9.0006 8.81703C9.44977 8.36787 9.44977 7.63287 9.0006 7.1837L5.19727 3.38037" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RealEstateBarometer = ({
  background = null,
  title = "",
  primary_button = null,
  details = [],
}: {
  background?: any | null;
  title?: string;
  primary_button?: { id?: string; text?: string; URL?: string; target?: string } | null;
  details?: any[];
}) => {
  const getImageSrc = (media: any) => {
    try {
      const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return url ? strapiImage(url) : undefined;
    } catch {
      return undefined;
    }
  };

  const bgSrc = getImageSrc(background);
  const ArrowRight = () => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15.0587L15.8333 4.22534M15.8333 4.22534V14.6253M15.8333 4.22534H5.43334" stroke="#0A2540" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> 
  );
  // normalize details (repeatable) if needed
  const normalizedDetails = Array.isArray(details)
    ? details.map((d: any) => d?.attributes ?? d)
    : [];

  return (
    <>
     

      <section className="bg-navy">
        <div className="px-5 lg:px-20 py-10 lg:py-[120px] flex flex-col items-center gap-20 relative overflow-hidden max-w-[1440px] m-auto w-full">              
            <Image width={2500} height={471}
                src={strapiImage(background?.url)}
                alt={background?.alternativeText ?? ""}
                className="absolute right-[-191px] bottom-0 left-0 top-0 ring-0 m-auto"
              />
            <div className="lg:flex justify-between items-center w-full relative z-10">
              {title && (
                <h2 className="mb-5 lg:mb-0 font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">{title}</h2>
              )}  
              

              {primary_button && (
                <Link
                  className="flex items-center gap-3 text-white text-sm leading-[14px]"
                  href={primary_button?.URL ?? "#"}
                  target={primary_button?.target ?? undefined}
                  rel={primary_button?.target === "_blank" ? "noopener noreferrer" : undefined}
                > 
                  {primary_button?.text ?? "Join now"}
                  <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                    <ArrowRight  />
                  </div>
                </Link>
              )}  



            </div>
            <div className="lg:flex gap-10 w-full relative z-10">
              {/* default metrics */}
              
              {/* render repeatable details from Strapi */}
              {normalizedDetails.length > 0 &&
                normalizedDetails.map((detail: any, idx: number) => (
                  <div key={detail?.id ?? idx} className="flex-1 pr-10 flex flex-col gap-[15px]">
                    <div className="flex justify-center items-end gap-[15px]">
                      <span className="font-display text-[40px] leading-[40px] lg:text-[60px] font-bold text-gold">{detail?.percen ?? ""}</span>
                      <span className="text-white text-[17.6px] leading-[27px] opacity-60">{detail?.sub_percen ?? ""}</span>
                    </div>
                    <p className="text-white text-[17.6px] leading-[27px] text-center">{detail?.description ?? ""}</p>
                  </div>
                ))
              }
            </div>
        </div>
      </section>
    </>
  );
};

export default RealEstateBarometer;
