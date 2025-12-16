"use client";
//import React from "react";
import React, { useState, useEffect } from "react";
import { Container } from "../container";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import BlockCta from "./blockcta"; // import BlockCta component

export const SectionBlock = ({
  title = "",
  subtitle = "",
  description = "",
  note = "",
  // blockcta is the repeatable component array from Strapi
  blockcta = null,
  background = null,
  content_bottom ="",
  content_bottom_code_popup ="",
  layout = "ImageLeft", // add layout prop with default
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  note?: string;
  blockcta?: any[] | null;
  background?: any | null;
  content_bottom?: string;
  content_bottom_code_popup?: string;
  layout?: "ImageLeft" | "ImageRight";
}) => {
  // helper to safely get strapi image url or fallback
  const safeImageSrc = (media: any, fallback: string) => {
    try {
      const url =
        media?.url ??
        media?.data?.attributes?.url ??
        media?.attributes?.url ??
        null;
      return strapiImage(url) ?? fallback;
    } catch {
      return fallback;
    }
  };
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

  // Determine section class based on layout
  const sectionClass = `bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y${
    layout === "ImageRight" ? " img-right" : ""
  }`;

  return (
    <section className={sectionClass}>
      <div className="relative px-5 lg:px-20 py-10 lg:py-20 pb-40 lg:flex items-center max-w-[1440px] m-auto w-full">
        {background && (
          <Image
            width={1000}
            height={1000}
            alt={background?.alternativeText ?? "background"}
            src={safeImageSrc(
              background,
              "https://api.builder.io/api/v1/image/assets/TEMP/418e83592b040ad6dd5367793119430c8143ede6?width=1464"
            )}
            className="flex-1 w-full lg:w-[50%] h-[450px] lg:h-[640px] object-cover"
          />
        )}

        <div
          className="
          lg:w-[656px] p-10 bg-white 
          shadow-[10px_24px_70px_-12px_rgba(0,0,0,0.08)] 
          flex flex-col gap-5 
          relative z-10 
          mr-0
          lg:ml-[-60px]  
          h-fit 
          border-[1px] border-[#BBA25A]
        "
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-[32px] leading-[40px] lg:text-[37px] lg:leading-[45px] text-[#333] [&>span]:text-gold">
              {title ? parse(title) : null}
            </h2>
            <p className="text-[#88938F] text-[15px] leading-[26px]">
              {description ? parse(description) : null}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-gray-500 text-sm leading-5 font-semibold">
              {note ? parse(note) : null}
            </p>

            <div className="flex flex-col gap-0 [&_span]:text-[#0A2540] [&_.cta-item]:border-[#33333333]/20 [&_.cta-block:last-child_>.cta-item]:border-0">
              {/* render BlockCta items coming from Strapi repeatable component */}
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
           
            {content_bottom && (
              <button
                type="button"
                className="text-left text-[#88938F] text-[15px] leading-[26px]"
                onClick={() => setShowPopup(true)}
              >
                {content_bottom } 
              </button>
            )}      

            {/* Popup/modal */}
            {showPopup && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
                <div className="max-w-3xl w-full relative">
                  <button
                    className="absolute top-2 right-2 text-white hover:text-white z-10"
                    onClick={() => setShowPopup(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button> 
                  <div>
                    <div data-tf-live={`${content_bottom_code_popup ?? ""}`}></div>
                  </div>
                </div>
              </div>
            )}    


          </div>




          
        </div>
      </div>
    </section>
  );
};

