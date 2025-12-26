"use client";
import React from "react";
import { Container } from "../container"; 
import Image from "next/image"; 
import { strapiImage } from "@/lib/strapi/strapiImage";
import BlockCta from "./blockcta";


const CheckIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.84192 12.0008C5.56569 12.0008 5.28999 11.8971 5.07904 11.6891L0 6.68272L1.52576 5.17825L5.84192 9.43268L14.4742 0.923828L16 2.4283L6.6048 11.6891C6.39385 11.8971 6.11816 12.0008 5.84192 12.0008Z" fill="#BBA25A"/>
  </svg>
);
export const SectionBlockCommitmentCard = ({
  SectionBlockCommitmentCard = [],
}: { 
   SectionBlockCommitmentCard?: {
    id?: string;
    title?: string;
    description?: string;
    note?: string;
    thumbnail?: any;
    icon?: any;
    blockcta?: { id?: string; title?: string }[]; // list_details có field title
  }[];
 }) => {

  return (
    
    <div className="border-b border-beige-light bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
      <Container className="custom-box px-5 lg:px-20 py-10 lg:py-20 md:flex gap-10 max-w-[1440px] m-auto w-full">
        {Array.isArray(SectionBlockCommitmentCard) && SectionBlockCommitmentCard.length > 0 ? (
          SectionBlockCommitmentCard.map((rawItem: any, idx: number) => {
            // Kiểm tra kỹ các field media/component
     
            // normalize Strapi nested shapes
            const title = rawItem?.title ?? "";
            const background = rawItem?.background ?? null;
            const note = rawItem?.note ?? null;
            const blockcta = rawItem?.blockcta ?? null;
            const description = rawItem?.description ?? null;
            const icon = rawItem?.icon ?? null;
 
            // apply different classes for even/odd items
            const isEven = idx % 2 === 0;
            const cardBase = "flex-1 p-[20px_20px_60px] lg:p-[60px_60px_80px] border border-black/20 shadow-[10px_24px_70px_-12px_rgba(0,0,0,0.08)] flex flex-col gap-[20px] relative overflow-hidden";
            const cardBgClass = isEven ? "mb-10 md:mb-0 bg-white" : "bg-[#88938F]";
            const titleDescColor = isEven ? "text-[#000]" : "text-[#fff]";
            const descriptionDescColor = isEven ? "text-[#88938F]" : "text-[#fff]";

           return (
              <>
              <div className={`${cardBase} ${cardBgClass}`}>
                 {background && (
                 <Image
                   width={1000}
                   height={1000}
                   src={strapiImage(background?.url)} 
                   alt={background?.alternativeText ?? ""}
                   className={`absolute bottom-0 ${isEven ? "left-0" : "right-0"} w-[245px] h-[364px] mix-blend-luminosity`}
                 />
                 )}
 
                 <div className="flex flex-col items-center gap-[14px] relative p-0 md:p-4">
                   {icon && (
                     <Image
                       width={28}
                       height={32}
                       src={strapiImage(icon?.url)} 
                       alt={icon?.alternativeText ?? ""} 
                     />
                   )}
                   {title && (
                      <h2 className={`font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-center ${titleDescColor}`}>{title}</h2>
                   )} 
                   {description && (
                   <p className={`text-[15px] leading-[26px] text-center ${descriptionDescColor}`}>
                     {description}
                   </p>
                   )} 
                 </div>
                 <div className="flex flex-col relative">
                  
                  {Array.isArray(blockcta) && blockcta.length > 0 ? (
                     blockcta.map((b, i) => {
                       // each b is a BlockCta component data; use its title/text field as content
                       const content = b?.title ?? b?.text ?? null;
                       return <BlockCta key={b?.id ?? i} content={content} />;
                     })
                   ) : (
                     // fallback: if you previously stored note as plain text list, render it via BlockCta
                     <BlockCta content={note ?? null} />
                   )}
 
                 </div>
                 {note && (
                  <p className="text-navy text-sm leading-5 text-center relative">
                    {note}
                  </p>
                 )} 
               </div>
               </>
             );
           })
         ) : null}
      </Container>
     </div>
   );
 };
