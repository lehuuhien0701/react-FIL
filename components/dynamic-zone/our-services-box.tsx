"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion";

export const OurServicesBox = ({
  title_section = "",
  box_left_title = "",
  box_left_description = "",
  box_left_icon = null,
  box_left_thumbnail = null,
  box_left_list_details = [],

  box_right_title = "",
  box_right_description = "",
  box_right_icon = null,
  box_right_thumbnail = null,
  box_right_list_details = [],

  box_center_1_title = "",
  box_center_1_description = "",
  box_center_1_icon = null,

   
  box_center_2_title = "",
  box_center_2_description = "",
  box_center_2_icon = null,


}: {
  title_section?: string;
  box_left_title?: string;
  box_left_description?: string;
  box_left_icon?: { id?: string; url?: string } | null;
  box_left_thumbnail?: { id?: string; url?: string; alternativeText?: string; width?: number; height?: number } | null;
  box_left_list_details?: {
    id?: string;
    title?: string; 
  }[];

  box_right_title?: string;
  box_right_description?: string;
  box_right_icon?: { id?: string; url?: string } | null;
  box_right_thumbnail?: { id?: string; url?: string; alternativeText?: string; width?: number; height?: number } | null;
  box_right_list_details?: {
    id?: string;
    title?: string; 
  }[];
  box_center_1_title?: string;
  box_center_1_description?: string;
  box_center_1_icon?: { id?: string; url?: string } | null;
 
  box_center_2_title?: string;
  box_center_2_description?: string;
  box_center_2_icon?: { id?: string; url?: string } | null;

}) => {
  const getImageSrc = (media: any) => {
      try {
        const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
        return url ? strapiImage(url) : undefined;
      } catch {
        return undefined;
      }
    };
  console.log('box_right_icon:', box_right_icon);

  return (
    <>
 
      <section className="w-full bg-[#efede7] py-16 px-2 bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
        <h2 className="text-center text-[32px] font-serif font-bold text-[#0A2540] mb-20">
          {title_section}
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-[10px] max-w-screen-xl mx-auto"> 
          


          <div className="relative bg-[#0a2540] text-white rounded-none shadow-lg w-full md:w-1/3 px-8 pt-8 flex flex-col gap-4 min-h-[340px] bg-[url('/bg-g.png')] bg-[position:bottom_left]  bg-no-repeat">
         
            <div className="relative z-10">
              {Array.isArray(box_left_icon) && box_left_icon[0]?.url && (
                <Image
                  alt="icon comment"
                  src={strapiImage(box_left_icon[0].url)}
                  width={28}
                  height={29}
                  className="mb-5"
                />
              )}   
              <h3 className="font-inter font-medium text-xl mb-3">{box_left_title}</h3>
              <p className="text-[15px] leading-[26px] mb-5">
                {box_left_description}
              </p>
              <div className="flex flex-col gap-0 pb-8">  
                  {/* Render each detail from box_left_list_details */}
                  {box_left_list_details?.map((detail, idx) => (
                    <div
                      key={detail.id ?? idx}
                      className="flex items-start py-3 border-b border-[#D8D4C533]"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className='w-4'>
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_2939_38)">
                          <path d="M5.84192 11.5008C5.56569 11.5008 5.28999 11.3971 5.07904 11.1891L0 6.18272L1.52576 4.67825L5.84192 8.93268L14.4742 0.423828L16 1.9283L6.6048 11.1891C6.39385 11.3971 6.11816 11.5008 5.84192 11.5008Z" fill="#BBA25A"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_2939_38">
                          <rect width="16" height="12" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg> 
                        </div>
                        <div className='w-[calc(100%-16px)]'>
                          <span className="text-[#fff] text-[15px] leading-6">{detail.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div> 
            </div>
            <div className="flex justify-center absolute left-0 bottom-0">
                {/* Handle box_left_thumbnail as object from Strapi */}
                {box_left_thumbnail?.url && (
                  <Image
                    alt={box_left_thumbnail.alternativeText ?? ""}
                    src={strapiImage(box_left_thumbnail.url)}
                    width='245'
                    height='300'
                    className=""
                  />
                )}
            </div>      


          </div>



          {/* Board of Directors */}
          <div className="relative w-full md:w-1/3 flex flex-col gap-4">
              <div className="bg-[#EDF0E5] p-10 mb-[10px] min-h-[190px]">
                {box_center_1_icon?.url && (
                  <Image
                    alt='icon comment'
                    src={strapiImage(box_center_1_icon.url)}
                    width='28'
                    height='29'
                    className="mb-5"
                  />
                )}
                <h3 className="font-inter font-medium text-xl mb-3 text-[#0A2540]">{box_center_1_title}</h3>
                <p className="text-[15px] leading-[26px] text-[#0A2540] m-0">
                  {box_center_1_description}
                </p> 
              </div>
              <div className="bg-white p-10 min-h-[190px]">
                {box_center_2_icon?.url && (
                  <Image
                    alt='icon comment'
                    src={strapiImage(box_center_2_icon.url)}
                    width='28'
                    height='29'
                    className="mb-5"
                  />
                )}
                <h3 className="font-inter font-medium text-xl mb-3 text-[#0A2540]">{box_center_2_title}</h3>
                <p className="text-[15px] leading-[26px] text-[#88938F] m-0">
                  {box_center_2_description}
                </p> 
              </div>
          </div>
          {/* Executive Bureau */}
          <div className="relative bg-[#88938F] text-white rounded-none shadow-lg w-full md:w-1/3 px-8 py-8 flex flex-col gap-4 min-h-[340px] bg-[url('/bg-g1.png')] bg-[position:bottom_right]  bg-no-repeat">
            <div className="relative z-10">
              {/* Check and handle box_right_icon as object from Strapi */}
              {box_right_icon?.url && (
                <Image
                 alt="icon comment"
                  src={strapiImage(box_right_icon.url)}
                  width='28'
                  height='29'
                  className="mb-5"
                />
              )}   
              <h3 className="font-inter font-medium text-xl mb-3">{box_right_title}</h3>
              <p className="text-[15px] leading-[26px] mb-5">
                {box_right_description}
              </p>
              <div className="flex flex-col gap-0 pb-8">  
                  {/* Render each detail from box_right_list_details */}
                  {box_right_list_details?.map((detail, idx) => (
                    <div
                      key={detail.id ?? idx}
                      className="flex items-start py-3 border-b border-[#ffffff]"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className='w-4'>
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_2939_700)">
                          <path d="M5.84192 11.5008C5.56569 11.5008 5.28999 11.3971 5.07904 11.1891L0 6.18272L1.52576 4.67825L5.84192 8.93268L14.4742 0.423828L16 1.9283L6.6048 11.1891C6.39385 11.3971 6.11816 11.5008 5.84192 11.5008Z" fill="white"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_2939_700">
                          <rect width="16" height="12" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg> 
                        </div>
                        <div className='w-[calc(100%-16px)]'>
                          <span className="text-[#fff] text-[15px] leading-6">{detail.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div> 
            </div>
            <div className="flex justify-center absolute right-0 bottom-0">
                {/* Handle box_right_thumbnail as object from Strapi */}
                {box_right_thumbnail?.url && (
                  <Image
                    alt={box_right_thumbnail.alternativeText ?? ""}
                    src={strapiImage(box_right_thumbnail.url)}
                    width='245'
                    height='300'
                    className=""
                  />
                )}
            </div> 
          </div>
        </div>
      </section>
       
    </>
  );
};

export default OurServicesBox;


