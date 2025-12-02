"use client";
import React from "react";
import { BookingForm } from "../booking-form";
import blockcta from "./blockcta";

export const FormContact = ({
  full_name_label,
  email_label,
  phone_label,
  purpose_label,
  additional_information_label,
  agreement_label,
  submit_label,
  title,
  box_right_title,
  box_right_description,
  box_right_location,
  list_details = [],
  member = [],
}: {
  full_name_label: string;
  email_label: string;
  phone_label: string;
  purpose_label: string;
  additional_information_label: string;
  agreement_label: string;
  submit_label: string; 
  title: string;
  box_right_title: string;
  box_right_description: string;
  box_right_location: string;
  list_details?: { id?: string | number; title?: string }[];
  member?: { id?: string | number; name?: string }[];
}) => {

  const data = {
    full_name_label: full_name_label,
    email_label: email_label,
    phone_label: phone_label,
    purpose_label: purpose_label,
    additional_information_label: additional_information_label,
    agreement_label: agreement_label,
    submit_label: submit_label,
    list_details: list_details,
    member: member
  };
 
  return (
    <>
    <section className='relative'>
        <div 
            className="min-h-[80px] absolute z-10 left-0 right-0 bottom-0 overflow-hidden bg-custom-blue mb-[-5px]" 
            style={{ backgroundImage: "url('/Vector01.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "top center", backgroundSize: "cover" }}
        > 
        
        </div>
      </section>  
      <section className="bg-navy">
        <div className='px-5 lg:px-20 py-10 lg:py-20 max-w-[1440px] w-full m-auto relative overflow-hidden'>
          <svg className="absolute right-0 lg:right-[-303px] top-0 w-[1498px] h-full" viewBox="0 0 1195 503" fill="none">
            <path d="M220.355 -37.8128V244.564H348.467C372.156 243.806 391.771 235.752 407.216 220.306C422.851 204.956 430.716 185.246 430.716 161.178V152.46H440.571V376.466H430.716V368.886C430.716 344.912 423.135 325.203 407.974 309.757C392.813 294.122 373.577 286.068 350.362 285.499H220.355V528.836C220.355 545.798 226.419 560.201 238.548 572.046C250.867 583.985 265.459 589.86 282.137 589.86H293.886L295.024 599.715H0.138672V589.86H12.6466C29.3239 589.86 43.5375 583.985 55.477 572.046C67.6059 560.201 74.0494 545.798 74.8075 528.836V-11.6598C74.8075 -34.1173 64.0051 -50.8893 42.59 -62.0707C33.4933 -67.0928 23.449 -69.6513 12.6466 -69.6513H0.138672V-79.5061H371.587C391.487 -79.5061 413.47 -81.4012 437.539 -85.1915C461.512 -89.1713 478.284 -93.1511 487.95 -96.9414V67.1783H478.474V57.3236C478.474 28.8016 470.135 6.05984 453.458 -10.9017C436.97 -28.0528 414.513 -37.0548 385.991 -37.8128H220.355Z" fill="#071F38"/>
          </svg>
            
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  {/* Left: contact form (wide) */}
                  <div className="md:col-span-8 text-white px-4 py-10 relative overflow-hidden min-h-[360px]">
                    
                    <h2 className="text-[32px] font-serif text-[#BBA25A] font-semibold mb-9">{title}</h2>
                    <BookingForm data={data} />
                    {/*<form className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="text-sm">
                          <div className="text-[14px] mb-2 text-white/80">Full Name</div>
                          <input type="text" defaultValue="Rudolphe Aben" className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px] placeholder-[#88938F]" />
                        </label>

                        <label className="text-sm">
                          <div className="text-[14px] mb-2 text-white/80">Email</div>
                          <input type="email" defaultValue="Example@gmail.com" className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px] placeholder-[#88938F]" />
                        </label>

                        <label className="text-sm">
                          <div className="text-[14px] mb-2 text-white/80">Phone</div>
                          <input type="tel" defaultValue="012-123456" className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px] placeholder-[#88938F]" />
                        </label>
                      </div>

                      <div>
                        <label className="text-sm w-full">
                          <div className="text-[14px] mb-2 text-white/80">Purpose</div>
                          <select className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px] placeholder-[#88938F]">
                            <option>Membership</option>
                            <option>Information</option>
                            <option>Other</option>
                          </select>
                        </label>
                      </div>

                      <div>
                        <label className="text-sm w-full">
                          <div className="text-[14px] mb-2 text-white/80">Additional Information</div>
                          <textarea rows={5} className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px] placeholder-[#88938F]"></textarea>
                        </label>
                      </div>

                      <div className="flex items-center gap-3 text-[14px] text-[#88938F]">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 accent-[#88938F] rounded" />
                          <span>Personal information is transmitted and used for the purposes described in the privacy statement.</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-6 mt-16">
                        <button type="submit" className="inline-flex items-center text-[16px] gap-3 text-[#BBA25A] font-medium">
                          Send a Message
                          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0Z" fill="#BBA25A"/>
                          <path d="M30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0Z" stroke="#BBA25A"/>
                          <path d="M25 35.0004L35.8333 24.167M35.8333 24.167V34.567M35.8333 24.167H25.4333" stroke="#0A2540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>

                        </button>
                      </div>
                    </form>*/}
                  </div>

                  {/* Right: access & availability sidebar */}
                  <aside className="md:col-span-4 text-white p-10 min-h-[360px]">
                    <h3 className="text-[20px] font-semibold text-[#BBA25A] mb-4">{box_right_title}</h3>
                    <p className="text-[16px] leading-[26px] text-white/80 mb-10">
                      {box_right_description}
                    </p>

                    <p className="text-[14px] leading-[26px] text-[#88938F] mb-6">
                      {box_right_location}
                    </p>
                    <div className="flex flex-col gap-0">     

                       

                        {Array.isArray(list_details) && list_details.length > 0 && list_details.map((detail, idx) => (
                          <div key={detail?.id ?? idx} className="flex items-start pb-5 border-b border-[#D8D4C533]">  
                              <div className="flex items-center gap-4 flex-1">
                                  <div className='w-4'>
                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="#BBA25A"/>
                                    </svg> 
                                  </div>
                                  <div className='w-[calc(100%-16px)]'>
                                  <span className="text-[#fff] text-[15px] leading-6">{detail?.title ?? ""}</span>
                                  </div>
                              </div>
                          </div> 
                        ))}
                         
                    </div> 
                  </aside>
                </div>
              </div>
             
        </div>
      </section>
     </>
  );
};

export default FormContact;

