"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion"; 
import parse from "html-react-parser";

 

export const WhyJoin = ({ 
  title_top_section = "",
  description_top_section = "",
  title = "",
  description = "",
  button_text = "",
  button_link = "",
  background = null,
  icon_comment = null,
  icon_text = "",
  text_search_members_directory = "",
  link_members_directory = "",
  blockcta = [],
  list_details_top_section = [],
  pmembers_directory_search = "hide", // thêm prop mới, mặc định hide
}: { 
  title_top_section?: string;
  description_top_section?: string;
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  background?: { id?: string; url?: string } | null;
  icon_comment?: { id?: string; url?: string } | null;
  icon_text?: string;    
  text_search_members_directory?: string;
  link_members_directory?: string;
  blockcta?: { id?: string | number; title?: string }[];
  list_details_top_section?: { id?: string | number; title?: string }[];
  pmembers_directory_search?: "hide" | "show";
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

       <section className="relative bg-navy "> 
          <div 
            className="h-full absolute z-10 left-0 right-0 bottom-0 overflow-hidden" 
            style={{ backgroundImage: "url('/bg-text.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "top left" }}
        > 
        
        </div>  
          <article className="overflow-hidden relative z-20">
            {title_top_section && (
            <div className="pt-15 pb-20 relative max-w-[1290px] m-auto w-full">
                <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] mb-9 font-bold text-[#BBA25A]">{title_top_section}</h2>
                <div className="lg:flex md:gap-[100px]"> 
                  <div className='mb-10 lg:mb-0'>
                    <p className="w-[380px] text-[#D9D9D9] text-[15px] leading-[26px] pb-4">  
                    {parse(description_top_section)}
                  </p> 
                  </div>
                  <div className="w-full">
                       {Array.isArray(list_details_top_section) && list_details_top_section.length > 0 && list_details_top_section.map((detailsid, idx) => (
                          <div key={detailsid?.id ?? idx} className="flex items-start gap-[60px] pb-3 mb-3 border-b border-white/20">
                            <div className="flex items-center gap-[15px] flex-1"> 
                              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#BBA25A"/>
                              </svg> 
                              <span className="text-white text-sm leading-5">{detailsid?.title ?? ""}</span>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>  
            </div>
            )}

            <div className='lg:flex relative max-w-[1440px] m-auto w-full'> 
                
                 <Image
                    alt=""
                    src={background?.url ? strapiImage(background.url) : ""}
                    width={700}
                    height={550}
                    className="w-full lg:w-[50%] flex-1 object-cover"
                  />
                <div className="flex-1 px-5 lg:px-20 py-10 lg:py-20 flex flex-col gap-10 lg:gap-20 relative z-10">
                  <div className="flex flex-col">
                    <div>
                      <h2 className="mb-5 font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">{title}</h2>
                      <p className="w-[380px] text-[#D9D9D9] text-[15px] leading-[26px]">{description}</p>
                    </div>
                    <div className="flex items-center mt-4 text-[#D9D9D9] text-[15px] leading-[26px]">
                      {icon_comment && (
                        <Image
                          alt="icon comment"
                          src={icon_comment?.url ? strapiImage(icon_comment.url) : ""}
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] object-contain mr-5"
                        />
                      )}  
                      {/* Sửa lỗi: chỉ cần render giá trị, không dùng {} trong JSX */}
                      {icon_text && (
                        <span>{icon_text}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-5">   
                        <div className="flex flex-col gap-5">
                          {/* Lặp qua blockcta array và hiển thị title */}
                          {Array.isArray(blockcta) && blockcta.length > 0 && blockcta.map((cta, idx) => (
                            <div key={cta?.id ?? idx} className="flex items-start gap-[60px] pb-5 border-b border-white/20">
                              <div className="flex items-center gap-[15px] flex-1"> 
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#BBA25A"/>
                                </svg> 
                                <span className="text-white text-sm leading-5">{cta?.title ?? ""}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {button_link && (
                          <div className="flex items-center gap-4 mt-10">
                            <a href={button_link} className="flex items-center gap-3 text-[#BBA25A] font-medium hover:underline">{button_text}
                              <span aria-label="Go" className="w-14 h-14 rounded-full bg-[#BBA25A] flex items-center justify-center hover:bg-[#e0c56d] transition-colors">
                                <svg className="rotate-[-45deg]" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12h14M13 5l6 7-6 7" stroke="#042033" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg> 
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                  </div>
                  
                </div>
            </div>
          </article>

          {/* Member Search & Logo Carousel */}
          {pmembers_directory_search === "show" && (
          <article className="pt-20 flex flex-col items-center gap-[72px] relative z-20">
            <div className="px-5 lg:px-20 flex flex-col items-center gap-5 w-full">
              <div className="w-full md:w-[600px] px-5 py-4 rounded-[5px] border border-white flex items-center justify-between">
                <span className="text-white text-[15px] leading-[26px]">{text_search_members_directory}</span>
                <Link href={`${link_members_directory}?search=sec`} className="w-[30px] h-[30px] flex items-center justify-center">
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0.558594C23.0081 0.558594 29.5 7.05046 29.5 15.0586C29.5 23.0667 23.0081 29.5586 15 29.5586C6.99187 29.5586 0.5 23.0667 0.5 15.0586C0.5 7.05046 6.99187 0.558594 15 0.558594Z" stroke="#ffffff"/>
                      <path d="M11 15.0586H19M19 15.0586L15.5 11.0586M19 15.0586L15.5 19.0586" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg> 
                </Link>
              </div>
            </div>
            <div className="w-full relative h-[200px] overflow-hidden">
              <div className="">
                {/* Đổi img thành Image */}
                <Image
                  className="object-cover m-auto"
                  alt=""
                  src="/list-logo.svg" 
                  width={920}
                  height={128}
                  priority
                />
              </div>
              <div className="absolute left-0 top-0 w-[170px] h-[200px] bg-gradient-to-r from-navy to-transparent"></div>
              <div className="absolute right-0 top-0 w-[170px] h-[200px] bg-gradient-to-l from-navy to-transparent"></div>
            </div>
          </article>
          )}
      </section>
       
    </>
  );
};

export default WhyJoin;
