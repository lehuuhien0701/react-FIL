"use client";
//import React from "react";
import React, { useState, useEffect } from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion"; 
import parse from "html-react-parser";

 

export const WhyJoin = ({ 
  title_top_section = "",
  description_top_section = "",
  our_missions_in_action = null,
  title = "",
  description = "",
  button_text = "",
  button_code_popup = "",
  background = null,
  multiple_logo = null,
  icon_comment = null,
  icon_text = "",
  text_search_members_directory = "",
  link_members_directory = "",
  blockcta = [],
  subtitle_box_left = "",
  subtitle_box_right = "",
  list_details_top_section = [],
  list_details_top_section2 = [],
  list_logo = [],
  pmembers_directory_search = "hide", // thêm prop mới, mặc định hide
  layout = "default", // mặc định là "default"
}: { 
  title_top_section?: string;
  description_top_section?: string;
  our_missions_in_action?: any[] | null; 
  title?: string;
  description?: string;
  button_text?: string;
  button_code_popup?: string;
  background?: { id?: string; url?: string } | null;
  multiple_logo?: { id?: string; url?: string } | null;
  icon_comment?: { id?: string; url?: string } | null;
  icon_text?: string;    
  text_search_members_directory?: string;
  link_members_directory?: string;
  blockcta?: { id?: string | number; title?: string }[];
  subtitle_box_left?: string;
  subtitle_box_right?: string;
  list_details_top_section?: { id?: string | number; title?: string }[];
  list_details_top_section2?: { id?: string | number; title?: string }[];
  list_logo?: { id?: string | number; image?: { url?: string } }[];
  pmembers_directory_search?: "hide" | "show";
  layout?: string; // kiểu dữ liệu cho prop layout
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
 

  return (
    <>
      
      <section className="relative bg-navy"> 
          <div 
            className="h-full absolute z-10 left-0 right-0 bottom-0 overflow-hidden" 
            style={{ backgroundImage: "url('/bg-text.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "top left" }}
        >  
        </div>  
        
          <article className="relative z-30">
              
              {(layout === "curved_background" || layout === "why_it_matters_curved_background") && (
                <div className="relative">
                  <div
                    className="min-h-[80px] absolute z-10 left-0 right-0 bottom-0 overflow-hidden bg-custom-blue -mb-1"
                    style={{
                      backgroundImage: "url('/Vector01.svg')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center top",
                      backgroundSize: "cover"
                    }}
                  ></div>
                </div>
              )}
              {layout === "list_col_top_section" ? ( 
                <div className="relative z-10 flex flex-col gap-10 lg:gap-20 px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto">
                  <h2 className="text-center font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">
                    {title_top_section}
                  </h2>
               
                  {/* JS logic for grid columns and item width */}
                  {(() => {
                    const items = Array.isArray(our_missions_in_action) ? our_missions_in_action : [];
                    const count = items.length;
                    const mod = count % 4;
    
                    let gridClass = "text-center grid grid-cols-1 gap-10";
                    if (count > 0) gridClass += " md:grid-cols-12";
    
                    return (
                      <div className={gridClass}>
                        {items.map((item, idx) => {
                          let itemClass = "col-span-12"; // mobile 100%
                          // Logic cho màn hình MD trở lên:
                          if (mod === 0) {
                            // Chia hết cho 4: mỗi item chiếm 3/12
                            itemClass += " md:col-span-3";
                          } else if (mod === 3 && idx >= count - 3) {
                            // 3 item cuối: mỗi item chiếm 4/12
                            itemClass += " md:col-span-4";
                          } else if (mod === 2 && idx >= count - 2) {
                            // 2 item cuối: mỗi item chiếm 6/12
                            itemClass += " md:col-span-6";
                          } else if (mod === 1 && idx === count - 1) {
                            // 1 item cuối: chiếm 12/12
                            itemClass += " md:col-span-12";
                          } else {
                            // Các item còn lại: chiếm 3/12
                            itemClass += " md:col-span-3";
                          }
                          return (
                            <div key={item?.id ?? idx} className={itemClass}>
                              <h3 className="text-xl text-[#BBA25A] font-semibold mb-3">{item?.title}</h3>
                              <p className="text-sm text-white/80 leading-[26px] mb-5">{item?.description}</p>
                              <p className="text-xs text-white/40 mt-3 text-[#88938F]">{item?.sub_description}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                   
                </div>
              ) : (
              <>
                {title_top_section && (
                <div className="relative z-10 flex flex-col gap-10 px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto">
                  <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-[#BBA25A]">{title_top_section}</h2>
                  

                 {layout === "why_it_matters_curved_background" ? ( 
                     <div className="lg:flex md:gap-[100px]">
                        <div className='w-6/12'>
                        {subtitle_box_left && (
                           <strong className="text-gray-500 text-sm leading-5 font-semibold mb-5 block">{subtitle_box_left}</strong>
                        )}
                        
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
                        <div className="w-6/12"> 
                          {subtitle_box_right && (
                            <strong className="text-gray-500 text-sm leading-5 font-semibold mb-5 block">{subtitle_box_right}</strong>
                          )}   
                           {Array.isArray(list_details_top_section2) && list_details_top_section2.length > 0 && list_details_top_section2.map((detailsid, idx) => (
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
                  
                  ) : (
                     <div className="lg:flex md:gap-[100px]">
                        <div className='mb-10 lg:mb-0'>
                          <p className="w-[380px] text-[#D9D9D9] text-[15px] leading-[26px] pb-4">
                            {typeof description_top_section === "string" && description_top_section.trim()
                              ? parse(description_top_section)
                              : null}
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
                  )} 

                </div>
                )}
              </>
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
                      <p className="text-[#D9D9D9] text-[15px] leading-[26px]">{description}</p>
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
                     

                        {button_text && (
                          <button
                            type="button"
                            className="flex items-center gap-3 text-[#BBA25A] font-medium hover:underline"
                            onClick={() => setShowPopup(true)}
                          >
                            {button_text }
                            <span aria-label="Go" className="w-14 h-14 rounded-full bg-[#BBA25A] flex items-center justify-center hover:bg-[#e0c56d] transition-colors">
                                <svg className="rotate-[-45deg]" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12h14M13 5l6 7-6 7" stroke="#042033" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg> 
                              </span>
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
                                <div data-tf-live={`${button_code_popup ?? ""}`}></div>
                              </div>
                            </div>
                          </div>
                        )}



                      </div>
                  </div>
                  
                </div>
            </div>
          </article>

          {/* Member Search & Logo Carousel */}
          {pmembers_directory_search === "show" && (
          <article className="pb-20 pt-20 flex flex-col items-center gap-10 relative z-20">
            <div className="px-5 lg:px-20 flex flex-col items-center gap-5 w-full">
              <div className="w-full md:w-[600px] px-5 py-4 rounded-[5px] border border-white flex items-center justify-between">
                <span className="text-white text-[15px] leading-[26px]">{text_search_members_directory}</span>
                <Link href={`${link_members_directory}?search=sec`} className="w-[30px] h-[30px] flex items-center justify-center">
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0.558594C23.0081 0.558594 29.5 7.05046 29.5 15.0586C29.5 23.0667 23.0081 29.5586 15 29.5586C6.99187 29.5586 0.5 23.0667 0.5 15.0586C0.5 7.05046 6.99187 0.558594 15 0.558594Z" stroke="#ffffff"/>
                      <path d="M11 15.0586H19M19 15.0586L15.5 11.0586M19 15.0586L15.5 19.0586" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg> 
                </Link>
              </div>
            </div>
            {list_logo.length > 0 && (
              <div className="w-full relative min-h-[200px] md:overflow-hidden">
                <div className=" ">
                  
                    <div className="flex flex-wrap items-center justify-center gap-8 py-6">
                        {list_logo.map((logo, idx) => { 
                            const verticalOffsetClass = idx % 2 !== 0 ? 'mt-0 lg:mt-20' : 'mt-0';  
                            return (
                                <div 
                                    key={logo?.id ?? idx}  
                                    className={`flex items-center justify-center md:mx-5 ${verticalOffsetClass}`}
                                >
                                    {logo?.image?.url && (
                                        <Image
                                            src={strapiImage(logo.image.url)}
                                            alt=""
                                            width={88}
                                            height={88}
                                            className="object-cover w-[88px] h-[88px] rounded-full"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                
                </div>
                {/*
                <div className="absolute left-0 top-0 w-[170px] h-[200px] bg-gradient-to-r from-navy to-transparent"></div>
                <div className="absolute right-0 top-0 w-[170px] h-[200px] bg-gradient-to-l from-navy to-transparent"></div>
                */}  
              </div>
              )}
              {multiple_logo && ( 
                <Image
                    alt=""
                    src={multiple_logo?.url ? strapiImage(multiple_logo.url) : ""}
                    width={920}
                    height={128}
                    className="w-full lg:w-[50%] flex-1 object-cover"
                  />
              )}
          </article>
          )}
      </section>
       
    </>
  );
};

export default WhyJoin;
