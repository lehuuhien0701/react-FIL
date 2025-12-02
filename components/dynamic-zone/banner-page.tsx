 


"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion";

 

export const BannerPage = ({ 
  title = "",
  subtitle = "", 
  description = "", 
  background_logos = null, 
}: { 
  title?: string;
  subtitle?: string;
  description?: string;
  background_logos?: { id?: string; url?: string } | null;
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

        <section className="bg-primary py-20">
          <Container className="px-5 text-center">
              {subtitle && (
              <span className="inline-block px-4 py-[6.5px] rounded-full border border-white/20 text-xs text-white mb-6">
              {subtitle}
              </span>
              )}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
              {title}
              </h1>
              <p className="flex justify-center items-center content-center text-white text-lg bg-image">
              {description}
              </p>
              {background_logos && (  
                <Image
                  alt=""
                  src={background_logos?.url ? strapiImage(background_logos.url) : ""} 
                  width={920}
                  height={128}
                  className="mt-20 m-auto flex-1 object-cover"
                /> 
              )}


              {/* {background_logos && (
                <div
                  className="mt-20 w-full flex-1 object-cover"
                  style={{
                    backgroundImage: `url('${background_logos?.url ? strapiImage(background_logos.url) : ""}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "128px"
                  }}
                />
              )} */}

              
          </Container>
      </section>
       
    </>
  );
};

export default BannerPage;

