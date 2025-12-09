"use client";
import React from "react";
import { Container } from "../container";
import Image from "next/image";
import Link from "next/link";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { color } from "framer-motion";

export const GovernanceStructure = ({
  title_section = "",
  title_box_white = "",
  description_box_white  = "",
  governance_structure = [],
  layout = "GovernanceStructure", // Thêm layout, mặc định là GovernanceStructure
}: {
  title_section?: string;
  title_box_white?: string;
  description_box_white?: string;
  governance_structure?: {
    id?: string;
    title?: string;
    description?: string;
    thumbnail?: any;
    list_details?: { id?: string; title?: string }[]; // list_details có field title
  }[];
  layout?: "GovernanceStructure" | "AvailableContent" | "ObjectivesofthePartnerships" | "ASinglePointOfContact";
}) => {
  // Log toàn bộ mảng governance_structure để kiểm tra dữ liệu
  console.log('governance_structure array:', governance_structure);

  const getImageSrc = (media: any) => {
    try {
      const url =
        media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return url ? strapiImage(url) : undefined;
    } catch {
      return undefined;
    }
  };
  const CheckIcon = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.84192 12.0008C5.56569 12.0008 5.28999 11.8971 5.07904 11.6891L0 6.68272L1.52576 5.17825L5.84192 9.43268L14.4742 0.923828L16 2.4283L6.6048 11.6891C6.39385 11.8971 6.11816 12.0008 5.84192 12.0008Z" fill="#BBA25A"/>
    </svg>
  );

  const CheckIcon1 = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2668_12449)">
        <path d="M5.84192 11.5008C5.56569 11.5008 5.28999 11.3971 5.07904 11.1891L0 6.18272L1.52576 4.67825L5.84192 8.93268L14.4742 0.423828L16 1.9283L6.6048 11.1891C6.39385 11.3971 6.11816 11.5008 5.84192 11.5008Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_2668_12449">
        <rect width="16" height="12" fill="white"/>
        </clipPath>
        </defs>
        </svg>

  );
   
  const ArrowRight = () => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15.0587L15.8333 4.22534M15.8333 4.22534V14.6253M15.8333 4.22534H5.43334" stroke="#0A2540" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> 
  );
 

  return (
    <>
      {layout === "GovernanceStructure" && (
        <section className="w-full py-16 px-2 bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
          <h2 className="text-center text-[32px] font-serif font-bold text-[#0A2540] mb-20">
            {title_section}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-[10px] max-w-screen-xl mx-auto">
            {Array.isArray(governance_structure) && governance_structure.map((item, idx) => {
              // Log từng item để kiểm tra các field
              console.log(
                'governance_structure item:',
                item,
                'thumbnail:', item?.thumbnail,
                'list_details:', item?.list_details
              );
              let bgClass = "bg-[#0a2540]";
              if (idx === 0) bgClass = "bg-[#001D40] text-white";
              else if (idx === 1) bgClass = "bg-[#EDF0E5] text-[#0A2540]";
              else if (idx === 2) bgClass = "bg-[#88938fcc] text-white";
              return (
                <div
                  key={item.id ?? idx}
                  className={`min-h-[330px] relative rounded-none shadow-lg w-full md:w-1/3 px-8 pt-8 flex flex-col gap-4 ${bgClass}`}
                >
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2 text-center">{item.title}</h3>
                    <p className="mb-4 opacity-90 text-center text-[15px] leading-[26px]">
                      {item.description}
                    </p>
                    <div className="flex flex-col gap-0 pb-8">
                      {Array.isArray(item.list_details) && item.list_details.length > 0 && item.list_details.map((detail, i) => (
                        <div key={detail.id ?? i} className={`flex items-start py-3 border-b ${
                          idx === 0 ? "border-[#D8D4C533]" : "border-[#ffffff]"
                        }`}>
                          <div className="flex items-center gap-4 flex-1">
                            <div className='w-4'>
                              {idx === 2 ? (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#ffffff"/>
                                </svg>
                              ) : (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#BBA25A"/>
                                </svg>
                              )}
                            </div>
                            <div className='w-[calc(100%-16px)]'>
                              <span className={`text-[14px] leading-5 ${
                                idx === 0 ? "text-white" :
                                idx === 1 ? "text-[#0A2540]" :
                                idx === 2 ? "text-white" : ""
                              }`}>{detail.title}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {item.thumbnail?.url && (
                    <div className={`flex justify-center absolute ${idx === 2 ? "right-0" : "left-0"} bottom-0`}>
                      <Image
                        src={item.thumbnail?.url ? strapiImage(item.thumbnail.url) : ""}
                        alt={item.thumbnail?.alternativeText ?? ""}
                        width={245}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {layout === "ASinglePointOfContact" && (
        <section className="w-full py-16 px-2 bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
          <h2 className="text-center text-[32px] font-serif font-bold text-[#0A2540] mb-20">
            {title_section}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-[10px] max-w-screen-xl mx-auto">
            {Array.isArray(governance_structure) && governance_structure.map((item, idx) => {
              let bgClass = "bg-[#0a2540]";
              if (idx === 0) bgClass = "bg-[#001D40] text-white"; 
              else if (idx === 1) bgClass = "bg-[#88938fcc] text-white";
              else if (idx === 2) bgClass = "bg-[#EDF0E5] text-[#001D40]";
              // Tính widthClass theo số lượng item
              let widthClass = "";
              const count = governance_structure.length;
              if (count === 3) widthClass = "md:w-1/3";
              else if (count === 2) widthClass = "md:w-6/12";
              else if (count === 1) widthClass = "md:w-12/12";
              return (
                <div
                  key={item.id ?? idx}
                  className={`relative rounded-none shadow-lg w-full ${widthClass} px-8 pt-8 flex flex-col gap-4 ${bgClass}`}
                >
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="mb-4 opacity-90 text-[15px] leading-[26px]">
                      {item.description}
                    </p>
                    <div className="flex flex-col gap-0 pb-8">
                      {Array.isArray(item.list_details) && item.list_details.length > 0 && item.list_details.map((detail, i) => (
                        <div key={detail.id ?? i} className={`flex items-start py-3 border-b ${
                          idx === 2 ? "border-[#0A2540]"
                          : idx === 0 ? "border-[#D8D4C533]"
                          : "border-[#ffffff]"
                        }`}>
                          <div className="flex items-center gap-4 flex-1">
                            <div className='w-4'>
                              
                              {idx === 0 ? (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#BBA25A"/>
</svg>


                              ) :
                              
                              idx === 2 ? (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#0A2540"/>
</svg>

                              ) : (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="white"/>
                                </svg> 
                              )} 
                            </div>
                            <div className='w-[calc(100%-16px)]'>
                              <span className={`text-[14px] leading-5 ${
                                idx === 0 ? "text-white" :
                                idx === 1 ? "text-white" : ""
                              }`}>{detail.title}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {item.thumbnail?.url && (
                    <div className={`flex justify-center absolute ${idx === 1 ? "right-0" : "left-0"} bottom-0`}>
                      <Image
                        src={item.thumbnail?.url ? strapiImage(item.thumbnail.url) : ""}
                        alt={item.thumbnail?.alternativeText ?? ""}
                        width={245}
                        height={250} 
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {layout === "ObjectivesofthePartnerships" && (
        <section className="w-full py-16 px-2 bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
          <h2 className="text-center text-[32px] font-serif font-bold text-[#0A2540] mb-20">
            {title_section}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-[10px] max-w-screen-xl mx-auto">
            {Array.isArray(governance_structure) && governance_structure.map((item, idx) => {
              let bgClass = "bg-[#0a2540]";
              if (idx === 0) bgClass = "bg-[#88938fcc] text-white";
              else if (idx === 1) bgClass = "bg-[#EDF0E5] text-[#0A2540]";
              else if (idx === 2) bgClass = "bg-[#001D40] text-white";
              // Thay đổi width theo yêu cầu
              let widthClass = "";
              if (idx === 0) widthClass = "md:w-6/12";
              else if (idx === 1 || idx === 2) widthClass = "md:w-3/12";
              return (
                <div
                  key={item.id ?? idx}
                  className={`relative rounded-none shadow-lg w-full ${widthClass} px-8 pt-8 flex flex-col gap-4 ${bgClass}`}
                >
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="mb-4 opacity-90 text-[15px] leading-[26px]">
                      {item.description}
                    </p>
                    <div className="flex flex-col gap-0 pb-8">
                      {Array.isArray(item.list_details) && item.list_details.length > 0 && item.list_details.map((detail, i) => (
                        <div key={detail.id ?? i} className={`flex items-start py-3 border-b ${
                          idx === 0 ? "border-[#D8D4C533]" : "border-[#ffffff]"
                        }`}>
                          <div className="flex items-center gap-4 flex-1">
                            <div className='w-4'>
                              {idx === 2 ? (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="white"/>
                                </svg>

                              ) : (
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="white"/>
                                </svg>

                              )}
                            </div>
                            <div className='w-[calc(100%-16px)]'>
                              <span className={`text-[14px] leading-5 ${
                                idx === 0 ? "text-white" :
                                idx === 1 ? "text-[#0A2540]" :
                                idx === 2 ? "text-white" : ""
                              }`}>{detail.title}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {item.thumbnail?.url && (
                    <div className="flex justify-center absolute left-0 bottom-0">
                      <Image
                        src={item.thumbnail?.url ? strapiImage(item.thumbnail.url) : ""}
                        alt={item.thumbnail?.alternativeText ?? ""}
                        width={245}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {layout === "AvailableContent" && (
        <section className="w-full py-16 px-2 bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
          <h2 className="text-center text-[32px] font-serif font-bold text-[#0A2540] mb-20">
            {title_section}
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-[10px] max-w-screen-xl mx-auto">
            <div className="wrap-box-left md:w-2/3">
              <div className="flex flex-col md:flex-row gap-[10px] w-full">
                  {/* Box 1 */}
                  {Array.isArray(governance_structure) && governance_structure[0] && (
                    <div
                      key={governance_structure[0].id ?? 0}
                      className={`relative rounded-none shadow-lg w-full md:w-1/2 px-8 pt-8 flex flex-col gap-4 bg-[#001D40] text-white`}
                    >
                      {/* ...existing box 1 content... */}
                      <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">{governance_structure[0].title}</h3>
                        <p className="mb-4 opacity-90 text-[15px] leading-[26px]">
                          {governance_structure[0].description}
                        </p>
                        <div className="flex flex-col gap-0 pb-8">
                          {Array.isArray(governance_structure[0].list_details) && governance_structure[0].list_details.length > 0 && governance_structure[0].list_details.map((detail, i) => (
                            <div key={detail.id ?? i} className="flex items-start py-3 border-b border-[#D8D4C533]">
                              <div className="flex items-center gap-4 flex-1">
                                <div className='w-4'>
                                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#ffffff"/>
                                  </svg>
                                </div>
                                <div className='w-[calc(100%-16px)]'>
                                  <span className="text-[14px] leading-5 text-white">{detail.title}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {governance_structure[0].thumbnail?.url && (
                        <div className="flex justify-center absolute left-0 bottom-0">
                          <Image
                            src={governance_structure[0].thumbnail?.url ? strapiImage(governance_structure[0].thumbnail.url) : ""}
                            alt={governance_structure[0].thumbnail?.alternativeText ?? ""}
                            width={245}
                            height={300}
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {/* Box 2 */}
                  {Array.isArray(governance_structure) && governance_structure[1] && (
                    <div
                      key={governance_structure[1].id ?? 1}
                      className={`relative rounded-none shadow-lg w-full md:w-1/2 px-8 pt-8 flex flex-col gap-4 bg-[#EDF0E5] text-[#0A2540]`}
                    >
                      {/* ...existing box 2 content... */}
                      <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">{governance_structure[1].title}</h3>
                        <p className="mb-4 opacity-90 text-[15px] leading-[26px]">
                          {governance_structure[1].description}
                        </p>
                        <div className="flex flex-col gap-0 pb-8">
                          {Array.isArray(governance_structure[1].list_details) && governance_structure[1].list_details.length > 0 && governance_structure[1].list_details.map((detail, i) => (
                            <div key={detail.id ?? i} className="flex items-start py-3 border-b border-[#ffffff]">
                              <div className="flex items-center gap-4 flex-1">
                                <div className='w-4'>
                                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#BBA25A"/>
                                  </svg>
                                </div>
                                <div className='w-[calc(100%-16px)]'>
                                  <span className="text-[14px] leading-5 text-[#0A2540]">{detail.title}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {governance_structure[1].thumbnail?.url && (
                        <div className="flex justify-center absolute left-0 bottom-0">
                          <Image
                            src={governance_structure[1].thumbnail?.url ? strapiImage(governance_structure[1].thumbnail.url) : ""}
                            alt={governance_structure[1].thumbnail?.alternativeText ?? ""}
                            width={245}
                            height={300}
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
              </div>
              <div className="mt-[10px]">
                  
                    <div className={`relative rounded-none shadow-lg w-full p-10 flex flex-col gap-4 bg-white text-[#0A2540]`}
                    >
                      
                      <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">{title_box_white}</h3>
                        <p className="opacity-90 text-[15px] leading-[26px]">
                          {description_box_white}
                        </p> 
                      </div>
                  
                    </div>
                  
              </div>
            </div>
            {/* Box 3 giữ nguyên ngoài wrap-box-left */}
            {Array.isArray(governance_structure) && governance_structure[2] && (
              <div
                key={governance_structure[2].id ?? 2}
                className={`min-h-[394px] relative rounded-none shadow-lg w-full md:w-1/3 px-8 pt-8 flex flex-col gap-4 bg-[#88938fcc] text-white`}
              >
                {/* ...existing box 3 content... */}
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">{governance_structure[2].title}</h3>
                  <p className="mb-4 opacity-90 text-[15px] leading-[26px]">
                    {governance_structure[2].description}
                  </p>
                  <div className="flex flex-col gap-0 pb-8">
                    {Array.isArray(governance_structure[2].list_details) && governance_structure[2].list_details.length > 0 && governance_structure[2].list_details.map((detail, i) => (
                      <div key={detail.id ?? i} className="flex items-start py-3 border-b border-[#ffffff]">
                        <div className="flex items-center gap-4 flex-1">
                          <div className='w-4'>
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#ffffff"/>
                            </svg>
                          </div>
                          <div className='w-[calc(100%-16px)]'>
                            <span className="text-[14px] leading-5 text-white">{detail.title}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {governance_structure[2].thumbnail?.url && (
                  <div className="flex justify-center absolute left-0 bottom-0">
                    <Image
                      src={governance_structure[2].thumbnail?.url ? strapiImage(governance_structure[2].thumbnail.url) : ""}
                      alt={governance_structure[2].thumbnail?.alternativeText ?? ""}
                      width={245}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default GovernanceStructure;
