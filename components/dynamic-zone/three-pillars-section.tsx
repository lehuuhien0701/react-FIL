"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion";

 

export const ThreePillarsSection = ({ 
  title_section = "",
  description_section = "", 
  box1_icon = null,
  box1_title = "",
  box1_description = "", 
  box2_icon = null,
  box2_title = "",
  box2_description = "",  
  box3_icon = null,
  box3_title = "",
  box3_description = "",  
}: { 
  title_section?: string;
  description_section?: string;
  box1_icon?: { id?: string; url?: string } | null;
  box1_title?: string;
  box1_description?: string;
  box2_icon?: { id?: string; url?: string } | null;
  box2_title?: string;
  box2_description?: string;  
  box3_icon?: { id?: string; url?: string } | null;
  box3_title?: string;
  box3_description?: string;  
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
          <div className="max-w-6xl mx-auto px-5 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0A2540] mb-[20px]">{title_section}</h2>
            <p className="text-sm text-gray-500 mb-10">{description_section}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] items-stretch"> 
              {/* Card 1 */}
              <article className=" bg-[#06243a] text-white p-10">
                <div>
                  <Image
                    src={box1_icon?.url ? strapiImage(box1_icon.url) : ""}
                    alt="Representation1 Icon"
                    width={28}
                    height={29}
                  />
                </div>
                <h3 className="text-xl font-semibold text-left mt-8 mb-5">{box1_title}</h3>
                <p className="text-sm text-white/90 text-left">{box1_description}</p>
              </article>
              {/* Card 2 */}
              <article className=" bg-[#f1f5ea] text-[#0A2540] p-10">
                <div>
                  <Image
                    src={box2_icon?.url ? strapiImage(box2_icon.url) : ""}
                    alt="Representation2 Icon"
                    width={28}
                    height={29}
                  />
                </div>
                <h3 className="text-xl font-semibold text-left mt-8 mb-5">{box2_title}</h3>
                <p className="text-sm text-gray-700 text-left">{box2_description}</p>
              </article>
              {/* Card 3 */}
              <article className=" bg-[#8f9a98] text-white p-10">
                <div>
                  <Image
                    src={box3_icon?.url ? strapiImage(box3_icon.url) : ""}
                    alt="Representation3 Icon"
                    width={28}
                    height={29}
                  />
                </div>
                <h3 className="text-xl font-semibold text-left mt-8 mb-5">{box3_title}</h3>
                <p className="text-sm text-white/90 text-left">{box3_description}</p>
              </article>
            </div>
          </div>
      </section>
       
    </>
  );
};

export default ThreePillarsSection;
