"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion";

 

export const OurFoundingValues = ({ 
  title_section = "", 
  sub_title_section = "", 
  note = "",
  our_founding_values = null,
}: { 
  title_section?: string; 
  sub_title_section?: string;
  note?: string;
  our_founding_values?: any;
}) => {
  const getImageSrc = (media: any) => {
    try {
      const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return url ? strapiImage(url) : undefined;
    } catch {
      return undefined;
    }
  };

   
  const ArrowRight = () => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15.0587L15.8333 4.22534M15.8333 4.22534V14.6253M15.8333 4.22534H5.43334" stroke="#0A2540" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> 
  ); 
 

  return (
    <>
      <section className="py-20 bg-white bg-[url('/bg-line.svg')] bg-top bg-repeat-y">
        <div className="max-w-[1110px] mx-auto px-6">
          <h2 className="text-center text-[#0A2540] font-serif font-semibold text-2xl lg:text-3xl mb-10">
            {title_section}
          </h2>

          {sub_title_section && (
            <p className="font-inter font-normal text-[15px] leading-[26px] text-center text-[#88938F]">
              {sub_title_section}
            </p>
          )} 

          {(() => {
            const items = Array.isArray(our_founding_values) ? our_founding_values : [];
            const count = items.length;
            let gridCols = "md:grid-cols-1";
            if (count > 0) {
              if (count % 4 === 0) gridCols = "md:grid-cols-4";
              else if (count % 4 === 3) gridCols = "md:grid-cols-3";
              else if (count % 4 === 2) gridCols = "md:grid-cols-2";
              else gridCols = "md:grid-cols-1";
            }
            return (
              <div className={`text-center grid grid-cols-1 ${gridCols} gap-12 mt-20`}>
                {items.map((item, idx) => (
                  <div key={item?.id ?? idx}>
                    <h3 className="text-xl text-[#d4b24a] font-semibold mb-3">{item?.title}</h3>
                    {item?.description && (
                      <p className="leading-[26px] text-[#88938F]">{item?.description}</p>
                      )}
                    
                    {item?.sub_description && (
                      <p className="text-xs text-[#88938F] mt-3">{item?.sub_description}</p>
                    )}
                    {item?.button_link && (
                      <Link href={item?.button_link} className="flex items-center text-[#BBA25A] text-sm font-medium mt-4 mx-auto">
                        {item?.button_text} 
                        <svg className="ml-3" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 9.16663L9.16667 0.5M9.16667 0.5V8.82003M9.16667 0.5H0.84667" stroke="#BBA25A" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>  
                      </Link>
                    )}

                  </div>
                ))}
              </div>
            );
          })()}
          <p className="mt-20 text-center text-sm text-[#88938F] max-w-3xl mx-auto">
            {note}
          </p>
        </div>
      </section>
    </>
  );
};

export default OurFoundingValues;
