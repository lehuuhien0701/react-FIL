"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion";

// small arrow icon used in the banner
const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5.19727 12.6203L9.0006 8.81703C9.44977 8.36787 9.44977 7.63287 9.0006 7.1837L5.19727 3.38037" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const NewsInnovation = ({
  description = "",
  title = "",
  icon1 = null,
  detail_icon1 = "",
  icon2 = null,
  detail_icon2 = "",
  icon3 = null,
  detail_icon3 = "", 

  icon_box1_small = null,
  title_box1_small = "",
  button_text_box1_small = "",
  button_link_box1_small = "",

  icon_box2_small = null,
  title_box2_small = "",
  button_text_box2_small = "",
  button_link_box2_small = "",
  
  icon_box_big = null,
  background_image_box_big = null,
  title_box_big = "",
  button_text_box_big = "",
  button_link_box_big = "",


}: {
  description?: string;
  title?: string;
  icon1?: { id?: string; url?: string } | null;
  detail_icon1?: string;
  icon2?: { id?: string; url?: string } | null;
  detail_icon2?: string;
  icon3?: { id?: string; url?: string } | null;
  detail_icon3?: string; 
  
  icon_box1_small?: { id?: string; url?: string } | null;
  title_box1_small?: string;
  button_text_box1_small?: string;
  button_link_box1_small?: string;

  icon_box2_small?: { id?: string; url?: string } | null;
  title_box2_small?: string;
  button_text_box2_small?: string;
  button_link_box2_small?: string;

  icon_box_big?: { id?: string; url?: string } | null,
  background_image_box_big?: { id?: string; url?: string } | null;
  title_box_big?: string;
  button_text_box_big?: string;
  button_link_box_big?: string;



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
      {/* Đổi img thành Image */}
      <Image
        className="mt-[-5px]"
        alt=""
        src="/Vector03.svg"
        width={1440}
        height={40}
        priority
      />

      <section className="bg-white bg-[url('/bg-line.svg')] bg-top bg-repeat-y">
        
        <div className='relative z-20 px-5 lg:px-20 py-10 lg:py-[120px] lg:flex gap-20 max-w-[1440px] m-auto w-full'>
            <div className="mb-10 lg:mb-0 flex-1 flex flex-col justify-center gap-12">
              <div>
                <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45px] font-bold text-black mb-5 lg:mb-14">{title}</h2>
                <div className="flex flex-col gap-10">
                  <p className="text-[#333] text-base leading-[27.2px]">
                    {description}
                  </p>
                   

                  <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <Image
                        alt=""
                        src={icon1?.url ? strapiImage(icon1.url) : ""}
                        width={24}
                        height={24}
                        className=""
                      />
                      <span className="text-[#333] text-sm leading-5">{detail_icon1}</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <Image
                        alt=""
                        src={icon2?.url ? strapiImage(icon2.url) : ""}
                        width={24}
                        height={24}
                        className=""
                      />
                      <span className="text-[#333] text-sm leading-5">{detail_icon2}</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <Image
                        alt=""
                        src={icon3?.url ? strapiImage(icon3.url) : ""}
                        width={24}
                        height={24}
                        className=""
                      />
                      <span className="text-[#333] text-sm leading-5">{detail_icon3}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[800px] lg:flex flex-row gap-2.5">
              <div className="flex flex-col gap-2.5 w-full lg:w-[50%]">
                <div className="flex-1 h-[300px] p-10 bg-[#001D40] shadow-[0_24px_70px_-12px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                  <div className="flex flex-col gap-5">
                     
                    <Image
                        alt=""
                        src={icon_box1_small?.url ? strapiImage(icon_box1_small.url) : ""}
                        width={32}
                        height={33}
                        className="opacity-70"
                      />
                    <p className="text-white text-xl leading-[30px]">{title_box1_small}</p>
                  </div>
                  {button_text_box1_small && (
                    <Link href={button_link_box1_small || "#"} className="flex items-center gap-2.5 text-gold text-[13.7px] leading-[19.6px]">
                      {button_text_box1_small}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 9.16663L9.16667 0.5M9.16667 0.5V8.82003M9.16667 0.5H0.84667" stroke="#BBA25A" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </Link>
                  )}
                </div>
                <div className="flex-1 h-[300px] p-10 bg-[#EDF0E5] flex flex-col justify-between"> 
                  <div className="flex flex-col gap-5">
                     
                    <Image
                        alt=""
                        src={icon_box2_small?.url ? strapiImage(icon_box2_small.url) : ""}
                        width={32}
                        height={33}
                        className="opacity-70"
                      />
                    <p className="text-[#0A2540] text-xl leading-[30px]">{title_box2_small}</p>
                  </div>
                  {button_text_box2_small && (
                    <Link href={button_link_box2_small || "#"} className="flex items-center gap-2.5 text-[#0A2540] text-[13.7px] leading-[19.6px]">
                      {button_text_box2_small}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 9.16663L9.16667 0.5M9.16667 0.5V8.82003M9.16667 0.5H0.84667" stroke="#0A2540" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg> 
                    </Link>
                  )}
                </div>
              </div>
              <div className="mt-[10px] lg:mt-0 lg:w-[50%] lg:h-[620px] p-10 bg-sage shadow-[10px_24px_70px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-between relative overflow-hidden">
                 
                <Image
                    alt=""
                    src={background_image_box_big?.url ? strapiImage(background_image_box_big.url) : ""}
                    width={200}
                    height={250}
                    className="absolute right-0 bottom-0 w-[222px] h-[324px] opacity-70 mix-blend-luminosity"
                  />

                <div className="flex flex-col gap-5 relative z-10"> 
                  <Image
                    alt=""
                    src={icon_box_big?.url ? strapiImage(icon_box_big.url) : ""}
                    width={32}
                    height={33}
                    className=""
                  />

                  <p className="text-white text-xl leading-[30px]">
                    {title_box_big}
                  </p>
                </div>
                {button_text_box_big && (
                    <Link href={button_link_box_big || "#"} className="flex items-center gap-2.5 text-white text-[13.7px] leading-[19.6px]">
                      {button_text_box_big}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 9.16663L9.16667 0.5M9.16667 0.5V8.82003M9.16667 0.5H0.84667" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg> 
                    </Link>
                  )}  
              </div>
            </div> 
          </div>
      </section>
       
    </>
  );
};

export default NewsInnovation;
