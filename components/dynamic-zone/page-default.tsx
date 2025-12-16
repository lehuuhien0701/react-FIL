"use client";
import React from "react";
import { Container } from "../container";
import parse from "html-react-parser"; 
import { strapiImage } from "@/lib/strapi/strapiImage"; 

export const PageDefault = ({
  content = "", 
}: {
  content?: string; 
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

  //console.log("PageDefault content:", content); 

  return (
    <section className="page-default">  
       {content && (
        <section className="max-w-[1240px] m-auto px-6 py-10 lg:py-20">
          <div className="text-left">
            {typeof content === "string" ? parse(content) : null}
          </div>
        </section>
       )}
    </section>
  );
};

