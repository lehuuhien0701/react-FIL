"use client";
import React from "react";
import parse from "html-react-parser";
import BlockCta from "./blockcta";

export const OurRole = ({
  title = "", 
  description = "", 
  title_blockcta = "",
  title_blockcta2 = "",
  blockcta = null,
  blockcta2 = null,
  our_missions_in_action = null,
  note = "", 
  background = null,
  layout = "OurRoleSection", // add layout prop with default
}: {
  title?: string; 
  description?: string; 
  title_blockcta?: string;
  title_blockcta2?: string;
  blockcta?: any[] | null;
  blockcta2?: any[] | null;
  our_missions_in_action?: any[] | null; 
  note?: string; 
  background?: any | null;
  layout?: "OurRoleSection" | "ProgressJourneySection" | "MissionGrid" | "MissionGridFourColumns";
}) => {
 

  // Determine section class based on layout
  const sectionClass = `bg-navy${layout === "ProgressJourneySection" ? " two-box-center" : ""}`;

  return (
    <>
      <section className='relative'>
        <div 
            className="min-h-[80px] absolute z-10 left-0 right-0 bottom-0 overflow-hidden bg-custom-blue mb-[-5px]" 
            style={{ backgroundImage: "url('/Vector01.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "top center", backgroundSize: "cover" }}
        > 
        
        </div>
      </section>  
      {/* Hiển thị section theo layout */}
      {layout === "OurRoleSection" && (
        <section className="bg-navy">
          <div className='px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto relative overflow-hidden'>
            <svg className="absolute right-0 lg:right-[-303px] bottom-[-97px] w-[1498px] h-[696px]" viewBox="0 0 1195 503" fill="none">
              <path d="M220.355 -37.8128V244.564H348.467C372.156 243.806 391.771 235.752 407.216 220.306C422.851 204.956 430.716 185.246 430.716 161.178V152.46H440.571V376.466H430.716V368.886C430.716 344.912 423.135 325.203 407.974 309.757C392.813 294.122 373.577 286.068 350.362 285.499H220.355V528.836C220.355 545.798 226.419 560.201 238.548 572.046C250.867 583.985 265.459 589.86 282.137 589.86H293.886L295.024 599.715H0.138672V589.86H12.6466C29.3239 589.86 43.5375 583.985 55.477 572.046C67.6059 560.201 74.0494 545.798 74.8075 528.836V-11.6598C74.8075 -34.1173 64.0051 -50.8893 42.59 -62.0707C33.4933 -67.0928 23.449 -69.6513 12.6466 -69.6513H0.138672V-79.5061H371.587C391.487 -79.5061 413.47 -81.4012 437.539 -85.1915C461.512 -89.1713 478.284 -93.1511 487.95 -96.9414V67.1783H478.474V57.3236C478.474 28.8016 470.135 6.05984 453.458 -10.9017C436.97 -28.0528 414.513 -37.0548 385.991 -37.8128H220.355Z" fill="#071F38"/>
            </svg>
            <div className="relative z-10 flex flex-col gap-10"> 
              <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">
                {title ? parse(title) : "Our Role"}
              </h2>
              <div className="lg:flex gap-[100px]">
                {description &&(
                  <div className="mb-10 lg:mb-0">
                    <p className="w-[380px] text-[#D9D9D9] text-[15px] leading-[26px]"> 
                      {description ? parse(description) : ""}
                    </p>
                  </div>
                )}
                {/* apply styles to descendant spans and to .cta-item elements */}
                <div className="list-block-cta block w-full gap-24 [&_span]:text-white [&_.cta-item]:border-white/20 [&_.cta-block:last-child_>.cta-item]:border-0">
                   {/* Only show div if at least one BlockCta item has content */}
                   {(Array.isArray(blockcta) && blockcta.some(b => b?.title || b?.text)) && (
                     <div>
                        {title_blockcta && (
                          <p className="font-sans font-semibold text-sm leading-5 text-[#88938F]">{title_blockcta ? parse(title_blockcta) : ""}</p>
                        )} 
                        {blockcta.map((b, i) => {
                          const content = b?.title ?? b?.text ?? null;
                          return content ? (
                            <BlockCta key={b?.id ?? i} content={content} className="border-white/20" />
                          ) : null;
                        })}
                     </div>
                   )}

                   {(Array.isArray(blockcta2) && blockcta2.some(b => b?.title || b?.text)) && (
                     <div>
                        {title_blockcta2 && (
                          <p className="font-sans font-semibold text-sm leading-5 text-[#88938F]">{title_blockcta2 ? parse(title_blockcta2) : ""}</p>
                        )} 
                        {blockcta2.map((b, i) => {
                          const content = b?.title ?? b?.text ?? null;
                          return content ? (
                            <BlockCta key={b?.id ?? i} content={content} className="border-white/20" />
                          ) : null;
                        })}
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {layout === "ProgressJourneySection" && (
        <section className="bg-navy two-box-center">
          <div className='px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto relative overflow-hidden'>
            <svg className="absolute right-0 lg:right-[-303px] bottom-[-97px] w-[1498px] h-[696px]" viewBox="0 0 1195 503" fill="none">
              <path d="M220.355 -37.8128V244.564H348.467C372.156 243.806 391.771 235.752 407.216 220.306C422.851 204.956 430.716 185.246 430.716 161.178V152.46H440.571V376.466H430.716V368.886C430.716 344.912 423.135 325.203 407.974 309.757C392.813 294.122 373.577 286.068 350.362 285.499H220.355V528.836C220.355 545.798 226.419 560.201 238.548 572.046C250.867 583.985 265.459 589.86 282.137 589.86H293.886L295.024 599.715H0.138672V589.86H12.6466C29.3239 589.86 43.5375 583.985 55.477 572.046C67.6059 560.201 74.0494 545.798 74.8075 528.836V-11.6598C74.8075 -34.1173 64.0051 -50.8893 42.59 -62.0707C33.4933 -67.0928 23.449 -69.6513 12.6466 -69.6513H0.138672V-79.5061H371.587C391.487 -79.5061 413.47 -81.4012 437.539 -85.1915C461.512 -89.1713 478.284 -93.1511 487.95 -96.9414V67.1783H478.474V57.3236C478.474 28.8016 470.135 6.05984 453.458 -10.9017C436.97 -28.0528 414.513 -37.0548 385.991 -37.8128H220.355Z" fill="#071F38"/>
            </svg>
            <div className="relative z-10 flex flex-col gap-10"> 
              <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">
                {title ? parse(title) : "Our Role"}
              </h2>
              <div className="lg:flex gap-[100px]">
                {description &&(
                  <div className="mb-10 lg:mb-0">
                    <p className="w-[380px] text-[#D9D9D9] text-[15px] leading-[26px]"> 
                      {description ? parse(description) : ""}
                    </p>
                  </div>
                )}
                {/* apply styles to descendant spans and to .cta-item elements */}
                <div className="list-block-cta block gap-24 [&_span]:text-white [&_.cta-item]:border-white/20 [&_.cta-block:last-child_>.cta-item]:border-0">
                   {/* Only show div if at least one BlockCta item has content */}
                   {(Array.isArray(blockcta) && blockcta.some(b => b?.title || b?.text)) && (
                     <div>
                        {title_blockcta && (
                          <p className="font-sans font-semibold text-sm leading-5 text-[#88938F]">{title_blockcta ? parse(title_blockcta) : ""}</p>
                        )} 
                        {blockcta.map((b, i) => {
                          const content = b?.title ?? b?.text ?? null;
                          return content ? (
                            <BlockCta key={b?.id ?? i} content={content} className="border-white/20" />
                          ) : null;
                        })}
                     </div>
                   )}

                   {(Array.isArray(blockcta2) && blockcta2.some(b => b?.title || b?.text)) && (
                     <div>
                        {title_blockcta2 && (
                          <p className="font-sans font-semibold text-sm leading-5 text-[#88938F]">{title_blockcta2 ? parse(title_blockcta2) : ""}</p>
                        )} 
                        {blockcta2.map((b, i) => {
                          const content = b?.title ?? b?.text ?? null;
                          return content ? (
                            <BlockCta key={b?.id ?? i} content={content} className="border-white/20" />
                          ) : null;
                        })}
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {layout === "MissionGrid" && (
         <section className="bg-navy two-box-center">
          <div className='px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto relative overflow-hidden'>
            <svg className="absolute right-0 lg:right-[-303px] bottom-[-97px] w-[1498px] h-[696px]" viewBox="0 0 1195 503" fill="none">
              <path d="M220.355 -37.8128V244.564H348.467C372.156 243.806 391.771 235.752 407.216 220.306C422.851 204.956 430.716 185.246 430.716 161.178V152.46H440.571V376.466H430.716V368.886C430.716 344.912 423.135 325.203 407.974 309.757C392.813 294.122 373.577 286.068 350.362 285.499H220.355V528.836C220.355 545.798 226.419 560.201 238.548 572.046C250.867 583.985 265.459 589.86 282.137 589.86H293.886L295.024 599.715H0.138672V589.86H12.6466C29.3239 589.86 43.5375 583.985 55.477 572.046C67.6059 560.201 74.0494 545.798 74.8075 528.836V-11.6598C74.8075 -34.1173 64.0051 -50.8893 42.59 -62.0707C33.4933 -67.0928 23.449 -69.6513 12.6466 -69.6513H0.138672V-79.5061H371.587C391.487 -79.5061 413.47 -81.4012 437.539 -85.1915C461.512 -89.1713 478.284 -93.1511 487.95 -96.9414V67.1783H478.474V57.3236C478.474 28.8016 470.135 6.05984 453.458 -10.9017C436.97 -28.0528 414.513 -37.0548 385.991 -37.8128H220.355Z" fill="#071F38"/>
            </svg>
            <div className="relative z-10 flex flex-col gap-10">
              <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">
                {title ? parse(title) : "Our Role"}
              </h2>
              {/* JS logic for grid columns and item width */}
              {(() => {
                const items = Array.isArray(our_missions_in_action) ? our_missions_in_action : [];
                const count = items.length;
                const mod = count % 3;
                
                // Thiết lập Grid 12 cột để có thể dùng col-span-6 (50%) hoặc col-span-4 (33.3%)
                let gridClass = "text-center grid grid-cols-1 md:gap-10 mt-5 md:mt-20";
                if (count > 0) gridClass += " md:grid-cols-12"; // Dùng grid 12 cột cho MD trở lên

                return (
                    <div className={gridClass}>
                        {items.map((item, idx) => {
                            let itemClass = "col-span-1"; // Mặc định mobile 100%

                            if (count > 0) {
                                // Logic cho màn hình MD trở lên:
                                if (mod === 0) {
                                    // Chia hết cho 3 (e.g., 3, 6 items): Chiếm 4/12 (33.3%)
                                    itemClass = "md:col-span-4"; 
                                } else if (mod === 2 && idx >= count - 2) {
                                    // 2 item cuối (e.g., items 4 & 5 trong tổng 5): Chiếm 6/12 (50%)
                                    itemClass = "md:col-span-6"; 
                                } else if (mod === 1 && idx === count - 1) {
                                    // 1 item cuối (e.g., item 4 trong tổng 4): Chiếm 12/12 (100%)
                                    itemClass = "md:col-span-12"; 
                                } else {
                                    // Các item còn lại (không phải item cuối cùng đang xử lý logic đặc biệt)
                                    itemClass = "md:col-span-4"; 
                                }
                            }

                            // Đảm bảo item luôn chiếm toàn bộ chiều rộng trên mobile
                            itemClass = `col-span-12 ${itemClass}`;

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
          </div>
        </section>
      )}
      {layout === "MissionGridFourColumns" && (
         <section className="bg-navy two-box-center">
          <div className='px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto relative overflow-hidden'>
            <svg className="absolute right-0 lg:right-[-303px] bottom-[-97px] w-[1498px] h-[696px]" viewBox="0 0 1195 503" fill="none">
              <path d="M220.355 -37.8128V244.564H348.467C372.156 243.806 391.771 235.752 407.216 220.306C422.851 204.956 430.716 185.246 430.716 161.178V152.46H440.571V376.466H430.716V368.886C430.716 344.912 423.135 325.203 407.974 309.757C392.813 294.122 373.577 286.068 350.362 285.499H220.355V528.836C220.355 545.798 226.419 560.201 238.548 572.046C250.867 583.985 265.459 589.86 282.137 589.86H293.886L295.024 599.715H0.138672V589.86H12.6466C29.3239 589.86 43.5375 583.985 55.477 572.046C67.6059 560.201 74.0494 545.798 74.8075 528.836V-11.6598C74.8075 -34.1173 64.0051 -50.8893 42.59 -62.0707C33.4933 -67.0928 23.449 -69.6513 12.6466 -69.6513H0.138672V-79.5061H371.587C391.487 -79.5061 413.47 -81.4012 437.539 -85.1915C461.512 -89.1713 478.284 -93.1511 487.95 -96.9414V67.1783H478.474V57.3236C478.474 28.8016 470.135 6.05984 453.458 -10.9017C436.97 -28.0528 414.513 -37.0548 385.991 -37.8128H220.355Z" fill="#071F38"/>
            </svg>
            <div className="relative z-10 flex flex-col gap-10">
              <h2 className="font-display text-[32px] leading-[40px] lg:text-[37.3px] lg:leading-[45.6px] font-bold text-gold">
                {title ? parse(title) : "Our Role"}
              </h2>
              <p className="text-white text-center">
                {description ? parse(description) : ""}
              </p>
              {/* JS logic for grid columns and item width */}
              {(() => {
                const items = Array.isArray(our_missions_in_action) ? our_missions_in_action : [];
                const count = items.length;
                const mod = count % 4;

                let gridClass = "text-center grid grid-cols-1 md:gap-10";
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
              
              {note && (
                <p className="font-inter font-normal text-sm leading-5 text-center text-white">{note}</p>
              )}
            </div>
          </div>
        </section>
      )}
     </>
  );
};

export default OurRole;

