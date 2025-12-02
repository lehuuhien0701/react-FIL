"use client";
import React from "react";
import { Container } from "../container";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { add } from "date-fns";

export const MemberProfile = ({ 
  company_name = "", 
  address = "", 
  phone = "",  
  email = "",
  logo = null
  
}: { 
  company_name?: string; 
  address?: string; 
  phone?: string;  
  email?: string;
  logo?: any | null; 
  
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

  return (
    <>
       <div className="w-full bg-[#fff] pt-16 pb-10 flex flex-col items-center relative bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
        
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
                <div className="rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-[#fff]">
                     
                    {logo && (
                        <Image width={100} height={100} alt={logo?.alternativeText ?? "logo"} src={safeImageSrc(logo, "/icon-fil01.png")} className="" />
                    )} 

                </div>
            </div>
             
            <div className="mt-8 flex flex-col items-center">
            {company_name && (
                <h2 className="text-[#0A2540] text-[32px] font-bold mb-3">{company_name}</h2>
            )}        
            <div className="flex flex-wrap items-center justify-center font-medium gap-4 text-[#0A2540] text-[20px] mb-5">
                {address && (
                <span className="flex items-center gap-2 ">
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.34315 14.6569C4.27976 15.5935 6.23844 17.5521 7.5862 18.8999C8.36725 19.681 9.63232 19.6814 10.4134 18.9003C11.7377 17.576 13.6584 15.6553 14.6569 14.6569C17.781 11.5327 17.781 6.46734 14.6569 3.34315C11.5327 0.218952 6.46734 0.218952 3.34315 3.34315C0.218952 6.46734 0.218953 11.5327 3.34315 14.6569Z" stroke="#0A2540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 9C6 10.6569 7.34315 12 9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9Z" stroke="#0A2540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {address}
                </span>
                )}
                {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4L11.1094 9.2604C10.4376 9.70827 9.5624 9.70827 8.8906 9.2604L1 4M17 15L3 15C1.89543 15 1 14.1046 1 13L1 3C1 1.89543 1.89543 1 3 1L17 1C18.1046 1 19 1.89543 19 3L19 13C19 14.1046 18.1046 15 17 15Z" stroke="#0A2540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                {email}
                </a>
                )}
                {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 19C18.1046 19 19 18.1046 19 17L19 13.7208C19 13.2903 18.7246 12.9082 18.3162 12.7721L13.8228 11.2743C13.3507 11.1169 12.8347 11.3306 12.6121 11.7757L11.4835 14.033C9.03878 12.9308 7.06925 10.9612 5.96701 8.5165L8.22427 7.38787C8.66938 7.16531 8.88311 6.64932 8.72574 6.17721L7.22792 1.68377C7.09181 1.27543 6.70967 1 6.27924 1L3 1C1.89543 1 0.999999 1.89543 0.999999 3L0.999999 4C1 12.2843 7.71573 19 16 19L17 19Z" stroke="#0A2540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {phone}
                </a>
                )}
            </div>
            
            <button className="bg-[#0A2540] text-white px-5 py-3 rounded-full text-sm shadow transition mb-6">
                Edit Profile  <svg className="pl-2 inline-block" width="20" height="19" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.19727 12.1203L9.0006 8.31703C9.44977 7.86787 9.44977 7.13287 9.0006 6.6837L5.19727 2.88037" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            </div>  
        </div>
    </>
  );
};

export default MemberProfile;
